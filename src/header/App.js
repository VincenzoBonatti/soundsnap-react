import React from 'react';
import logo from '../images/logo_soundsnap_claro.png'
import logo2 from '../images/play_bege_soundsnap.png'
import userIcon from '../images/user.png'
import './App.css';
import { Link } from 'react-router-dom';

function Header() {
  const handleHomeClick = (e) => {
    if (window.location.pathname === '/') {
      window.location.replace('/');
     
    }
  };

  const handleCadastroClick = (e) => {
    if (window.location.pathname === '/cadastro') {
      e.preventDefault();
      window.location.reload();
    }
  };

  return (
    <header>
      <Link to="/" onClick={handleHomeClick}>
        <img src={logo} alt="" />
      </Link>
      <form action="/" method="get">
        <input type="text" name="search" id="input_pesq" placeholder="O quê você quer ouvir hoje?"></input>
        <button>
            <img src={logo2} alt=""/>
        </button>
      </form>
      <div className="user">
        <Link to={"/cadastro"} onClick={handleCadastroClick}>
          <img src={userIcon} alt="User Icon" />
        </Link>
      </div>
    </header>
  );
}



export default Header;