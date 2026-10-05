import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { fetchPokemon } from './api';
import type { Pokemon } from './types';

interface State { pokemon: Pokemon[]; loading: boolean; error: string | null }

const PokemonContext = createContext<State>({ pokemon: [], loading: true, error: null });

export function PokemonProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({ pokemon: [], loading: true, error: null });

  useEffect(() => {
    fetchPokemon()
      .then((pokemon) => setState({ pokemon, loading: false, error: null }))
      .catch(() => setState({ pokemon: [], loading: false, error: 'Could not load Pokémon. Try refreshing.' }));
  }, []);

  return <PokemonContext.Provider value={state}>{children}</PokemonContext.Provider>;
}

export const usePokemon = () => useContext(PokemonContext);