import { Controller } from 'react-hook-form'
import type { PokemonNicknameInputProps } from '.'

export const PokemonNicknameInput = ({ control, errors, onKeyDown }: PokemonNicknameInputProps) => (
    <td className="p-2">
        <Controller
            name="nickname"
            control={control}
            rules={{
                required: 'Nickname cannot be empty.',
                minLength: { value: 4, message: 'Must be at least 4 characters long.' },
            }}
            render={({ field }) => (
                <div>
                    <input
                        {...field}
                        onKeyDown={onKeyDown}
                        placeholder="Add nickname..."
                        className={`border rounded px-2 py-1 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 ${errors.nickname ? 'border-red-500' : 'border-gray-300'
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    />
                    {errors.nickname && (
                        <p className="text-red-500 text-xs mt-1">{errors.nickname.message}</p>
                    )}
                </div>
            )}
        />
    </td>
)