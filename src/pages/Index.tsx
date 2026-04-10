import { useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Bell, MapPin, Navigation, Sliders } from "lucide-react";
import OnlineToggle from "@/components/rider/OnlineToggle";
import MapPreview from "@/components/rider/MapPreview";
import IncomingOrder from "@/components/rider/IncomingOrder";
import DeliveryRangeSelector from "@/components/rider/DeliveryRangeSelector";
import BottomNav from "@/components/rider/BottomNav";

const nearbyDeliveries = [
  { id: 1, vendor: "Chicken Republic", pickup: "SUB, Main Campus", dropoff: "Hall 3", distance: "2.4 km", earning: 650 },
  { id: 2, vendor: "Kilimanjaro", pickup: "Junction Road", dropoff: "Faculty Block A", distance: "1.8 km", earning: 500 },
  { id: 3, vendor: "Sweet Sensation", pickup: "Gate Area", dropoff: "Hall 5", distance: "3.1 km", earning: 750 },
  { id: 4, vendor: "The Place", pickup: "Central Cafe", dropoff: "Hall 1", distance: "1.2 km", earning: 400 },
];

const Index = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [showRange, setShowRange] = useState(false);
  const [deliveryRange, setDeliveryRange] = useState(5);
  const [alertCount] = useState(3);
  const navigate = useNavigate();

  const handleToggle = () => {
    const next = !isOnline;
    setIsOnline(next);
    if (next) {
      setTimeout(() => setShowOrder(true), 3000);
    } else {
      setShowOrder(false);
    }
  };

  const handleAccept = useCallback(() => {
    setShowOrder(false);
    navigate("/delivery");
  }, [navigate]);

  const handleDecline = useCallback(() => {
    setShowOrder(false);
  }, []);

  const filteredDeliveries = nearbyDeliveries.filter(d => parseFloat(d.distance) <= deliveryRange);

  return (
    <div className="min-h-screen pb-24 bg-background">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-medium">Hello</p>
          <h1 className="text-xl font-bold text-foreground">Adebayo 👋</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowRange(!showRange)}
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center active:animate-press"
          >
            <Sliders className="w-4.5 h-4.5 text-muted-foreground" />
          </button>
          <Link
            to="/notifications"
            className="relative w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center active:animate-press"
          >
            <Bell className="w-4.5 h-4.5 text-muted-foreground" />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-urgent flex items-center justify-center">
                <span className="text-[10px] font-bold text-foreground">{alertCount}</span>
              </span>
            )}
          </Link>
          <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${isOnline ? "bg-primary animate-pulse" : "bg-muted-foreground"}`} />
        </div>
      </div>

      {/* Range selector */}
      {showRange && (
        <div className="px-5 pb-4 animate-fade-in">
          <DeliveryRangeSelector value={deliveryRange} onChange={setDeliveryRange} />
        </div>
      )}

      {/* Toggle */}
      <div className="flex justify-center py-6">
        <OnlineToggle isOnline={isOnline} onToggle={handleToggle} />
      </div>

      {/* Map */}
      <div className="px-5 mb-4 animate-fade-in">
        <MapPreview isOnline={isOnline} />
      </div>

      {/* Available deliveries */}
      {isOnline && (
        <div className="px-5 animate-fade-in">
          <h2 className="text-sm font-semibold text-foreground mb-3">
            Available Deliveries ({filteredDeliveries.length})
          </h2>
          <div className="space-y-2">
            {filteredDeliveries.map((d) => (
              <button
                key={d.id}
                className="w-full flex items-center gap-3 p-4 bg-card rounded-xl border border-border active:animate-press text-left"
              >
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{d.vendor}</p>
                  <p className="text-xs text-muted-foreground truncate">{d.pickup} → {d.dropoff}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-earnings">₦{d.earning}</p>
                  <p className="text-xs text-muted-foreground">{d.distance}</p>
                </div>
              </button>
            ))}
          </div>
          {filteredDeliveries.length === 0 && (
            <div className="text-center py-8">
              <Navigation className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No deliveries in your range</p>
              <p className="text-xs text-muted-foreground">Try increasing your delivery radius</p>
            </div>
          )}
        </div>
      )}

      {!isOnline && (
        <div className="px-5 mt-4 text-center">
          <p className="text-sm text-muted-foreground">Go online to see available deliveries</p>
        </div>
      )}

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
