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
    <div className="rounded-2xl border border-border overflow-hidden">
      <GoogleMapView
        className="h-48"
        zoom={14}
        markers={isOnline ? nearbyOrders : []}
      >
        {/* Center rider dot */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`relative transition-all duration-500 ${isOnline ? "scale-100" : "scale-90 opacity-50"}`}>
            <div className={`w-4 h-4 rounded-full ${isOnline ? "bg-primary" : "bg-muted-foreground"} transition-colors duration-300`} />
            {isOnline && <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary animate-ping opacity-30" />}
          </div>
        </div>

        {/* Status overlay */}
        <div className="absolute bottom-3 left-3">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            isOnline ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
          }`}>
            {isOnline ? `${nearbyOrders.length} orders nearby` : "Go online to see orders"}
          </span>
        </div>
      </GoogleMapView>
    </div>
  );
};

export default MapPreview;
