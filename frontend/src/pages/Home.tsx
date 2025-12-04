import React, { useState } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  UserCheck, 
  Menu, 
  X, 
  LogOut,
  ChevronRight
} from 'lucide-react';

// Importar os componentes das páginas
import Dashboards from './Dashboards';
import Candidatos from './Candidatos';
import Entrevistadores from './Entrevistadores';
import Entrevistas from './Entrevistas';

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/home/dashboard' },
    { id: 'candidatos', label: 'Candidatos', icon: Users, path: '/home/candidatos' },
    { id: 'entrevistadores', label: 'Entrevistadores', icon: UserCheck, path: '/home/entrevistadores' },
    { id: 'entrevistas', label: 'Entrevistas', icon: Calendar, path: '/home/entrevistas' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getCurrentPageTitle = () => {
    const currentPath = location.pathname;
    const currentItem = menuItems.find(item => currentPath.includes(item.id));
    return currentItem?.label || 'Dashboard';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-blue-600 to-blue-800 text-white transition-all duration-300 ease-in-out flex flex-col`}
      >
        {/* Header Sidebar */}
        <div className="p-4 flex items-center justify-between border-b border-blue-500">
          {sidebarOpen && (
            <h1 className="text-xl font-bold">RecrutaSystem</h1>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.includes(item.id);
            
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-white text-blue-600 shadow-lg' 
                    : 'hover:bg-blue-700 text-white'
                }`}
              >
                <Icon size={22} />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-left font-medium">{item.label}</span>
                    {isActive && <ChevronRight size={18} />}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-blue-500">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center font-bold">
              U
            </div>
            {sidebarOpen && (
              <>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">Usuário Admin</p>
                  <p className="text-xs text-blue-200">admin@empresa.com</p>
                </div>
                <LogOut size={18} />
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {getCurrentPageTitle()}
            </h2>
            <p className="text-sm text-gray-500">
              Bem-vindo ao sistema de recrutamento
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">
                {new Date().toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </header>

        {/* Content Area - Rotas Aninhadas */}
        <div className="flex-1 overflow-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboards />} />
            <Route path="dashboard" element={<Dashboards />} />
            <Route path="candidatos" element={<Candidatos />} />
            <Route path="entrevistadores" element={<Entrevistadores />} />
            <Route path="entrevistas" element={<Entrevistas />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Home;