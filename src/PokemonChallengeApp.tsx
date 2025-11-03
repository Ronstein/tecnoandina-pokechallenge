import { Link, Outlet } from "react-router";
import { FaMoon, FaSun } from "react-icons/fa";
import { useThemeStore } from "./core/store";

function PokemonChallengeApp() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <header className="bg-white dark:bg-gray-800 shadow p-4 transition-colors duration-300">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="font-bold text-xl">
            TecnoAndina PokeChallenge
          </Link>

          <nav className="flex items-center space-x-4">
            <Link to="/" className="hover:underline">
              Pokédex
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              aria-label="Cambiar tema"
            >
              {theme === "dark" ? (
                <FaSun className="text-yellow-400" size={20} />
              ) : (
                <FaMoon className="text-gray-700" size={20} />
              )}
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default PokemonChallengeApp;