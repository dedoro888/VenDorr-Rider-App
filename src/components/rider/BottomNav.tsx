import { Home, Wallet, User } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const tabs = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/earnings", icon: Wallet, label: "Earnings" },
  { path: "/profile", icon: User, label: "Profile" },
];

const TAB_WIDTH = 72; // px per tab

const BottomNav = () => {
  const location = useLocation();
  const activeIndex = Math.max(
    0,
    tabs.findIndex(t => t.path === location.pathname)
  );

  return (
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 glass rounded-full safe-bottom w-auto">
      <div className="relative flex items-center justify-center p-2">
        {/* Animated sliding bubble */}
        <div
          className="absolute top-1.5 bottom-1.5 glass-primary rounded-[20px] animate-pop-in"
          style={{
            width: `${TAB_WIDTH}px`,
            transform: `translateX(${(activeIndex - 1) * TAB_WIDTH}px)`,
            transition:
              "transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease",
          }}
        />
        {tabs.map(tab => {
          const active = location.pathname === tab.path;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              style={{ width: `${TAB_WIDTH}px` }}
              className={`thumb-zone relative z-10 flex flex-col items-center justify-center gap-0.5 py-1 rounded-full transition-colors duration-300 ${
                active ? "text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-transform duration-300 ${
                  active ? "scale-110 -translate-y-0.5" : ""
                }`}
              />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
