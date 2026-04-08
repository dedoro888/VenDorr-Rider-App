import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY, darkMapStyles, DEFAULT_CENTER } from "@/config/maps";
import { useCallback, useState } from "react";

interface MapMarker {
  position: { lat: number; lng: number };
  label?: string;
  icon?: string;
  color?: "primary" | "urgent" | "earnings";
}

interface GoogleMapViewProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
  showRoute?: boolean;
  children?: React.ReactNode;
}

const markerColors = {
  primary: "#22c55e",
  urgent: "#f97316",
  earnings: "#eab308",
};

const FallbackMap = ({ className, children }: { className?: string; children?: React.ReactNode }) => (
  <div className={`relative bg-card overflow-hidden ${className || ""}`}>
    {/* Grid fallback */}
    <div className="absolute inset-0 opacity-20">
      <svg width="100%" height="100%" className="text-muted-foreground">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 20} x2="100%" y2={i * 20} stroke="currentColor" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 25} y1="0" x2={i * 25} y2="100%" stroke="currentColor" strokeWidth="0.5" />
        ))}
      </svg>
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-xs text-muted-foreground bg-card/80 px-3 py-1.5 rounded-full">
        Add Google Maps API key to enable map
      </span>
    </div>
    {children}
  </div>
);

const GoogleMapView = ({ center, zoom = 15, markers = [], className, children }: GoogleMapViewProps) => {
  const [, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    id: "rider-map",
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (!GOOGLE_MAPS_API_KEY || loadError) {
    return <FallbackMap className={className}>{children}</FallbackMap>;
  }

  if (!isLoaded) {
    return (
      <div className={`relative bg-card overflow-hidden flex items-center justify-center ${className || ""}`}>
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className || ""}`}>
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={center || DEFAULT_CENTER}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          styles: darkMapStyles,
          disableDefaultUI: true,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          gestureHandling: "greedy",
        }}
      >
        {markers.map((marker, i) => (
          <Marker
            key={i}
            position={marker.position}
            label={marker.label ? { text: marker.label, color: "#fff", fontSize: "10px", fontWeight: "bold" } : undefined}
            icon={marker.icon || {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: markerColors[marker.color || "primary"],
              fillOpacity: 1,
              strokeColor: "#fff",
              strokeWeight: 2,
            }}
          />
        ))}
      </GoogleMap>
      {children}
    </div>
  );
};

export default GoogleMapView;
