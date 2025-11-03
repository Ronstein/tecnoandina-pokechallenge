import { useState } from 'react'
import { Link } from 'react-router'
import { useForm } from 'react-hook-form'
import { capitalize } from '../../../../core/utils/format'
import { PokemonTypes } from './PokemonTypes'
import { PokemonNicknameInput } from './PokemonNicknameInput'
import { PokemonActions } from './PokemonActions'
import { usePokemonStore } from '../store'
import { PokemonImage } from './PokemonImage'
import type { PokemonRowBaseProps, PokemonNicknameForm } from './types/types'

export const PokemonTableRow = ({ item, onRowClick, onEditName, onDelete }: PokemonRowBaseProps) => {
    const setField = usePokemonStore((s) => s.setField)
    const removeField = usePokemonStore((s) => s.removeField)
    const [isDeleting, setIsDeleting] = useState(false)

    const storedNickname = usePokemonStore.getState().fields[item.detail.name] || ''

    const {
        control,
        getValues,
        trigger,
        formState: { errors },
    } = useForm<PokemonNicknameForm>({ defaultValues: { nickname: storedNickname } })

    const handleNicknameKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const valid = await trigger('nickname')
            if (!valid) return
            const nickname = getValues('nickname').trim()
            setField(item.detail.name, nickname)
        }
    }

    const handleDeleteClick = () => {
        if (!confirm('Delete Pokémon?')) return
        setIsDeleting(true)
        setTimeout(() => {
            removeField(item.detail.name)
            onDelete?.(item.detail.name)
        }, 400)
    }

    const handleEditClick = () => {
        const newName = prompt('New name', item.detail.name)
        if (!newName) return
        const trimmed = newName.trim()
        if (trimmed.length < 4 || trimmed === item.detail.name) return
        onEditName?.(item.detail.name, trimmed)
    }

    const image = item.detail.sprites.other?.['official-artwork']?.front_default || ''
    const lastChar = item.detail.name.slice(-1)
    const isBeforeM = lastChar.toLowerCase() < 'm'

    return (
        <tr
            className={`${isBeforeM
                ? 'bg-tecnoandina text-white hover:bg-tecnoandina-dark'
                : 'even:bg-gray-100 dark:even:bg-gray-900 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                } transition-all duration-400 ${isDeleting ? 'opacity-0 max-h-0' : 'opacity-100 max-h-32'}`}
            onClick={() => onRowClick?.(item.species.color?.name)}
        >
            <PokemonImage src={image} alt={item.detail.name} />

            <td className="p-2">
                <Link to={`/pokemon/${item.detail.name}`} className="underline" viewTransition>
                    {capitalize(item.detail.name)}
                </Link>
            </td>

            <PokemonTypes types={item.detail.types} />

            <td className="p-2">{item.detail.base_experience}</td>
            <td className="p-2">{item.detail.height}</td>
            <td className="p-2">{item.detail.weight}</td>

            <PokemonNicknameInput
                control={control}
                errors={errors}
                onKeyDown={handleNicknameKeyDown}
            />

            <PokemonActions onEdit={handleEditClick} onDelete={handleDeleteClick} />
        </tr>
    )
}