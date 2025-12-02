import React from 'react';
import './App.css';
import { useState } from "react";

function CadastroPagina() {
  const [telefone, setTelefone] = React.useState('');
  const [loading, setLoading] = useState(false);

  const formatTelefone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (!digits) return '';
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handleTelefoneChange = (e) => {
    const formatted = formatTelefone(e.target.value);
    setTelefone(formatted);
  };

  function handleLogin(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    console.log(loading)

    const formData = new FormData(document.getElementById('login'));
    const form = Object.fromEntries(formData.entries());

    fetch("https://sound-snap-api-node.onrender.com/api/auth/login", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.success === false) {
          alert(data.message);
          setLoading(false);
          return;
        } else if (data.success === true) {
          alert("Login realizado com sucesso!");
          console.log("Success:", data);
          console.log("Login realizado com sucesso!");
          localStorage.setItem('token', data.data.accessToken);
          window.location.replace('/');
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        console.log("Erro ao realizar login. Tente novamente.");
        setLoading(false);
      });
    
  };

  function handleCadastro(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    

    const formData = new FormData(document.getElementById('cadastro'));
    const form = Object.fromEntries(formData.entries());

    fetch("https://sound-snap-api-node.onrender.com/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },

    })
      .then(response => response.json())
      .then(data => {
        if (data.success === false) {
          alert(data.message);
          setLoading(false);
          return;
        } else if (data.success === true) {
          alert("Cadastro realizado com sucesso!");
          console.log("Success:", data);
          console.log("Cadastro realizado com sucesso!");
          localStorage.setItem('token', data.data.accessToken);
          window.location.replace('/');
          setLoading(false);
        }

      })
      .catch((error) => {
        console.error("Error:", error);
        console.log("Erro ao realizar cadastro. Tente novamente.");
        setLoading(false);
      });
  };



  return (
    <main>
      <div className="container-cadastro">
        <div className="cadastro">
          <h2>Cadastro</h2>
          <form id='cadastro' onSubmit={handleCadastro}>
            <div>
              <p>Nome de Usuário</p>
              <input type="text" name="name" required />
            </div>
            <div>
              <p>Email</p>
              <input type="email" name="email" required />
            </div>
            <div>
              <p>Telefone</p>
              <input
                type="tel"
                name="phone"
                inputMode="numeric"
                value={telefone}
                onChange={handleTelefoneChange}
                placeholder="(00) 00000-0000"
                required
              />
            </div>
            <div>
              <p>Senha</p>
              <input type="password" name="password" required />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Carregando...' : 'Cadastrar'}
            </button>
          </form>
        </div>
        <div className="login">
          <h2>Login</h2>
          <form id='login' onSubmit={handleLogin}>
            <div>
              <p>Email</p>
              <input type="email" name="email" required />
            </div>
            <div>
              <p>Senha</p>
              <input type="password" name="password" required />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Carregando...' : 'Entrar'}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}

export default CadastroPagina;