import { useEffect } from "react";
import { Navigation } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useRider } from "@/contexts/RiderContext";

/**
 * Persistent bottom-anchored bar that resurfaces an in-progress delivery
 * from any page. Hidden on the active delivery page itself.
 */
const ActiveDeliveryBar = () => {
  const { activeDelivery } = useRider();
  const location = useLocation();
  const visible = !!activeDelivery && location.pathname !== "/delivery";

  // Reserve space at the bottom of the viewport so fixed bar doesn't cover content.
  useEffect(() => {
    if (visible) {
      document.body.style.paddingBottom = "5.5rem";
    } else {
      document.body.style.paddingBottom = "";
    }
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [visible]);

  if (!visible || !activeDelivery) return null;

  return (
    <div className="fixed bottom-16 inset-x-0 z-40 px-3 pb-2 pointer-events-none">
      <Link
        to="/delivery"
        className="pointer-events-auto flex items-center gap-3 max-w-md mx-auto px-4 py-3 rounded-2xl glass-primary text-primary-foreground active:animate-press"
      >
        <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0">
          <Navigation className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium opacity-80">Active delivery</p>
          <p className="text-sm font-bold truncate">{activeDelivery.vendor} → {activeDelivery.dropoff}</p>
        </div>
        <span className="text-xs font-bold whitespace-nowrap">Resume →</span>
      </Link>
    </div>
  );
};

export default ActiveDeliveryBar;