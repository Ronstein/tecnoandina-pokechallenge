import { useCallback, useEffect, useState } from 'react'
import { fetchPokemonsPage } from '../api/getPokemons'
import type { PokemonDetailWithSpecies } from '../models/Pokemon'
import { PokemonTable } from '../components/PokemonTable'
import { useQuery } from '@tanstack/react-query'
import { PokemonHeader } from '../components/PokemonHeader'
import { PageTransition, Loader, Pagination } from '../../../../shared/components'
import { useSearchParams } from 'react-router'
import { PokemonFooter } from '../components'

const PAGE_SIZE = 30

export const PokemonListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialPage = Number(searchParams.get('page') ?? 1) // página inicial = 1
  const [page, setPage] = useState(initialPage)
  const [items, setItems] = useState<PokemonDetailWithSpecies[]>([])
  const [headerColor, setHeaderColor] = useState<string | undefined>(undefined)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const { data, isLoading, isError } = useQuery<PokemonDetailWithSpecies[]>({
    queryKey: ['pokemons', page],
    queryFn: async ({ signal }) => {
      const pokemons = await fetchPokemonsPage(page - 1, PAGE_SIZE, signal) // offset = page-1
      return pokemons.sort((a, b) => a.detail.id - b.detail.id)
    },
    staleTime: 1000 * 60 * 60 * 2,
  })

  useEffect(() => {
    if (data) setItems(data)
  }, [data])

  // Sincroniza la URL con el estado de la página
  useEffect(() => {
    setSearchParams({ page: page.toString() })
  }, [page, setSearchParams])

  const handleEditName = useCallback((oldName: string, newName: string) => {
    setItems(prev =>
      prev.map(p => p.detail.name === oldName ? { ...p, detail: { ...p.detail, name: newName } } : p)
    )
  }, [])

  const handleDelete = useCallback((name: string) => {
    setItems(prev => prev.filter(p => p.detail.name !== name))
  }, [])

  const handleRowClick = useCallback((color?: string) => {
    setHeaderColor(color)
  }, [])

  const changePage = (newPage: number) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setPage(newPage)
      setIsTransitioning(false)
    }, 200)
  }

  return (
    <div className="p-4">
      <PokemonHeader />

      {isError && <div className="text-red-600 dark:text-red-400">Error cargando pokémon.</div>}

      <PageTransition>
        {isLoading || isTransitioning ? (
          <Loader />
        ) : (
          <PokemonTable
            items={items}
            headerColor={headerColor}
            onRowClick={handleRowClick}
            onEditName={handleEditName}
            onDelete={handleDelete}
          />
        )}
      </PageTransition>

      <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
        <Pagination
          page={page}
          onChangePage={changePage}
          disablePrev={page === 1}
        />
      </div>

      <PokemonFooter />
    </div>
  )
}

export default PokemonListPage