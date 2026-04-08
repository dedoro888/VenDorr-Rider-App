import { useState, useCallback } from "react";
import OnlineToggle from "@/components/rider/OnlineToggle";
import EarningsCard from "@/components/rider/EarningsCard";
import MapPreview from "@/components/rider/MapPreview";
import IncomingOrder from "@/components/rider/IncomingOrder";
import BottomNav from "@/components/rider/BottomNav";

const Index = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [showOrder, setShowOrder] = useState(false);

  const handleToggle = () => {
    const next = !isOnline;
    setIsOnline(next);
    if (next) {
      // Simulate order after 3s
      setTimeout(() => setShowOrder(true), 3000);
    } else {
      setShowOrder(false);
    }
  };

  const handleAccept = useCallback(() => {
    setShowOrder(false);
    // Navigate to active delivery in real app
  }, []);

  const handleDecline = useCallback(() => {
    setShowOrder(false);
  }, []);

  return (
    <div className={`min-h-screen pb-24 transition-colors duration-700 ${isOnline ? "bg-background" : "bg-background"}`}>
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-medium">Good morning</p>
          <h1 className="text-xl font-bold text-foreground">Rider Dashboard</h1>
        </div>
        <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${isOnline ? "bg-primary animate-pulse" : "bg-muted-foreground"}`} />
      </div>

      {/* Toggle */}
      <div className="flex justify-center py-8">
        <OnlineToggle isOnline={isOnline} onToggle={handleToggle} />
      </div>

      {/* Stats */}
      <div className="px-5 space-y-4 animate-fade-in">
        <EarningsCard amount={isOnline ? 4500 : 0} deliveries={isOnline ? 6 : 0} />
        <MapPreview isOnline={isOnline} />
      </div>

      {/* Incoming order overlay */}
      {showOrder && (
        <IncomingOrder
          vendor="Chicken Republic"
          pickup="SUB, Main Campus"
          dropoff="Hall 3, Room 214"
          distance="2.4 km"
          earning={650}
          timeLimit={15}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}

      <BottomNav />
    </div>
  );
};

export default Index;
