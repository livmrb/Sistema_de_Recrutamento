import React, { useEffect, useMemo, useState } from 'react';
import { Edit2, XCircle } from 'lucide-react';
import api from '../services/api';

const cargos = ['Tecnologia', 'RH', 'Design', 'Marketing', 'Vendas', 'Financas'];

type Candidato = {
  id: number;
  nome: string;
  email: string;
  cargo: string;
};

const Candidatos = () => {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nome: '', email: '', cargo: 'Tecnologia' });
  const [editId, setEditId] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ id: number; nome: string } | null>(null);

  const carregar = async () => {
    try {
      setLoading(true);
      const res = await api.get<Candidato[]>('/candidatos');
      setCandidatos(res.data);
    } catch (e: any) {
      setErro(e?.response?.data?.error || 'Erro ao listar candidatos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const salvar = async () => {
    try {
      setLoading(true);
      setErro('');
      if (editId) {
        await api.put(`/candidatos/${editId}`, form);
      } else {
        await api.post('/candidatos', form);
      }
      setForm({ nome: '', email: '', cargo: 'Tecnologia' });
      setEditId(null);
      setShowForm(false);
      await carregar();
    } catch (e: any) {
      const msg =
        e?.response?.data?.error ||
        e?.response?.data?.message ||
        (Array.isArray(e?.response?.data?.errors) ? e.response.data.errors.map((i: any) => i.message).join(', ') : '') ||
        'Erro ao salvar candidato';
      setErro(msg);
    } finally {
      setLoading(false);
    }
  };

  const lista = useMemo(() => candidatos, [candidatos]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Lista de Candidatos</h3>
          <p className="text-sm text-gray-600">Gerencie todos os candidatos do processo seletivo</p>
        </div>
        <button
          onClick={() => {
            setShowForm((v) => !v);
            setEditId(null);
            setForm({ nome: '', email: '', cargo: 'Tecnologia' });
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {showForm ? 'Fechar' : '+ Novo Candidato'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              placeholder="Nome"
              className="border p-2 rounded"
            />
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="border p-2 rounded"
            />
            <select
              value={form.cargo}
              onChange={(e) => setForm({ ...form, cargo: e.target.value })}
              className="border p-2 rounded"
            >
              {cargos.map((cargo) => (
                <option key={cargo} value={cargo}>
                  {cargo}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={salvar}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? 'Salvando...' : editId ? 'Atualizar' : 'Salvar'}
            </button>
            {erro && <span className="text-red-600 text-sm">{erro}</span>}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Nome</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Email</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Cargo</th>
                <th className="text-right p-4 text-sm font-semibold text-gray-700">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((candidato) => (
                <tr key={candidato.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-800">{candidato.nome}</td>
                  <td className="p-4 text-gray-600">{candidato.email}</td>
                  <td className="p-4 text-gray-600">{candidato.cargo}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => {
                          setForm({ nome: candidato.nome, email: candidato.email, cargo: candidato.cargo });
                          setEditId(candidato.id);
                          setShowForm(true);
                        }}
                        title="Editar"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => setConfirmDelete({ id: candidato.id, nome: candidato.nome })}
                        title="Remover"
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {lista.length === 0 && !loading && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    Nenhum candidato cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm space-y-4">
            <p className="text-lg font-semibold text-gray-800">Deseja realmente excluir?</p>
            <p className="text-sm text-gray-600">Candidato: {confirmDelete.nome}</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={() => setConfirmDelete(null)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                onClick={async () => {
                  try {
                    setLoading(true);
                    await api.delete(`/candidatos/${confirmDelete.id}`);
                    setConfirmDelete(null);
                    await carregar();
                  } catch (e: any) {
                    setErro('Erro ao excluir candidato');
                  } finally {
                    setLoading(false);
                  }
                }}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Candidatos;
