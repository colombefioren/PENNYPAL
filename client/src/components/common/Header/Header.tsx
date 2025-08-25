import { assets } from "../../../assets/images";
import { Link } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";
import { ChevronDown } from "lucide-react";
import { DateDropdown, NotificationBell, SearchInput } from "./components";

function Header() {
  return (
    <header className="flex justify-between items-center fixed top-6 left-25 right-4 z-30 px-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-white">
          Hi,{" "}
          <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">
            John
          </span>
        </h1>
        <p className="text-indigo-100/90 font-light">Track all your transactions with PennyPal</p>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-6">
          <DateDropdown />
          <SearchInput />
        </div>

        <div className="flex items-center gap-5">
          <ThemeToggle />
          <NotificationBell hasNotifications={true} notifNumber={3} />

          <div className="h-8 w-px bg-white/30"></div>

          <Link to={"/profile"} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src={assets.userPlaceholder}
                className="w-12 h-12 object-cover rounded-xl border-2 border-white/30 relative z-10 group-hover:border-amber-200/50 transition-all duration-300"
                alt="Profile"
              />
              <div className="absolute bottom-0 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white z-20"></div>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white group-hover:text-amber-100 transition-colors duration-300">
                John Doe
              </span>
              <span className="text-xs text-white/70 group-hover:text-amber-100/80 transition-colors duration-300">
                Premium Client
              </span>
            </div>

            <ChevronDown
              className="text-white/70 group-hover:text-white transition-colors duration-200"
              size={16}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
