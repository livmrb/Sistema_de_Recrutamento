import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const Entrevistas = () => {
  const entrevistas = [
    { 
      id: 1, 
      candidato: 'João Silva', 
      entrevistador: 'Dr. Roberto Lima', 
      data: '2024-11-15', 
      horario: '10:00', 
      status: 'Agendada',
      cargo: 'Desenvolvedor Frontend'
    },
    { 
      id: 2, 
      candidato: 'Maria Santos', 
      entrevistador: 'Dra. Paula Mendes', 
      data: '2024-11-15', 
      horario: '14:00', 
      status: 'Concluída',
      cargo: 'Designer UX/UI'
    },
    { 
      id: 3, 
      candidato: 'Pedro Costa', 
      entrevistador: 'Prof. Marcos Oliveira', 
      data: '2024-11-16', 
      horario: '09:00', 
      status: 'Agendada',
      cargo: 'Analista de Dados'
    },
    { 
      id: 4, 
      candidato: 'Ana Carolina', 
      entrevistador: 'Ana Carolina Santos', 
      data: '2024-11-16', 
      horario: '11:00', 
      status: 'Agendada',
      cargo: 'Gerente de Marketing'
    },
    { 
      id: 5, 
      candidato: 'Ricardo Alves', 
      entrevistador: 'Dr. Roberto Lima', 
      data: '2024-11-17', 
      horario: '15:00', 
      status: 'Pendente',
      cargo: 'Desenvolvedor Backend'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Agendada':
        return 'bg-green-100 text-green-700';
      case 'Concluída':
        return 'bg-gray-200 text-gray-700';
      case 'Pendente':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Agenda de Entrevistas</h3>
          <p className="text-sm text-gray-600">Gerencie o calendário de entrevistas</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          + Agendar Entrevista
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 space-y-4">
          {entrevistas.map((entrevista) => (
            <div key={entrevista.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="text-blue-600" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{entrevista.candidato}</h4>
                  <p className="text-sm text-gray-600">com {entrevista.entrevistador}</p>
                  <p className="text-xs text-gray-500 mt-1">{entrevista.cargo}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(entrevista.data)}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Clock size={14} />
                    {entrevista.horario}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(entrevista.status)}`}>
                  {entrevista.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Entrevistas;