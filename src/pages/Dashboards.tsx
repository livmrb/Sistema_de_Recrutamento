import React from 'react';
import { Users, Calendar, UserCheck, LayoutDashboard } from 'lucide-react';

const Dashboards = () => {
  const stats = [
    { label: 'Total Candidatos', value: '1,234', icon: Users, color: 'bg-blue-500' },
    { label: 'Entrevistas Hoje', value: '12', icon: Calendar, color: 'bg-green-500' },
    { label: 'Entrevistadores', value: '45', icon: UserCheck, color: 'bg-purple-500' },
    { label: 'Taxa Aprovação', value: '68%', icon: LayoutDashboard, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Entrevistas por Mês</h3>
          <div className="h-64 flex items-end justify-around gap-2">
            {[65, 80, 45, 90, 70, 85].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:from-blue-700 hover:to-blue-500"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-gray-600">Mês {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Próximas Entrevistas</h3>
          <div className="space-y-3">
            {[
              { candidato: 'João Silva', cargo: 'Desenvolvedor', horario: '10:00' },
              { candidato: 'Maria Santos', cargo: 'Designer', horario: '14:00' },
              { candidato: 'Pedro Costa', cargo: 'Analista', horario: '16:00' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{item.candidato}</p>
                  <p className="text-sm text-gray-600">{item.cargo}</p>
                </div>
                <span className="text-sm font-medium text-blue-600">{item.horario}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboards;