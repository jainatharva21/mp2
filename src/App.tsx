import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { usePokemon } from './PokemonContext';
import ListView from './views/ListView';
import GalleryView from './views/GalleryView';
import DetailView from './views/DetailView';
import styles from './App.module.css';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

export default function App() {
  const { loading, error } = usePokemon();

  return (
    <>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>Pokédex</Link>
        <nav className={styles.nav}>
          <NavLink to="/" end className={linkClass}>Search</NavLink>
          <NavLink to="/gallery" className={linkClass}>Gallery</NavLink>
        </nav>
      </header>

      {loading && <p className={styles.status}>Loading Pokémon…</p>}
      {error && <p className={styles.status}>{error}</p>}
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