
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Student, BeltColor, UserRole, Payment, Product, Post, Instructor, Subscription, AdminTask } from './types';
import { Icons, Logo } from './constants';
import Dashboard from './views/Dashboard';
import StudentList from './views/StudentList';
import StudentForm from './views/StudentForm';
import StudentProfile from './views/StudentProfile';
import Store from './views/Store';
import Payments from './views/Payments';
import Community from './views/Community';
import Login from './views/Login';
import InstructorList from './views/InstructorList';
import InstructorForm from './views/InstructorForm';
import TaskList from './views/TaskList';

const INITIAL_SUBSCRIPTION: Subscription = {
  plan: 'Gratuito',
  startDate: new Date().toISOString(),
  studentLimit: 10,
  price: 0
};

const INITIAL_STUDENTS: Student[] = [];

const INITIAL_TASKS: AdminTask[] = [
  {
    id: 'task-bday-default',
    title: 'Notificar Aniversariantes',
    description: 'Verificar aniversariantes do dia no Dashboard e enviar saudações personalizadas via WhatsApp para fortalecer o engajamento.',
    priority: 'Alta',
    completed: false,
    dueDate: new Date().toISOString().split('T')[0]
  }
];

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [tasks, setTasks] = useState<AdminTask[]>(INITIAL_TASKS);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [academyLogo, setAcademyLogo] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<Subscription>(INITIAL_SUBSCRIPTION);
  const [premiumStaffPrice, setPremiumStaffPrice] = useState(29.90);
  const [adminPixKey, setAdminPixKey] = useState('jefersoncarvalho252@gmail.com');
  const [adminPhone, setAdminPhone] = useState('5579999055301');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('gestao_bjj_elite_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      setStudents(parsed.students || INITIAL_STUDENTS);
      setInstructors(parsed.instructors || []);
      setTasks(parsed.tasks || INITIAL_TASKS);
      setPayments(parsed.payments || []);
      setPosts(parsed.posts || []);
      setAcademyLogo(parsed.academyLogo || null);
      setSubscription(parsed.subscription || INITIAL_SUBSCRIPTION);
      if (parsed.premiumStaffPrice) setPremiumStaffPrice(parsed.premiumStaffPrice);
      if (parsed.adminPixKey) setAdminPixKey(parsed.adminPixKey);
      if (parsed.adminPhone) setAdminPhone(parsed.adminPhone);
      if (parsed.products) setProducts(parsed.products);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gestao_bjj_elite_data', JSON.stringify({ 
      students, instructors, tasks, payments, posts, academyLogo, subscription, products, premiumStaffPrice, adminPixKey, adminPhone 
    }));
  }, [students, instructors, tasks, payments, posts, academyLogo, subscription, products, premiumStaffPrice, adminPixKey, adminPhone]);

  const addStudent = (s: Student) => setStudents(prev => [...prev, s]);
  const updateStudent = (id: string, updated: Partial<Student>) => setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  const deleteStudent = (id: string) => setStudents(prev => prev.filter(s => s.id !== id));
  const addInstructor = (instructor: Instructor) => setInstructors(prev => [...prev, instructor]);
  const updateInstructor = (id: string, updated: Partial<Instructor>) => setInstructors(prev => prev.map(i => i.id === id ? { ...i, ...updated } : i));
  const deleteInstructor = (id: string) => setInstructors(prev => prev.filter(i => i.id !== id));
  const addTask = (task: AdminTask) => setTasks(prev => [...prev, task]);
  const updateTask = (id: string, updated: Partial<AdminTask>) => setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  const deleteTask = (id: string) => setTasks(prev => prev.filter(t => t.id !== id));
  const addProduct = (p: Product) => setProducts(prev => [...prev, { ...p, status: 'Ativo' }]);
  const updateProduct = (id: string, updated: Partial<Product>) => setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));

  const handleLogout = () => {
    setCurrentUser(null);
    window.location.hash = '#/';
  };

  if (!currentUser) return <Login onLogin={setCurrentUser} instructors={instructors} students={students} academyLogo={academyLogo} />;

  return (
    <Router>
      <div className="flex flex-col md:flex-row min-h-screen bg-[#020617]">
        <header className="md:hidden flex items-center justify-between px-6 py-4 bg-[#020617] border-b border-amber-500/10 sticky top-0 z-30">
          <Link to="/" className="flex items-center gap-3">
            <Logo className="w-10 h-10" customSrc={academyLogo} />
            <span className="text-sm font-black text-white tracking-tighter uppercase italic bjj-header-font">
              GESTAO <span className="text-amber-500">BJJ</span>
            </span>
          </Link>
          <button onClick={handleLogout} className="p-2.5 text-amber-500 bg-amber-500/5 border border-amber-500/20 rounded-xl">
             <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </header>
        
        <aside className="w-72 bg-[#020617] text-slate-400 min-h-screen hidden md:flex flex-col border-r border-amber-500/10 z-20 shadow-[20px_0_40px_rgba(0,0,0,0.5)] sticky top-0 h-screen">
          <div className="p-10 flex flex-col items-center">
            <Link to="/" className="flex flex-col items-center gap-5 mb-12">
              <Logo className="w-24 h-24" customSrc={academyLogo} />
              <h1 className="text-2xl font-black text-white uppercase italic bjj-header-font">GESTAO <span className="text-amber-500">BJJ</span></h1>
            </Link>
            <div className="w-full p-4 bg-slate-900/50 border border-amber-500/10 rounded-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center font-bold text-slate-950 text-xs">{currentUser.name.charAt(0)}</div>
                <div>
                  <p className="text-[11px] font-bold text-white">{currentUser.name}</p>
                  <p className="text-[8px] text-amber-500 font-black uppercase tracking-widest">{currentUser.role}</p>
                </div>
              </div>
              <button onClick={handleLogout} className="p-2 text-slate-500 hover:text-amber-500"><Icons.Dashboard /></button>
            </div>
          </div>
          <nav className="flex-1 px-8 space-y-2">
            {[
              { path: '/', label: 'Painel', icon: Icons.Dashboard, show: currentUser.role !== 'Aluno' },
              { path: '/', label: 'Início', icon: Icons.Dashboard, show: currentUser.role === 'Aluno' },
              { path: '/community', label: 'Mural', icon: Icons.Community, show: true },
              { path: '/instructors', label: 'Time Técnico', icon: Icons.Users, show: currentUser.role === 'Administrador' },
              { path: '/tasks', label: 'Tarefas', icon: Icons.Brain, show: currentUser.role === 'Administrador' },
              { path: '/students', label: 'Guerreiros', icon: Icons.Users, show: currentUser.role !== 'Aluno' },
              { path: '/store', label: 'Arsenal', icon: Icons.Store, show: true },
              { path: '/finance', label: 'Tesouraria', icon: Icons.Finance, show: currentUser.role === 'Administrador' },
            ].filter(i => i.show).map((item) => (
              <Link key={item.path} to={item.path} className="flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all font-bold text-[11px] uppercase tracking-wider text-slate-500 hover:text-amber-500 hover:bg-amber-500/5">
                <item.icon /> <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-x-hidden bg-[#020617]">
          <div className="p-6 md:p-14 max-w-7xl mx-auto w-full">
            <Routes>
              <Route path="/" element={<Dashboard 
                students={students} 
                instructors={instructors} 
                payments={payments} 
                user={currentUser} 
                academyLogo={academyLogo} 
                onLogoChange={setAcademyLogo} 
                subscription={subscription} 
                premiumStaffPrice={premiumStaffPrice} 
                onUpdatePremiumPrice={setPremiumStaffPrice}
                adminPixKey={adminPixKey}
                onUpdateAdminPix={setAdminPixKey}
                adminPhone={adminPhone}
                onUpdateAdminPhone={setAdminPhone}
                onUpgrade={() => {}} 
                onLogout={handleLogout}
                onDeleteStudent={deleteStudent}
              />} />
              <Route path="/tasks" element={<TaskList tasks={tasks} onAdd={addTask} onUpdate={updateTask} onDelete={deleteTask} />} />
              <Route path="/instructors" element={<InstructorList instructors={instructors} onUpdate={updateInstructor} onDelete={deleteInstructor} premiumStaffPrice={premiumStaffPrice} onUpdatePrice={setPremiumStaffPrice} />} />
              <Route path="/instructors/new" element={<InstructorForm onSubmit={addInstructor} />} />
              <Route path="/instructors/edit/:id" element={<InstructorForm instructors={instructors} onSubmit={updateInstructor} />} />
              <Route path="/students" element={<StudentList students={students} onDelete={deleteStudent} onUpdate={updateStudent} user={currentUser} subscription={subscription} />} />
              <Route path="/students/new" element={<StudentForm onSubmit={addStudent} students={students} subscription={subscription} user={currentUser} />} />
              <Route path="/students/edit/:id" element={<StudentForm students={students} onSubmit={updateStudent} subscription={subscription} user={currentUser} />} />
              <Route path="/students/profile/:id" element={<StudentProfile students={students} onUpdate={updateStudent} onDelete={deleteStudent} user={currentUser} />} />
              <Route path="/store" element={<Store products={products} instructors={instructors} user={currentUser} onAddProduct={addProduct} onUpdateProduct={updateProduct} onDeleteProduct={deleteProduct} adminPixKey={adminPixKey} adminPhone={adminPhone} />} />
              <Route path="/finance" element={<Payments payments={payments} students={students} user={currentUser} />} />
              <Route path="/community" element={<Community posts={posts} user={currentUser} onPost={(p) => setPosts(prev => [p, ...prev])} />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
