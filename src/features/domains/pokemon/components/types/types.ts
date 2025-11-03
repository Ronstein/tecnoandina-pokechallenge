import type { Control, FieldErrors } from 'react-hook-form'
import type { PokemonDetailWithSpecies } from '../../models'

/**
 * Props base para una fila de la tabla de Pokémon
 */
export type PokemonRowBaseProps = {
    item: PokemonDetailWithSpecies
    onRowClick?: (color?: string) => void
    onEditName?: (oldName: string, newName: string) => void
    onDelete?: (name: string) => void
}

/**
 * Tipado del formulario interno del nickname
 */
export type PokemonNicknameForm = {
    nickname: string
}

/**
 * Props para el input del nickname
 */
export type PokemonNicknameInputProps = {
    control: Control<PokemonNicknameForm>
    errors: FieldErrors<PokemonNicknameForm>
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

/**
 * Props para las acciones (editar / eliminar)
 */
export type PokemonActionsProps = {
    onEdit: () => void
    onDelete: () => void
}

/**
 * Props para el componente que muestra los tipos del Pokémon
 */
export type PokemonTypesProps = {
    types: { type: { name: string } }[]
}

/**
 * Props para la celda de imagen
 */
export type PokemonImageCellProps = {
    src: string
    alt: string
}