import { MapPin } from "lucide-react";
import GoogleMapView from "./GoogleMapView";

interface MapPreviewProps {
  isOnline: boolean;
}

// Simulated nearby order locations
const nearbyOrders = [
  { position: { lat: 6.5264, lng: 3.3772 }, color: "urgent" as const },
  { position: { lat: 6.5224, lng: 3.3812 }, color: "urgent" as const },
  { position: { lat: 6.5254, lng: 3.3752 }, color: "urgent" as const },
];

const MapPreview = ({ isOnline }: MapPreviewProps) => {
  return (
    <div className="relative rounded-2xl border border-border overflow-hidden isolate">
      {/* Map = background layer */}
      <div className="relative z-0">
        <GoogleMapView
          className="h-48"
          zoom={14}
          markers={isOnline ? nearbyOrders : []}
        />
      </div>

      {/* UI layer above map (foreground) */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <div className={`relative transition-all duration-500 ${isOnline ? "scale-100" : "scale-90 opacity-50"}`}>
          <div className={`w-4 h-4 rounded-full ${isOnline ? "bg-primary" : "bg-muted-foreground"} transition-colors duration-300`} />
          {isOnline && <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary animate-ping opacity-30" />}
        </div>
      </div>

      {/* Status pill — sits in its own contained chip above map */}
      <div className="absolute bottom-3 left-3 z-20">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-md border ${
          isOnline
            ? "bg-primary/20 border-primary/30 text-primary"
            : "bg-card/80 border-border text-muted-foreground"
        }`}>
          {isOnline ? `${nearbyOrders.length} orders nearby` : "Go online to see orders"}
        </span>
      </div>
    </div>
  );
};

export default MapPreview;
