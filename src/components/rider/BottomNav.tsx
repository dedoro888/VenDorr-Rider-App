import { Home, Wallet, User } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const tabs = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/earnings", icon: Wallet, label: "Earnings" },
  { path: "/profile", icon: User, label: "Profile" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 glass rounded-full safe-bottom w-auto">
      <div className="flex items-center justify-center gap-1 py-2 px-3">
        {tabs.map(tab => {
          const active = location.pathname === tab.path;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`thumb-zone flex flex-col items-center justify-center gap-0.5 px-4 py-1 rounded-full transition-all ${
                active
                  ? "text-primary-foreground glass-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
