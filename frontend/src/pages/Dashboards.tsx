import React, { useEffect, useMemo, useState } from 'react';
import { Users, Calendar, UserCheck, LayoutDashboard } from 'lucide-react';
import api from '../services/api';

type Candidato = { id: number; nome: string; cargo: string };
type Entrevistador = { id: number; nome: string; cargo: string };
type Entrevista = {
  id: number;
  data: string;
  status: string;
  candidatoId: number;
  entrevistadorId: number;
  candidato?: { nome?: string; cargo?: string };
  entrevistador?: { nome?: string; cargo?: string };
};

const statusPorData = (dataIso: string) => {
  const agora = new Date();
  const data = new Date(dataIso);
  const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
  const dia = new Date(data.getFullYear(), data.getMonth(), data.getDate());
  if (dia.getTime() > hoje.getTime()) return 'Agendada';
  if (dia.getTime() < hoje.getTime()) return 'Concluida';
  return 'Pendente';
};

const Dashboards = () => {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [entrevistadores, setEntrevistadores] = useState<Entrevistador[]>([]);
  const [entrevistas, setEntrevistas] = useState<Entrevista[]>([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const carregar = async () => {
      try {
        const [cand, ent, entrevs] = await Promise.all([
          api.get<Candidato[]>('/candidatos'),
          api.get<Entrevistador[]>('/entrevistadores'),
          api.get<Entrevista[]>('/entrevistas'),
        ]);
        setCandidatos(cand.data);
        setEntrevistadores(ent.data);
        setEntrevistas(entrevs.data);
        setErro('');
      } catch (e: any) {
        setErro(e?.response?.data?.error || 'Erro ao carregar dashboard');
      }
    };
    carregar();
  }, []);

  const entrevistasEnriquecidas = useMemo(
    () =>
      entrevistas.map((e) => {
        const dataObj = new Date(e.data);
        const statusCalc = statusPorData(e.data);
        const cand = e.candidato || candidatos.find((c) => c.id === e.candidatoId);
        const ent = e.entrevistador || entrevistadores.find((i) => i.id === e.entrevistadorId);
        const cargoCand = cand?.cargo || '';
        return {
          ...e,
          dataObj,
          statusCalc,
          candidatoNome: cand?.nome || `Candidato #${e.candidatoId}`,
          entrevistadorNome: ent?.nome || `Entrevistador #${e.entrevistadorId}`,
          cargoCand,
        };
      }),
    [entrevistas, candidatos, entrevistadores],
  );

  const totalCandidatos = candidatos.length;
  const totalEntrevistadores = entrevistadores.length;

  const entrevistasHoje = entrevistasEnriquecidas.filter((e) => {
    if (Number.isNaN(e.dataObj.getTime())) return false;
    const hoje = new Date();
    return (
      e.dataObj.getFullYear() === hoje.getFullYear() &&
      e.dataObj.getMonth() === hoje.getMonth() &&
      e.dataObj.getDate() === hoje.getDate()
    );
  }).length;

  const totalConcluidas = entrevistasEnriquecidas.filter((e) => e.statusCalc === 'Concluida').length;
  const totalAgendadas = entrevistasEnriquecidas.length;
  const taxaAprovacao = totalAgendadas === 0 ? 0 : Math.round((totalConcluidas / totalAgendadas) * 100);

  const stats = [
    { label: 'Total Candidatos', value: totalCandidatos.toString(), icon: Users, color: 'bg-blue-500' },
    { label: 'Entrevistas Hoje', value: entrevistasHoje.toString(), icon: Calendar, color: 'bg-green-500' },
    { label: 'Entrevistadores', value: totalEntrevistadores.toString(), icon: UserCheck, color: 'bg-purple-500' },
    { label: 'Taxa Aprovacao', value: `${taxaAprovacao}%`, icon: LayoutDashboard, color: 'bg-orange-500' },
  ];

  // Areas mais procuradas: contagem de candidatos por cargo
  const areasProcuradas = useMemo(() => {
    const map = new Map<string, number>();
    candidatos.forEach((c) => {
      const cargo = c.cargo || 'Outros';
      map.set(cargo, (map.get(cargo) || 0) + 1);
    });
    const cargos = ['Tecnologia', 'RH', 'Design', 'Marketing', 'Vendas', 'Financas', 'Outros'];
    return cargos.map((c) => ({ cargo: c, total: map.get(c) || 0 }));
  }, [candidatos]);

  const proximas = useMemo(() => {
    const agora = new Date();
    return [...entrevistasEnriquecidas]
      .filter((e) => !Number.isNaN(e.dataObj.getTime()) && e.dataObj >= agora)
      .sort((a, b) => a.dataObj.getTime() - b.dataObj.getTime())
      .slice(0, 5);
  }, [entrevistasEnriquecidas]);

  const concluidas = useMemo(
    () => entrevistasEnriquecidas.filter((e) => e.statusCalc === 'Concluida').sort((a, b) => b.dataObj.getTime() - a.dataObj.getTime()),
    [entrevistasEnriquecidas],
  );

  return (
    <div className="space-y-6">
      {erro && <div className="text-red-600 text-sm">{erro}</div>}

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Areas mais procuradas</h3>
          <div className="h-64 flex items-end justify-around gap-2">
            {areasProcuradas.map((item, i) => {
              const altura = Math.min(Math.max(item.total * 20, item.total > 0 ? 14 : 6), 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:from-blue-700 hover:to-blue-500"
                    style={{ height: `${altura}%` }}
                  />
                  <span className="text-xs text-gray-600 text-center">{item.cargo}</span>
                  <span className="text-xs text-gray-500">{item.total}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Proximas Entrevistas</h3>
          <div className="space-y-3">
            {proximas.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{item.candidatoNome}</p>
                  <p className="text-sm text-gray-600">{item.entrevistadorNome}</p>
                  <p className="text-xs text-gray-500">
                    {item.dataObj.toLocaleDateString('pt-BR')} - {item.dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <span className="text-sm font-medium text-blue-600">{item.statusCalc}</span>
              </div>
            ))}
            {proximas.length === 0 && <div className="text-gray-500 text-sm">Sem entrevistas futuras.</div>}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Concluidos</h3>
        <div className="space-y-3">
          {concluidas.slice(0, 5).map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">{item.candidatoNome}</p>
                <p className="text-sm text-gray-600">{item.entrevistadorNome}</p>
                <p className="text-xs text-gray-500">
                  {item.dataObj.toLocaleDateString('pt-BR')} - {item.dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <span className="text-sm font-medium text-green-700">Concluida</span>
            </div>
          ))}
          {concluidas.length === 0 && <div className="text-gray-500 text-sm">Nenhuma entrevista concluida.</div>}
        </div>
      </div>
    </div>
  );
};

export default Dashboards;
