import React, { useEffect, useMemo, useState } from 'react';
import { Calendar } from 'lucide-react';
import api from '../services/api';

const entrevistadoresEstaticos = [
  { id: 1, nome: 'Dr. Roberto Lima', especialidade: 'Tecnologia', email: 'roberto.lima@empresa.com' },
  { id: 2, nome: 'Dra. Paula Mendes', especialidade: 'RH', email: 'paula.mendes@empresa.com' },
  { id: 3, nome: 'Prof. Marcos Oliveira', especialidade: 'Design', email: 'marcos.oliveira@empresa.com' },
  { id: 4, nome: 'Ana Carolina Santos', especialidade: 'Marketing', email: 'ana.santos@empresa.com' },
  { id: 5, nome: 'Carlos Eduardo', especialidade: 'Vendas', email: 'carlos.eduardo@empresa.com' },
  { id: 6, nome: 'Fernanda Costa', especialidade: 'Finanças', email: 'fernanda.costa@empresa.com' },
];

type Entrevista = {
  id: number;
  entrevistadorId: number;
};

const Entrevistadores = () => {
  const [entrevistas, setEntrevistas] = useState<Entrevista[]>([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const carregar = async () => {
      try {
        const resp = await api.get<Entrevista[]>('/entrevistas');
        setEntrevistas(resp.data);
        setErro('');
      } catch (e: any) {
        setErro(e?.response?.data?.error || 'Erro ao carregar entrevistas');
      }
    };
    carregar();
  }, []);

  const contagem = useMemo(() => {
    const map = new Map<number, number>();
    entrevistas.forEach((i) => {
      map.set(i.entrevistadorId, (map.get(i.entrevistadorId) || 0) + 1);
    });
    return map;
  }, [entrevistas]);

  const getInitials = (nome: string) => nome.split(' ').map((n) => n[0]).join('').substring(0, 2);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Entrevistadores</h3>
          <p className="text-sm text-gray-600">Gerencie a equipe de entrevistadores</p>
        </div>
      </div>

      {erro && <div className="text-red-600 text-sm">{erro}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entrevistadoresEstaticos.map((entrevistador) => (
          <div
            key={entrevistador.id}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow"
          >
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
                  <span className="text-gray-700">
                    {contagem.get(entrevistador.id) || 0} entrevistas
                  </span>
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
