import { useState } from 'react'
import type { PokemonImageCellProps } from '.'

export const PokemonImage = ({ src, alt }: PokemonImageCellProps) => {
    const [loaded, setLoaded] = useState(false)

    return (
        <td className="p-2">
            <div className="w-12 h-12 relative">
                {!loaded && (
                    <div className="absolute inset-0 animate-pulse bg-gray-300 dark:bg-gray-700 rounded" />
                )}
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                    className={`w-12 h-12 object-contain transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'
                        }`}
                />
            </div>
        </td>
    )
}