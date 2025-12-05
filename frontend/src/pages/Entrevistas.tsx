import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import api from '../services/api';

type Candidato = { id: number; nome: string; cargo: string };
type Entrevistador = { id: number; nome: string; cargo: string; departamento?: string };
type Entrevista = {
  id: number;
  data: string;
  status: string;
  observacoes?: string | null;
  candidatoId: number;
  entrevistadorId: number;
  candidato?: Candidato;
  entrevistador?: Entrevistador;
};

const cargos = [
  { value: 'Tecnologia', label: 'Tecnologia' },
  { value: 'RH', label: 'RH' },
  { value: 'Design', label: 'Design' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Vendas', label: 'Vendas' },
  { value: 'Financas', label: 'Finanças' },
];

const statusPorData = (dataIso: string | undefined | null) => {
  if (!dataIso) return 'Pendente';
  const data = new Date(dataIso);
  if (Number.isNaN(data.getTime())) return 'Pendente';
  const agora = new Date();
  const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
  const diaEntrevista = new Date(data.getFullYear(), data.getMonth(), data.getDate());

  if (diaEntrevista.getTime() > hoje.getTime()) return 'Agendada';
  if (diaEntrevista.getTime() < hoje.getTime()) return 'Concluida';
  return 'Pendente';
};

const Entrevistas = () => {
  const [entrevistas, setEntrevistas] = useState<Entrevista[]>([]);
  const [entrevistadores, setEntrevistadores] = useState<Entrevistador[]>([]);
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [erro, setErro] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ cargo: 'Tecnologia', candidatoId: '', data: '' });
  const [loading, setLoading] = useState(false);

  const candidatosFiltrados = useMemo(
    () => candidatos.filter((c) => c.cargo === form.cargo),
    [candidatos, form.cargo],
  );

  useEffect(() => {
    const carregar = async () => {
      try {
        const [respCand, respEntrevistas, respEntrevistadores] = await Promise.all([
          api.get<Candidato[]>('/candidatos'),
          api.get<Entrevista[]>('/entrevistas'),
          api.get<Entrevistador[]>('/entrevistadores'),
        ]);
        setCandidatos(respCand.data);
        setEntrevistas(respEntrevistas.data);
        setEntrevistadores(respEntrevistadores.data);
        setErro('');
      } catch (e: any) {
        setErro(e?.response?.data?.error || 'Erro ao carregar entrevistas');
      }
    };
    carregar();
  }, []);

  const criar = async () => {
    try {
      if (!form.candidatoId || !form.data) {
        setErro('Preencha candidato e data/hora');
        return;
      }
      const entrevistador = entrevistadores.find((i) => i.cargo === form.cargo);
      if (!entrevistador) {
        setErro('Entrevistador não encontrado para o cargo selecionado.');
        return;
      }

      setLoading(true);
      setErro('');

      const status = statusPorData(form.data);

      await api.post('/entrevistas', {
        data: new Date(form.data).toISOString(),
        status,
        candidatoId: Number(form.candidatoId),
        entrevistadorId: entrevistador.id,
      });

      setForm({ cargo: 'Tecnologia', candidatoId: '', data: '' });
      setShowForm(false);

      const lista = await api.get<Entrevista[]>('/entrevistas');
      setEntrevistas(lista.data);
    } catch (e: any) {
      const msg =
        e?.response?.data?.error ||
        e?.response?.data?.message ||
        (Array.isArray(e?.response?.data?.errors) ? e.response.data.errors.map((i: any) => i.message).join(', ') : '') ||
        'Erro ao agendar entrevista';
      setErro(msg);
    } finally {
      setLoading(false);
    }
  };

  const entrevistasComNomes = useMemo(
    () =>
      entrevistas
        .map((e) => {
          const candidato = e.candidato || candidatos.find((c) => c.id === e.candidatoId);
          const entrevistador = e.entrevistador || entrevistadores.find((i) => i.id === e.entrevistadorId);
          const status = statusPorData(e.data);
          const dataObj = e.data ? new Date(e.data) : null;
          return {
            ...e,
            candidatoNome: candidato?.nome || '—',
            entrevistadorNome: entrevistador?.nome || '—',
            cargo: candidato?.cargo || '',
            statusCalc: status,
            dataObj,
          };
        })
        .filter((e) => e.statusCalc !== 'Concluida'),
    [entrevistas, candidatos, entrevistadores],
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Agendada':
        return 'bg-green-100 text-green-700';
      case 'Concluida':
        return 'bg-gray-200 text-gray-700';
      case 'Pendente':
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Agenda de Entrevistas</h3>
          <p className="text-sm text-gray-600">Agende entrevistas vinculando candidato e entrevistador</p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {showForm ? 'Fechar' : '+ Agendar Entrevista'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <select
              value={form.cargo}
              onChange={(e) => setForm({ ...form, cargo: e.target.value, candidatoId: '' })}
              className="border p-2 rounded"
            >
              {cargos.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <select
              value={form.candidatoId}
              onChange={(e) => setForm({ ...form, candidatoId: e.target.value })}
              className="border p-2 rounded"
            >
              <option value="">Selecione candidato</option>
              {candidatosFiltrados.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
            <input
              type="datetime-local"
              value={form.data}
              onChange={(e) => setForm({ ...form, data: e.target.value })}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={criar}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
            {erro && <span className="text-red-600 text-sm">{erro}</span>}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 space-y-4">
          {entrevistasComNomes.map((entrevista) => (
            <div
              key={entrevista.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="text-blue-600" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{entrevista.candidatoNome}</h4>
                  <p className="text-sm text-gray-600">com {entrevista.entrevistadorNome}</p>
                  <p className="text-xs text-gray-500 mt-1">{entrevista.cargo}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800 flex items-center gap-1">
                    <Calendar size={14} />
                    {entrevista.dataObj
                      ? entrevista.dataObj.toLocaleDateString('pt-BR')
                      : '--'}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Clock size={14} />
                    {entrevista.dataObj
                      ? entrevista.dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                      : '--'}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(entrevista.statusCalc)}`}>
                  {entrevista.statusCalc}
                </span>
              </div>
            </div>
          ))}
          {entrevistasComNomes.length === 0 && (
            <div className="text-center text-gray-500">Nenhuma entrevista agendada.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Entrevistas;
