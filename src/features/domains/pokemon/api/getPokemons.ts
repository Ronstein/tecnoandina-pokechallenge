import { api } from "../../../../core/api"
import type { PokemonDetailWithSpecies, PokemonListItem } from "../models"


export async function fetchPokemonsPage(page = 0, limit = 30, signal?: AbortSignal): Promise<PokemonDetailWithSpecies[]> {
  const offset = page * limit
  const listRes = await api.get<{ results: PokemonListItem[] }>(`/pokemon?limit=${limit}&offset=${offset}`, { signal })
  const names = listRes.data.results.map(r => r.name)

  const items = await Promise.all(names.map(async name => {
    const [detailRes, speciesRes] = await Promise.all([
      api.get(`/pokemon/${name}`, { signal }),
      api.get(`/pokemon-species/${name}`, { signal }),
    ])
    const detail = detailRes.data
    const species = speciesRes.data
    return {
      detail,
      species,
    } as PokemonDetailWithSpecies
  }))
  //console.log({ items });
  return items;
}
