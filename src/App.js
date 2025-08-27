import './App.css';
import { Routes, Route } from 'react-router-dom';
import AlbumPagina from './album/App';
import FeedPagina from './feed/App';
import CadastroPagina from './cadastro/App';

function App() {
  return (
    <Routes>
      <Route path="/" element={<FeedPagina />} />
      <Route path="/cadastro" element={<CadastroPagina />} />
      <Route path="/album/:id" element={<AlbumPagina />} />
    </Routes>
  );
}

export default App;
