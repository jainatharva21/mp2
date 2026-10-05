import axios from 'axios';
import type { Pokemon } from './types';

interface RawPokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    sprites: { front_default: string; other: { 'official-artwork': { front_default: string | null } } };
    types: { type: { name: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
}

const CACHE_KEY = 'pokemon-151';
const api = axios.create({baseURL: 'https://pokeapi.co/api/v2/'});

export async function fetchPokemon(): Promise<Pokemon[]> {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
        return JSON.parse(cached);
    }

    const {data} = await api.get<{ results: { url: string }[] }>('/pokemon?limit=151');
    const responses = await Promise.all(data.results.map((p) => axios.get<RawPokemon>(p.url)));

    const pokemon = responses.map(({ data: d }) => ({
        id: d.id,
        name: d.name,
        image: d.sprites.other['official-artwork'].front_default ?? d.sprites.front_default,
        types: d.types.map((t) => t.type.name),
        height: d.height,
        weight: d.weight,
        baseExperience: d.base_experience,
        stats: d.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
    }));
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(pokemon));
    return pokemon;
}
