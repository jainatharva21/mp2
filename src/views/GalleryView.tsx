import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePokemon } from '../PokemonContext';
import styles from './GalleryView.module.css';

export default function GalleryView() {
  const { pokemon } = usePokemon();
  const [selected, setSelected] = useState<string[]>([]);

  const allTypes = useMemo(
    () => [...new Set(pokemon.flatMap((p) => p.types))].sort(),
    [pokemon]
  );

  const shown = useMemo(
    () =>
      selected.length === 0
        ? pokemon
        : pokemon.filter((p) => p.types.some((t) => selected.includes(t))),
    [pokemon, selected]
  );

  const ids = shown.map((p) => p.id);

  const toggle = (type: string) =>
    setSelected((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  return (
    <section className={styles.page}>
      <div className={styles.filters}>
        {allTypes.map((type) => (
          <button
            key={type}
            className={selected.includes(type) ? `${styles.filter} ${styles.active}` : styles.filter}
            aria-pressed={selected.includes(type)}
            onClick={() => toggle(type)}
          >
            {type}
          </button>
        ))}
        {selected.length > 0 && (
          <button className={styles.clear} onClick={() => setSelected([])}>
            Clear
          </button>
        )}
      </div>

      <p className={styles.count}>Showing {shown.length} Pokémon</p>

      <div className={styles.grid}>
        {shown.map((p) => (
          <Link key={p.id} to={`/pokemon/${p.id}`} state={{ ids }} className={styles.card}>
            <img src={p.image} alt={p.name} loading="lazy" className={styles.image} />
            <span className={styles.name}>#{p.id} {p.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}