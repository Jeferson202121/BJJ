import React, { useState, useEffect, useCallback } from 'react';
import { User, Role, Announcement, Teacher } from './types';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import Logo from './components/Logo';
import { LogOut, Cpu, Lock, Bell, X, Download, CreditCard, GitBranch, Cloud, CloudOff, RefreshCw, CheckCircle2 } from 'lucide-react';
import { processFinancialStatus } from './services/geminiService';
import { cloudService, supabase } from './services/supabaseService';

interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'announcement' | 'system' | 'alert';
}

const App: React.FC = () => {
  const OFFICIAL_PAYMENT_LINK = "https://buy.stripe.com/test_7sY8wQd2NcVgagTayNcs801";

  const loadFromStorage = (key: string, fallback: any) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) { return fallback; }
  };

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>(() => loadFromStorage('bjj_teachers', []));
  const [students, setStudents] = useState<User[]>(() => loadFromStorage('bjj_students', []));
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => loadFromStorage('bjj_announcements', []));
  const [federationPixKey, setFederationPixKey] = useState<string>(() => loadFromStorage('bjj_fed_pix', 'financeiro@federacao.com.br'));
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [cloudStatus, setCloudStatus] = useState<'online' | 'syncing' | 'local'>(supabase ? 'syncing' : 'local');

  // Inicialização e Sincronização em tempo real
  useEffect(() => {
    if (!supabase) {
      setCloudStatus('local');
      return;
    }

    const fetchData = async () => {
      try {
        setCloudStatus('syncing');
        const [t, s, a] = await Promise.all([
          cloudService.getTeachers(),
          cloudService.getStudents(),
          cloudService.getAnnouncements()
        ]);
        
        // Só atualiza o estado se houver dados para evitar limpar o local storage por erro
        if (t.length > 0) setTeachers(t);
        if (s.length > 0) setStudents(s);
        setAnnouncements(a);
        setCloudStatus('online');
      } catch (e) {
        console.error("Erro na sincronização inicial:", e);
        setCloudStatus('local');
      }
    };

    fetchData();

    // Canais de escuta para atualizações de outros dispositivos
    const channels = [
      supabase.channel('teachers_live').on('postgres_changes', { event: '*', schema: 'public', table: 'teachers' }, fetchData).subscribe(),
      supabase.channel('students_live').on('postgres_changes', { event: '*', schema: 'public', table: 'students' }, fetchData).subscribe(),
      supabase.channel('ann_live').on('postgres_changes', { event: '*', schema: 'public', table: 'announcements' }, fetchData).subscribe()
    ];

    return () => {
      channels.forEach(channel => channel.unsubscribe());
    };
  }, []);

  // Persistência Local (Backup)
  useEffect(() => {
    localStorage.setItem('bjj_teachers', JSON.stringify(teachers));
    localStorage.setItem('bjj_students', JSON.stringify(students));
    localStorage.setItem('bjj_announcements', JSON.stringify(announcements));
    localStorage.setItem('bjj_fed_pix', JSON.stringify(federationPixKey));
  }, [teachers, students, announcements, federationPixKey]);

  const addNotification = useCallback((notif: Omit<AppNotification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { ...notif, id }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 8000);
  }, []);

  const handleUpdateStudent = async (updated: User) => {
    setStudents(prev => prev.map(s => s.id === updated.id ? updated : s));
    if (supabase) await cloudService.upsertStudent(updated);
  };

  const handleDeleteStudent = async (id: string) => {
    if (confirm("Deseja remover permanentemente da nuvem?")) {
      setStudents(prev => prev.filter(s => s.id !== id));
      if (supabase) await cloudService.deleteUser(id, 'students');
    }
  };

  const handleDeleteTeacher = async (teacherId: string) => {
    setTeachers(prev => prev.filter(t => t.id !== teacherId));
    if (supabase) await cloudService.deleteUser(teacherId, 'teachers');
    addNotification({ title: "Cloud Update", message: "Registro removido com sucesso.", type: 'system' });
  };

  const handleAddAnnouncement = async (newAnn: Announcement) => {
    setAnnouncements(prev => [newAnn, ...prev]);
    if (supabase) await cloudService.postAnnouncement(newAnn);
  };

  const runAudit = async () => {
    setIsAiProcessing(true);
    setCloudStatus('syncing');
    try {
      const audit = async (u: User) => {
        const result = await processFinancialStatus(u.name, u.role, 0);
        return { ...u, paymentStatus: result.action === 'block' ? 'unpaid' : u.paymentStatus, lastAiAudit: result.message };
      };
      const updatedTeachers = await Promise.all(teachers.map(t => audit(t) as Promise<Teacher>));
      const updatedStudents = await Promise.all(students.map(s => audit(s)));
      setTeachers(updatedTeachers);
      setStudents(updatedStudents);
      if (supabase) {
        await Promise.all([
          ...updatedTeachers.map(t => cloudService.upsertTeacher(t)),
          ...updatedStudents.map(s => cloudService.upsertStudent(s))
        ]);
      }
      setCloudStatus('online');
      addNotification({ title: "Audit Concluída", message: "Status financeiro verificado pela IA.", type: 'system' });
    } catch (e) { 
      setCloudStatus('local'); 
      addNotification({ title: "Erro de Rede", message: "Não foi possível sincronizar.", type: 'alert' });
    } finally { 
      setIsAiProcessing(false); 
    }
  };

  if (!currentUser) return <Login onLogin={setCurrentUser} />;

  // Busca o usuário mais atualizado da lista carregada
  const userSession = [...teachers, ...students, { id: 'admin-1', role: 'ADM', status: 'active', paymentStatus: 'paid' } as User].find(u => u.id === currentUser.id) || currentUser;
  const isBlocked = (userSession.status === 'paused' || userSession.paymentStatus === 'unpaid') && userSession.role !== 'ADM';

  if (isBlocked) {
    return (
      <div className="min-h-screen bjj-gradient flex items-center justify-center p-8">
        <div className="glass-card p-12 rounded-[4rem] text-center max-w-md border-red-500/30 shadow-2xl space-y-8">
          <div className="bg-red-500/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto animate-pulse text-red-500"><Lock size={48} /></div>
          <div><h2 className="text-3xl font-black uppercase text-red-500 mb-2 italic tracking-tighter">Acesso Bloqueado</h2><p className="text-gray-400 text-sm italic">{userSession.lastAiAudit || "Pendência financeira detectada no sistema."}</p></div>
          <div className="space-y-4"><a href={OFFICIAL_PAYMENT_LINK} target="_blank" rel="noopener noreferrer" className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-6 rounded-2xl uppercase text-[11px] tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95"><CreditCard size={20} /> Regularizar Mensalidade</a><button onClick={() => setCurrentUser(null)} className="w-full bg-white/5 text-gray-400 font-black py-5 rounded-2xl uppercase text-[10px] tracking-widest hover:text-white transition-all border border-white/5">Desconectar</button></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bjj-gradient text-white flex flex-col relative overflow-x-hidden">
      <div className="fixed top-24 right-4 md:right-8 z-[200] flex flex-col gap-4 w-full max-w-[320px] pointer-events-none">
        {notifications.map(n => (
          <div key={n.id} className="glass-card p-5 rounded-2xl border-indigo-500/30 bg-[#0A0A0A]/95 shadow-2xl pointer-events-auto animate-in slide-in-from-right duration-500 flex items-start gap-4">
            <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400"><Bell size={20} className="animate-bounce" /></div>
            <div className="flex-1 space-y-1"><p className="text-[10px] font-black uppercase text-indigo-400 tracking-wider leading-none">{n.title}</p><p className="text-xs text-gray-400 font-medium leading-tight">{n.message}</p></div>
            <button onClick={() => setNotifications(prev => prev.filter(notif => notif.id !== n.id))} className="text-gray-600 hover:text-white"><X size={14} /></button>
          </div>
        ))}
      </div>
      <nav className="sticky top-0 z-50 border-b border-white/5 px-4 md:px-8 py-4 bg-black/80 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Logo size={42} showText={true} />
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
              {cloudStatus === 'online' ? <><CheckCircle2 size={14} className="text-green-500" /><span className="text-[8px] font-black uppercase text-green-500 tracking-widest">Sincronizado</span></> : 
               cloudStatus === 'syncing' ? <><RefreshCw size={14} className="text-yellow-500 animate-spin" /><span className="text-[8px] font-black uppercase text-yellow-500 tracking-widest">Atualizando...</span></> : 
               <><CloudOff size={14} className="text-red-500" /><span className="text-[8px] font-black uppercase text-red-500 tracking-widest">Offline (Local)</span></>}
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={runAudit} disabled={isAiProcessing} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-black uppercase transition-all hover:bg-indigo-500/20">
              <GitBranch size={14} className={isAiProcessing ? 'animate-spin' : ''} /> {isAiProcessing ? 'Processando...' : 'Sync Cloud'}
            </button>
            <button onClick={() => setCurrentUser(null)} className="p-2.5 bg-white/5 hover:bg-red-500/20 rounded-xl transition-all border border-white/10 text-gray-400 hover:text-red-500"><LogOut size={16} /></button>
          </div>
        </div>
      </nav>
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-10">
        {userSession.role === 'ADM' && <AdminDashboard teachers={teachers} setTeachers={setTeachers} students={students} setStudents={setStudents} onToggleStatus={async (id) => { const updated = teachers.map(t => t.id === id ? { ...t, status: t.status === 'active' ? 'paused' : 'active' } as Teacher : t); setTeachers(updated); const t = updated.find(x => x.id === id); if (t && supabase) await cloudService.upsertTeacher(t); }} onToggleStudentStatus={async (id) => { const updated = students.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'paused' : 'active' } : s); setStudents(updated); const s = updated.find(x => x.id === id); if (s && supabase) await cloudService.upsertStudent(s); }} onDeleteTeacher={handleDeleteTeacher} onDeleteStudent={handleDeleteStudent} onUpdateTeacher={async (u) => { setTeachers(prev => prev.map(t => t.id === u.id ? u : t)); if (supabase) await cloudService.upsertTeacher(u); }} onUpdateStudent={handleUpdateStudent} federationPixKey={federationPixKey} setFederationPixKey={setFederationPixKey} />}
        {userSession.role === 'PROFESSOR' && <TeacherDashboard user={userSession as Teacher} students={students} setStudents={setStudents} announcements={announcements} onAddAnnouncement={handleAddAnnouncement} setTeachers={setTeachers} onToggleStudentStatus={async (id) => { const updated = students.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'paused' : 'active' } : s); setStudents(updated); const s = updated.find(x => x.id === id); if (s && supabase) await cloudService.upsertStudent(s); }} onDeleteStudent={handleDeleteStudent} onUpdateStudent={handleUpdateStudent} federationPixKey={federationPixKey} />}
        {userSession.role === 'ALUNO' && <StudentDashboard user={userSession} announcements={announcements} onUpdateStudent={handleUpdateStudent} />}
      </main>
    </div>
  );
};

export default App;