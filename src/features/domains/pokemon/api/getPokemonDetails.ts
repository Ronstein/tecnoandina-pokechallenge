import { api } from "../../../../core/api"
import type { PokemonDetail } from "../models"


export async function fetchPokemonDetail(name: string, signal?: AbortSignal): Promise<PokemonDetail> {
  const res = await api.get(`/pokemon/${name}`, { signal })
  return res.data
}
