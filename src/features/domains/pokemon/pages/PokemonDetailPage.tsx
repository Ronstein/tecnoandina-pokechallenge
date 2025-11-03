import { useQuery } from '@tanstack/react-query'
import { fetchPokemonDetail } from '../api/getPokemonDetails'
import { useParams, useNavigate } from 'react-router'
import { typeColors, type PokemonDetail } from '../models'
import { FaArrowLeft } from 'react-icons/fa'

export const PokemonDetailPage = () => {
  const { name } = useParams<{ name: string }>()

  const navigate = useNavigate()
  const { data: detail, isLoading: loadingDetail } = useQuery<PokemonDetail>({
    queryKey: ['pokemon', name],
    queryFn: ({ signal }) => fetchPokemonDetail(name!, signal),
    enabled: !!name,
    staleTime: 1000 * 60 * 60 * 2,
  })

  if (loadingDetail) return <div>Cargando...</div>
  if (!detail) return <div>No se encontró el Pokémon.</div>

  const image = detail.sprites.other?.['official-artwork']?.front_default || ''

  return (
    <div className="p-4 max-w-md mx-auto">

      {/* Card del Pokémon */}
      <div className="p-6 rounded-lg shadow bg-white dark:bg-gray-800">
        <h2 className="text-3xl font-bold mb-4 capitalize text-center">{detail.name}</h2>

        <img src={image} alt={detail.name} className="w-48 h-48 object-contain mx-auto mb-4" />

        <div className="space-y-2 text-left">
          <p><strong>Experience:</strong> {detail.base_experience}</p>
          <p><strong>Height:</strong> {detail.height}</p>
          <p><strong>Weight:</strong> {detail.weight}</p>

          <div>
            <strong>Types:</strong>
            <div className="flex flex-wrap gap-2 mt-1">
              {detail.types.map((t, idx) => {
                const typeName = t.type.name.toLowerCase()
                const color = typeColors[typeName] ?? '#999'

                return (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize select-none"
                    style={{
                      backgroundColor: color,
                      color: '#ffffff', // texto siempre blanco
                    }}
                  >
                    {typeName}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 items-center">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-white hover:underline transition"
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>
    </div>
  )
}

export default PokemonDetailPage