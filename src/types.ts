export interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
    height: number;
    weight: number;
    baseExperience: number;
    stats: { name: string; value: number }[];
}