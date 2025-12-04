import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AlbumPagina from './album/App';
import FeedPagina from './feed/App';
import CadastroPagina from './cadastro/App';
import ProfilePage from './profile/App';
import Header from './header/App';

function App() {
  return (
    
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<FeedPagina />} />
        <Route path="/cadastro" element={<CadastroPagina />} />
        <Route path="/album/:id" element={<AlbumPagina />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
