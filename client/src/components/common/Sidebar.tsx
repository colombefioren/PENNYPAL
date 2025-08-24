// Sidebar.tsx
import {
  LayoutDashboard,
  CreditCard,
  DollarSign,
  User,
  LogOut,
} from "lucide-react";
import Logo from "./Logo";

const items = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Expenses", icon: CreditCard, href: "/expenses" },
  { label: "Incomes", icon: DollarSign, href: "/incomes" },
  { label: "Profile", icon: User, href: "/profile" },
  { label: "Logout", icon: LogOut, href: "#" },
];

export default function Sidebar() {
  return (
    <div className="fixed left-2 top-2 h-[97vh] z-2">
      <div className="relative h-full w-56">
        <div className="absolute left-2 top-2 z-[101]">
          <Logo className="w-12 h-12 object-cover" />
        </div>
        <div className="group/sidebar absolute left-0 top-17 z-[100] h-[calc(100%-4rem)] rounded-lg overflow-hidden bg-white/10 backdrop-blur-2xl">
          <aside
            className="
              h-full w-16 group-hover/sidebar:w-56 focus-within:w-56
              transition-[width] duration-300 overflow-hidden pb-10
            "
          >
            <nav className="mt-2 h-full px-2">
              <div className="flex h-full flex-col justify-between">
                <div className="flex flex-col gap-4">
                  {items.slice(0, 3).map(({ label, icon: Icon, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="
                        flex items-center gap-3 rounded-xl px-3 py-2
                        hover:bg-white/15 focus:outline-none focus:ring-2 ring-white/30
                        transition-colors text-white
                      "
                      title={label}
                      aria-label={label}
                    >
                      <Icon className="size-5 shrink-0" aria-hidden />
                      <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        {label}
                      </span>
                    </a>
                  ))}
                </div>

                <div className="flex flex-col gap-4 pb-3">
                  {items.slice(3).map(({ label, icon: Icon, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="
                        flex items-center gap-3 rounded-xl px-3 py-2
                        hover:bg-white/15 focus:outline-none focus:ring-2 ring-white/30
                        transition-colors text-white
                      "
                      title={label}
                      aria-label={label}
                    >
                      <Icon className="size-5 shrink-0" aria-hidden />
                      <span className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        {label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
}
