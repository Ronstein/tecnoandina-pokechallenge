import { api } from "../../../../core/api"
import type { PokemonSpecies } from "../models"

export async function fetchPokemonSpecies(name: string, signal?: AbortSignal): Promise<PokemonSpecies> {
  const res = await api.get(`/pokemon-species/${name}`, { signal })
  return res.data
}
