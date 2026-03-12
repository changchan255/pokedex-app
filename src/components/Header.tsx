import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Header (props: { title: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-gradient-to-bl from-amber-600 via-orange-400 to-yellow-600 text-white dark:bg-gradient-to-bl dark:from-gray-700 dark:via-gray-900 dark:to-black">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">        
        <Link to="/">
          <h1 className="text-xl md:text-2xl font-bold">{props.title}</h1>
        </Link>

        <div className="flex gap-4 md:gap-6 text-sm md:text-base">
          <Link to="/about" className="hover:text-gray-300 transition">
            About
          </Link>
          <Link to="/my-team" className="hover:text-gray-300 transition">
            My team
          </Link>
        </div>

        <button
          onClick={toggleTheme}
          className="ml-4 bg-amber-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-amber-600 transition dark:bg-gray-600 dark:hover:bg-gray-500"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </header>
  );
}

export default Header;
