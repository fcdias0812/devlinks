// Importando hooks necessários do React
import { FormEvent, useState } from "react";
// Importando componentes de navegação do React Router
import { Link, useNavigate } from "react-router";
// Importando componente de Input customizado
import { Input } from "../../components/Input";
// Importando toast para notificações
import { toast } from "react-toastify";

// Importando configurações do Firebase
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

// Componente de Login - Gerencia a autenticação de usuários
export function Login() {
  // Estados para controle do formulário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Hook para navegação programática entre páginas
  const navigate = useNavigate();

  // Função de autenticação do usuário
  async function handleSubmit(e: FormEvent) {
    // Previne o comportamento padrão do formulário
    e.preventDefault();

    // Validação simples para campos vazios
    if (!email || !password) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      // Tentativa de autenticação com Firebase
      await signInWithEmailAndPassword(auth, email, password);
      // Redireciona para a página admin em caso de sucesso
      navigate("/admin", { replace: true });
      // Exibe mensagem de sucesso
      toast.success("Usuário logado com sucesso!");
    } catch (error) {
      // Log do erro para debugging
      console.log(error);
      // Exibe mensagem de erro para o usuário
      toast.error("Parece que algo deu errado. Tente novamente.");
    }
  }

  return (
    // Container principal com flexbox para centralização
    <div className="flex w-full h-screen items-center justify-center flex-col">
      {/* Link para a página inicial */}
      <Link to="/">
        {/* Título principal com gradiente */}
        <h1 className="mt-11 text-white mb-7 font-bold text-5xl">
          Dev
          <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
            Link
          </span>
        </h1>
      </Link>

      {/* Formulário de login */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col px-2"
      >
        {/* Input de email customizado */}
        <Input
          type="email"
          placeholder="Digite o seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Input de senha customizado */}
        <Input
          type="password"
          placeholder="Digite a sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Botão de submit */}
        <button
          type="submit"
          className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white cursor-pointer"
        >
          Acessar
        </button>
      </form>
    </div>
  );
}
