import React from 'react';
import logo from '../images/logo_soundsnap_claro.png'
import logo2 from '../images/play_bege_soundsnap.png'
import userIcon from '../images/user.png'
import { useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function Header() {
  const [userName, setUserName] = React.useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  function fetchUserProfile() {
    const token = localStorage.getItem('token');
    if (token) {

      fetch(`https://sound-snap-api-node.onrender.com/api/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
        .then(response => response.json())
        .then(data => {
          setUserName(data.data.name)
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }

  const handleSair = () => {
    localStorage.removeItem('token');
    setUserName('');
    window.location.replace('/');
  };

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
      <Link to="/" onClick={handleHomeClick} aria-label='página inicial'>
        <img src={logo} alt="" />
      </Link>
      <form action="/" method="get">
        <input type="text" name="search" id="input_pesq" placeholder="O quê você quer ouvir hoje?"></input>
        <button aria-label='pesquisar'>
          <img src={logo2} alt="" />
        </button>
      </form>
      <div className="user">
        {userName &&
          <div>
            <Link to={`/profile`}>{userName?.length > 8 ? userName.slice(0, 8) + '.' : userName}</Link>
            <button onClick={handleSair}>Sair</button>
          </div>
        }

        {!userName &&
          <Link to={"/cadastro"} onClick={handleCadastroClick}>
            <img src={userIcon} alt="User Icon" />
          </Link>
        }


      </div>
    </header>
  );
}



export default Header;