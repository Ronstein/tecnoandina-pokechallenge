import { useState, useEffect } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'

type Props = {
    placeholder?: string
    debounceMs?: number
    onSearch: (value: string) => void
    className?: string
}

export const SearchInput = ({
    placeholder = 'Search...',
    debounceMs = 800,
    onSearch,
    className = '',
}: Props) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedValue, setDebouncedValue] = useState('')

    // 🔁 debounce del valor de búsqueda
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchTerm.trim().toLowerCase())
        }, debounceMs)
        return () => clearTimeout(handler)
    }, [searchTerm, debounceMs])

    // 🚀 dispara búsqueda cuando cambia el valor debounced
    useEffect(() => {
        onSearch(debouncedValue)
    }, [debouncedValue])

    // Enter = búsqueda inmediata
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch(searchTerm.trim().toLowerCase())
        }
    }

    // Limpiar texto
    const clearSearch = () => {
        setSearchTerm('')
        onSearch('')
    }

    return (
        <div className={`relative w-64 ${className}`}>


            {/* 🧠 Input */}
            <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg pl-9 pr-8 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* 🔍 Ícono de lupa */}
            {!searchTerm && (<FaSearch
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
                size={14}
            />)
            }

            {/* ❌ Botón de limpiar (solo aparece con texto) */}
            {searchTerm && (
                <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                    aria-label="Clear search"
                >
                    <FaTimes size={12} />
                </button>
            )}
        </div>
    )
}