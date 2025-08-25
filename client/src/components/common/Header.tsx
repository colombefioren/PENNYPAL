import { assets } from "../../assets/images";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { ChevronDown } from "lucide-react";

function Header() {


  return (
    <header
      className="flex justify-end items-center fixed top-4 left-25 right-4 bg-white/10 backdrop-blur-2xl rounded-2xl px-6 py-3 shadow-2xl z-30 transition-all duration-300"
    >
      <div className="flex items-center gap-6">
        <ThemeToggle />
        <div className="h-8 w-px bg-white/30"></div>
        <Link to={"/profile"} className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src={assets.userPlaceholder}
              className="w-10 h-10 object-cover rounded-xl border-2 border-white/30"
              alt="Profile"
            />
            <div className="absolute bottom-0 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-green-500"></div>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">John Doe</span>
            <span className="text-xs text-white/70">Client</span>
          </div>

          <ChevronDown
            className="text-white/70 group-hover:text-white transition-colors duration-200"
            size={16}
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
