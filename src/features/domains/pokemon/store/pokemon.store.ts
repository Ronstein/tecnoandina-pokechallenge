
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type DynamicMap = Record<string, string>

type State = {
  fields: DynamicMap
  setField: (key: string, value: string) => void
  removeField: (key: string) => void
}

export const usePokemonStore = create<State>()(
  persist(
    (set) => ({
      fields: {},
      setField: (key, value) => set((s) => ({ fields: { ...s.fields, [key]: value } })),
      removeField: (key) => set((s) => {
        const copy = { ...s.fields }
        delete copy[key]
        return { fields: copy }
      }),
    }),
    { name: 'tecnoandina-poke-dynamic-fields' }
  )
)
