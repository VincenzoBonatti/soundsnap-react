import React from 'react';
import logo from '../images/logo_soundsnap_claro.png'

function Header() {
  return (
    <header style={{ backgroundColor: 'lightblue', padding: '10px' }}>
      
      <nav>
        <a href="/" style={{ marginRight: '10px' }}>Início</a>
        <a href="/sobre">Sobre</a>
      </nav>
    </header>
  );
}

export default Header;