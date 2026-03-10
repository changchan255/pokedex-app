import { Link } from "react-router";

function Header (props: { title: string }) {
  return (
    <header className="bg-gradient-to-bl from-amber-600 via-orange-400 to-yellow-600 text-white">
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
      </div>
    </header>
  );
}

export default Header;
