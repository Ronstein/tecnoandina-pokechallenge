import { FiEdit, FiTrash2 } from 'react-icons/fi'
import type { PokemonActionsProps } from '.'

export const PokemonActions = ({ onEdit, onDelete }: PokemonActionsProps) => (
    <td className="p-2 flex space-x-2">
        <button
            onClick={(e) => {
                e.stopPropagation()
                onEdit()
            }}
            className="text-black dark:text-white hover:opacity-70 transition-opacity p-1"
        >
            <FiEdit size={18} />
        </button>

        <button
            onClick={(e) => {
                e.stopPropagation()
                onDelete()
            }}
            className="text-black dark:text-white hover:opacity-70 transition-opacity p-1"
        >
            <FiTrash2 size={18} />
        </button>
    </td>
)