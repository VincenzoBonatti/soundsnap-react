import React from 'react';
import logo from '../images/logo_soundsnap_claro.png'
import logo2 from '../images/play_bege_soundsnap.png'
import userIcon from '../images/user.png'
import './App.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      <form action="" method="get">
        <input type="text" name="search" id="input_pesq" placeholder="O quê você quer ouvir hoje?"></input>
        <button>
            <img src={logo2} alt=""/>
        </button>
      </form>
      <div className="user">
        <Link to={"/cadastro"}>
          <img src={userIcon} alt="User Icon" />
        </Link>
      </div>
    </header>
  );
}



export default Header;