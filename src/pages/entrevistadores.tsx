import React from 'react';
import { Calendar } from 'lucide-react';

const Entrevistadores = () => {
  const entrevistadores = [
    { id: 1, nome: 'Dr. Roberto Lima', especialidade: 'Tecnologia', entrevistas: 45, email: 'roberto.lima@empresa.com' },
    { id: 2, nome: 'Dra. Paula Mendes', especialidade: 'RH', entrevistas: 38, email: 'paula.mendes@empresa.com' },
    { id: 3, nome: 'Prof. Marcos Oliveira', especialidade: 'Design', entrevistas: 29, email: 'marcos.oliveira@empresa.com' },
    { id: 4, nome: 'Ana Carolina Santos', especialidade: 'Marketing', entrevistas: 32, email: 'ana.santos@empresa.com' },
    { id: 5, nome: 'Carlos Eduardo', especialidade: 'Vendas', entrevistas: 27, email: 'carlos.eduardo@empresa.com' },
    { id: 6, nome: 'Fernanda Costa', especialidade: 'Finanças', entrevistas: 31, email: 'fernanda.costa@empresa.com' },
  ];

  const getInitials = (nome: string) => {
    return nome.split(' ').map(n => n[0]).join('').substring(0, 2);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Entrevistadores</h3>
          <p className="text-sm text-gray-600">Gerencie a equipe de entrevistadores</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          + Novo Entrevistador
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entrevistadores.map((entrevistador) => (
          <div key={entrevistador.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                {getInitials(entrevistador.nome)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-800 mb-1 truncate">{entrevistador.nome}</h4>
                <p className="text-sm text-gray-600 mb-1">{entrevistador.especialidade}</p>
                <p className="text-xs text-gray-500 mb-3 truncate">{entrevistador.email}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={16} className="text-blue-600" />
                  <span className="text-gray-700">{entrevistador.entrevistas} entrevistas</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Entrevistadores;