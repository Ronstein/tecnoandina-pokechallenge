import type { PokemonTypesProps } from "."
import { typeColors } from "../models"


export const PokemonTypes = ({ types }: PokemonTypesProps) => (
    <td className="p-2">
        <div className="flex flex-wrap gap-2">
            {types.map((t, idx) => {
                const typeName = t.type.name.toLowerCase()
                const color = typeColors[typeName] ?? '#999'
                return (
                    <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize select-none border"
                        style={{ backgroundColor: color, color: '#fff', borderColor: color }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {typeName}
                    </span>
                )
            })}
        </div>
    </td>
)