import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  usuario: z.string().min(1, "Informe o usuario"),
  password: z.string().min(1, "Informe a senha"),
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: any) => {
    setLoading(true);

    if (!(data.usuario === "admin" && data.password === "admin")) {
      setLoading(false);
      alert("Usuario ou senha invalidos");
      return;
    }

    const fakeUser = { usuario: data.usuario, nome: "Admin" };
    localStorage.setItem("token", "dev-token");
    localStorage.setItem("user", JSON.stringify(fakeUser));

    navigate("/home", { replace: true });
    setTimeout(() => {
      if (window.location.pathname !== "/home") {
        window.location.href = "/home";
      }
    }, 50);

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sistema de Recrutamento
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Usuario</label>
            <input
              type="text"
              {...register("usuario")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Digite seu usuario"
            />
            {errors.usuario && (
              <p className="text-sm text-red-500">{errors.usuario.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Digite sua senha"
            />
            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
