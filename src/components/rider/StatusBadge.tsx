import { useRider } from "@/contexts/RiderContext";

/**
 * Floating, always-visible driver status indicator.
 * Sits above the map and other content via z-index.
 */
const StatusBadge = () => {
  const { isOnline } = useRider();

  return (
    <div className="fixed top-3 right-3 z-50 pointer-events-none">
      <div
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold ${
          isOnline ? "glass-primary text-primary-foreground" : "glass text-muted-foreground"
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            isOnline ? "bg-primary-foreground animate-pulse" : "bg-muted-foreground"
          }`}
        />
        {isOnline ? "Online" : "Offline"}
      </div>
    </div>
  );
};

export default StatusBadge;