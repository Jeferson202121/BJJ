
import React from 'react';

export const BELT_COLORS: Record<string, string> = {
  'Branca': 'bg-slate-200 text-slate-900 border-slate-300',
  
  // Sistema Cinza
  'Cinza/Branca': 'bg-slate-400 text-white border-slate-200 border-b-4',
  'Cinza': 'bg-slate-500 text-white border-slate-400',
  'Cinza/Preta': 'bg-slate-500 text-white border-slate-950 border-b-4',
  
  // Sistema Amarelo
  'Amarela/Branca': 'bg-yellow-400 text-slate-900 border-slate-100 border-b-4',
  'Amarela': 'bg-yellow-400 text-slate-900 border-yellow-500',
  'Amarela/Preta': 'bg-yellow-400 text-slate-900 border-slate-950 border-b-4',
  
  // Sistema Laranja
  'Laranja/Branca': 'bg-orange-500 text-white border-slate-100 border-b-4',
  'Laranja': 'bg-orange-500 text-white border-orange-600',
  'Laranja/Preta': 'bg-orange-500 text-white border-slate-950 border-b-4',
  
  // Sistema Verde
  'Verde/Branca': 'bg-emerald-600 text-white border-slate-100 border-b-4',
  'Verde': 'bg-emerald-600 text-white border-emerald-700',
  'Verde/Preta': 'bg-emerald-600 text-white border-slate-950 border-b-4',
  
  // Sistema Adulto
  'Azul': 'bg-blue-600 text-white border-blue-400',
  'Roxa': 'bg-purple-700 text-white border-purple-500',
  'Marrom': 'bg-amber-900 text-amber-100 border-amber-700',
  'Preta': 'bg-slate-950 text-amber-500 border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
};

export const Logo = ({ className = "w-16 h-16", customSrc = null }: { className?: string, customSrc?: string | null }) => (
  <div className={`${className} flex items-center justify-center`}>
    {customSrc ? (
      <img src={customSrc} alt="Logo Academia" className="w-full h-full object-contain rounded-full shadow-lg border-2 border-amber-500/30" />
    ) : (
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">
        <circle cx="50" cy="50" r="48" fill="#020617" stroke="#f59e0b" strokeWidth="2" />
        <circle cx="50" cy="50" r="42" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
        <g fill="#f59e0b">
          <path d="M50 35 C60 35, 75 45, 75 60 C75 75, 60 85, 45 80" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
          <path d="M40 38 Q55 30 70 45" fill="none" stroke="#f8fafc" strokeWidth="4" strokeLinecap="round" />
          <circle cx="45" cy="40" r="5" fill="#f59e0b" />
        </g>
        <path d="M20 80 Q50 90 80 80" fill="none" stroke="#f8fafc" strokeWidth="6" strokeLinecap="round" />
        <rect x="45" y="83" width="10" height="5" fill="#f59e0b" rx="1" />
      </svg>
    )}
  </div>
);

export const Icons = {
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  ),
  Store: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
  ),
  Finance: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
  ),
  Community: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
  ),
  Brain: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0 .94 4.82 2.5 2.5 0 0 0 0 4.28 2.5 2.5 0 0 0-1.28 4.38 2.5 2.5 0 0 0 4.8 1.48 2.5 2.5 0 0 0 4.96 0 2.5 2.5 0 0 0 4.8-1.48 2.5 2.5 0 0 0-1.28-4.38 2.5 2.5 0 0 0 0-4.28 2.5 2.5 0 0 0 .94-4.82 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 12 4.5Z"/></svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  Edit: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
  ),
  Settings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
};
