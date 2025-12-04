import React from 'react';

const Candidatos = () => {
  const candidatos = [
    { id: 1, nome: 'Ana Silva', email: 'ana@email.com', cargo: 'Desenvolvedor Frontend', status: 'Em análise' },
    { id: 2, nome: 'Carlos Souza', email: 'carlos@email.com', cargo: 'Designer UX/UI', status: 'Aprovado' },
    { id: 3, nome: 'Marina Costa', email: 'marina@email.com', cargo: 'Analista de Dados', status: 'Entrevista agendada' },
    { id: 4, nome: 'Ricardo Alves', email: 'ricardo@email.com', cargo: 'Desenvolvedor Backend', status: 'Em análise' },
    { id: 5, nome: 'Juliana Moraes', email: 'juliana@email.com', cargo: 'Product Manager', status: 'Aprovado' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return 'bg-green-100 text-green-700';
      case 'Em análise':
        return 'bg-blue-100 text-blue-700';
      case 'Entrevista agendada':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Lista de Candidatos</h3>
          <p className="text-sm text-gray-600">Gerencie todos os candidatos do processo seletivo</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          + Novo Candidato
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Nome</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Email</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Cargo</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {candidatos.map((candidato) => (
              <tr key={candidato.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-800">{candidato.nome}</td>
                <td className="p-4 text-gray-600">{candidato.email}</td>
                <td className="p-4 text-gray-600">{candidato.cargo}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(candidato.status)}`}>
                    {candidato.status}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Ver detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Candidatos;