// Sidebar.tsx
import {
  Home,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import Logo from "./Logo";

const items = [
  { label: "Dashboard", icon: Home, href: "/" },
  { label: "Expenses", icon: CreditCard, href: "/expenses" },
  { label: "Incomes", icon: BarChart3, href: "/incomes" },
  { label: "Profile", icon: User, href: "/profile" },
  { label: "Logout", icon: LogOut, href: "#" },
];

export default function Sidebar() {
  return (
    <div className="group/sidebar fixed left-2 top-2 h-[98vh] rounded-lg overflow-hidden flex items-center justify-center bg-gray-300/20 backdrop-blur-2xl">
      <aside
        className="
          h-full w-16 group-hover/sidebar:w-56 focus-within:w-56
          transition-[width] duration-300 overflow-hidden
          backdrop-blur
          pb-20
         
        "
      >
        <div className="flex items-center gap-3 px-3 py-4">
          <Logo className="max-h-10 max-w-10" />
          <span
            className="
              label opacity-0 group-hover/sidebar:opacity-100
              transition-opacity duration-200
              whitespace-nowrap text-sm font-semibold
              text-white
            "
          >
            Pennypal
          </span>
        </div>

        <nav className="mt-2 space-y-1 px-2 flex flex-col justify-between h-full">
          {/* Top nav */}
          <div className="flex flex-col">
            {items.slice(0, 3).map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                className="
                flex items-center gap-3 rounded-xl px-3 py-2
                hover:bg-zinc-100/20 
                focus:outline-none focus:ring-2 ring-zinc-300 
                transition-colors
              "
                title={label}
                aria-label={label}
              >
                <Icon className="size-5 shrink-0 text-white" aria-hidden />
                <span
                  className="
                  label opacity-0 group-hover/sidebar:opacity-100
                  transition-opacity duration-200
                  whitespace-nowrap
                  text-white
                "
                >
                  {label}
                </span>
              </a>
            ))}
          </div>
          <div className="flex flex-col">
            {items.slice(3).map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                className="
                flex items-center gap-3 rounded-xl px-3 py-2
                hover:bg-zinc-100/20 
                focus:outline-none focus:ring-2 ring-zinc-300 
                transition-colors
              "
                title={label}
                aria-label={label}
              >
                <Icon className="size-5 shrink-0 text-white" aria-hidden />
                <span
                  className="
                  label opacity-0 group-hover/sidebar:opacity-100
                  transition-opacity duration-200
                  whitespace-nowrap
                  text-white
                "
                >
                  {label}
                </span>
              </a>
            ))}
          </div>
        </nav>
      </aside>
    </div>
  );
}
