import { useMemo, useState } from 'react'
import type { PokemonDetailWithSpecies } from '../models/Pokemon'
import { PokemonTableRow } from './PokemonTableRow'
import { SearchInput } from '../../../../shared/components'

type Props = {
  items: PokemonDetailWithSpecies[]
  headerColor?: string
  onRowClick?: (color?: string) => void
  onEditName?: (oldName: string, newName: string) => void
  onDelete?: (name: string) => void
}

export const PokemonTable = ({
  items,
  headerColor,
  onRowClick,
  onEditName,
  onDelete,
}: Props) => {
  const [ascending, setAscending] = useState(true)
  const [sortByName, setSortByName] = useState(false)
  const [search, setSearch] = useState('')

  const filteredItems = useMemo(() => {
    if (!search) return items
    return items.filter(({ detail }) => {
      const nameMatch = detail.name.toLowerCase().includes(search)
      const typeMatch = detail.types.some(t => t.type.name.toLowerCase().includes(search))
      return nameMatch || typeMatch
    })
  }, [items, search])

  const sortedItems = useMemo(() => {
    if (!sortByName) return [...filteredItems].sort((a, b) => a.detail.id - b.detail.id)
    return [...filteredItems].sort((a, b) => {
      const nameA = a.detail.name.toLowerCase()
      const nameB = b.detail.name.toLowerCase()
      if (nameA < nameB) return ascending ? -1 : 1
      if (nameA > nameB) return ascending ? 1 : -1
      return 0
    })
  }, [filteredItems, sortByName, ascending])

  return (
    <div className="overflow-x-auto rounded shadow p-2">
      <div className="flex justify-end mb-3">
        <SearchInput
          placeholder="Search by name or type..."
          onSearch={setSearch}
        />
      </div>

      <table className="min-w-full divide-y divide-gray-400 dark:divide-gray-700">
        <thead
          style={{ backgroundColor: headerColor ?? undefined }}
          className={`text-left ${!headerColor ? 'bg-red-600 dark:bg-red-500 text-white dark:text-white' : 'text-gray-300'}`}
        >
          <tr>
            <th className="p-2 text-left">Image</th>
            <th
              className="p-2 cursor-pointer select-none"
              onClick={() => { setSortByName(true); setAscending(!ascending) }}
            >
              Name {sortByName ? (ascending ? '▲' : '▼') : ''}
            </th>
            <th className="p-2">Type(s)</th>
            <th className="p-2">Experience</th>
            <th className="p-2">Height</th>
            <th className="p-2">Weight</th>
            <th className="p-2">Nickname</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.map(item => (
            <PokemonTableRow
              key={item.detail.id}
              item={item}
              onRowClick={onRowClick}
              onEditName={onEditName}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}