export const PokemonHeader = () => {
  return (
    <header
      className="
        flex flex-col gap-2
        rounded-xl p-4 mb-4
        bg-white dark:bg-gray-800
        shadow-sm
      "
    >
      <div className="flex items-center gap-3">
        {/* Pokeball Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 496"
          className="w-8 h-8 text-red-600 dark:text-red-400"
          fill="currentColor"
        >
          <path d="M248 0C111.1 0 0 111.1 0 248s111.1 248 248 248 248-111.1 248-248S384.9 0 248 0zm0 96c30.9 0 56 25.1 56 56s-25.1 56-56 56-56-25.1-56-56 25.1-56 56-56zm0 352c-88.4 0-162.8-63.3-180.2-147.2H160c17.4 39.7 57.1 67.2 104 67.2s86.6-27.5 104-67.2h92.2C410.8 384.7 336.4 448 248 448zm180.2-180.8H336c-17.4-39.7-57.1-67.2-104-67.2s-86.6 27.5-104 67.2H67.8C85.2 184.3 159.6 120 248 120s162.8 64.3 180.2 147.2z" />
        </svg>

        <h1 className="text-2xl font-bold tracking-wide text-red-600 dark:text-red-400">
          PokéChallenge
        </h1>
      </div>

      {/* Subtítulo */}
      <p className="text-gray-600 dark:text-gray-300 text-sm">
        A professional Pokédex application built with React, TypeScript, and React Query.
      </p>
    </header>
  );
};