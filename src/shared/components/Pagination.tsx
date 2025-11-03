import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

type PaginationProps = {
    page: number
    onChangePage: (newPage: number) => void
    disablePrev?: boolean
    disableNext?: boolean
}

export const Pagination = ({
    page,
    onChangePage,
    disablePrev = false,
    disableNext = false,
}: PaginationProps) => {
    return (
        <div className="flex items-center justify-between mt-6 w-full">
            {/* Botón anterior */}
            <button
                className="flex items-center gap-2 px-4 py-2 rounded transition disabled:opacity-50 
                   bg-gray-200 hover:bg-gray-300 
                   dark:bg-gray-700 dark:hover:bg-gray-600"
                onClick={() => onChangePage(Math.max(1, page - 1))}
                disabled={disablePrev}
            >
                <FaArrowLeft className="text-gray-700 dark:text-gray-200" />
                <span className="hidden sm:inline text-gray-800 dark:text-gray-100">Anterior</span>
            </button>

            {/* Indicador de página */}
            <span className="text-center text-gray-800 dark:text-gray-100 font-medium select-none">
                Page: <span className="font-semibold">{page}</span>
            </span>

            {/* Botón siguiente */}
            <button
                className="flex items-center gap-2 px-4 py-2 rounded transition 
                   bg-gray-200 hover:bg-gray-300 
                   dark:bg-gray-700 dark:hover:bg-gray-600
                   disabled:opacity-50"
                onClick={() => onChangePage(page + 1)}
                disabled={disableNext}
            >
                <span className="hidden sm:inline text-gray-800 dark:text-gray-100">Siguiente</span>
                <FaArrowRight className="text-gray-700 dark:text-gray-200" />
            </button>
        </div>
    )
}