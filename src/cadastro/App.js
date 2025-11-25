import React from 'react';
import './App.css';

function CadastroPagina() {
  const [telefone, setTelefone] = React.useState('');

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

  return (
    <main>
      <div className="container-cadastro">
        <div className="cadastro">
          <h2>Cadastro</h2>
          <form action="" method="post">
            <div>
              <p>Nome de Usuário</p>
              <input type="text" name="Nome completo" required />
            </div>
            <div>
              <p>Email</p>
              <input type="email" name="email" required />
            </div>
            <div>
              <p>Telefone</p>
              <input
                type="tel"
                name="Número de telefone"
                inputMode="numeric"
                value={telefone}
                onChange={handleTelefoneChange}
                placeholder="(00) 00000-0000"
                required
              />
            </div>
            <div>
              <p>Senha</p>
              <input type="password" name="senha" required />
            </div>
            <button type="submit">Cadastrar</button>
          </form>
        </div>
        <div className="login">
          <h2>Login</h2>
          <form action="" method="post">
            <div>
              <p>Email</p>
              <input type="email" name="email" required />
            </div>
            <div>
              <p>Senha</p>
              <input type="password" name="senha" required />
            </div>
            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default CadastroPagina;