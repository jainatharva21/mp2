import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePokemon } from '../PokemonContext';
import styles from './ListView.module.css';

type SortKey = 'id' | 'name' | 'baseExperience' | 'weight';

export default function ListView() {
  const { pokemon } = usePokemon();
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [ascending, setAscending] = useState(true);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pokemon
      .filter((p) => p.name.includes(q))
      .sort((a, b) => {
        const cmp = sortKey === 'name' ? a.name.localeCompare(b.name) : a[sortKey] - b[sortKey];
        return ascending ? cmp : -cmp;
      });
  }, [pokemon, query, sortKey, ascending]);

  const ids = results.map((p) => p.id);

  return (
    <section className={styles.page}>
      <div className={styles.controls}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search Pokémon…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}>
          <option value="id">Pokédex #</option>
          <option value="name">Name</option>
          <option value="baseExperience">Base XP</option>
          <option value="weight">Weight</option>
        </select>
        <button onClick={() => setAscending((a) => !a)}>
          {ascending ? 'Ascending ↑' : 'Descending ↓'}
        </button>
      </div>

      {results.length === 0 && <p className={styles.empty}>No Pokémon match "{query}".</p>}

      <ul className={styles.list}>
        {results.map((p) => (
          <li key={p.id}>
            <Link to={`/pokemon/${p.id}`} state={{ ids }} className={styles.row}>
              <img src={p.image} alt={p.name} className={styles.thumb} />
              <span className={styles.number}>#{p.id}</span>
              <span className={styles.name}>{p.name}</span>
              <span className={styles.meta}>{p.types.join(' / ')}</span>
              <span className={styles.meta}>XP {p.baseExperience}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}