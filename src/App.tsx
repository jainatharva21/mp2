import { NavLink, Route, Routes } from 'react-router-dom';
import { usePokemon } from './PokemonContext';
import ListView from './views/ListView';
import GalleryView from './views/GalleryView';
const DetailView = () => <p>Detail view</p>;

export default function App() {
  const { loading, error } = usePokemon();

  return (
    <>
      <nav>
        <NavLink to="/">Search</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
      </nav>
      {loading && <p>Loading…</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/gallery" element={<GalleryView />} />
          <Route path="/pokemon/:id" element={<DetailView />} />
        </Routes>
      )}
    </>
  );
}