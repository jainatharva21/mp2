import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { usePokemon } from '../PokemonContext';
import styles from './DetailView.module.css';

export default function DetailView() {
  const { id } = useParams();
  const { pokemon } = usePokemon();
  const location = useLocation();
  const navigate = useNavigate();

  const ids: number[] =
    (location.state as { ids?: number[] } | null)?.ids ?? pokemon.map((p) => p.id);
  const current = pokemon.find((p) => p.id === Number(id));

  if (!current) {
    return (
      <section className={styles.page}>
        <p>No Pokémon found with ID "{id}".</p>
        <Link to="/">Back to search</Link>
      </section>
    );
  }

  const index = ids.indexOf(current.id);
  const go = (offset: number) => {
    const nextId = ids[(index + offset + ids.length) % ids.length];
    navigate(`/pokemon/${nextId}`, { state: { ids } });
  };

  return (
    <section className={styles.page}>
      <div className={styles.nav}>
        <button onClick={() => go(-1)} aria-label="Previous Pokémon">← Prev</button>
        <span className={styles.position}>{index + 1} of {ids.length}</span>
        <button onClick={() => go(1)} aria-label="Next Pokémon">Next →</button>
      </div>

      <div className={styles.card}>
        <img src={current.image} alt={current.name} className={styles.image} />

        <div className={styles.info}>
          <p className={styles.number}>#{String(current.id).padStart(3, '0')}</p>
          <h1 className={styles.name}>{current.name}</h1>

          <div className={styles.types}>
            {current.types.map((t) => (
              <span key={t} className={styles.type}>{t}</span>
            ))}
          </div>

          <dl className={styles.facts}>
            <dt>Height</dt><dd>{current.height / 10} m</dd>
            <dt>Weight</dt><dd>{current.weight / 10} kg</dd>
            <dt>Base XP</dt><dd>{current.baseExperience}</dd>
          </dl>

          <h2 className={styles.statsTitle}>Base stats</h2>
          <ul className={styles.stats}>
            {current.stats.map((s) => (
              <li key={s.name} className={styles.stat}>
                <span className={styles.statName}>{s.name.replace('-', ' ')}</span>
                <span className={styles.statValue}>{s.value}</span>
                <meter className={styles.meter} min={0} max={255} value={s.value} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}