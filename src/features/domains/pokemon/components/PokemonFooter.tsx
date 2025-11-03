export const PokemonFooter = () => {
    return (
        <footer className="mt-8 pt-4 text-center border-t border-gray-300 dark:border-gray-600">
            <p className="text-sm text-gray-600 dark:text-gray-300">
                Data provided by <span className="font-semibold">PokéAPI</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Click on a row to change the header color • Names ending before 'm' are highlighted
            </p>
        </footer>
    )
}