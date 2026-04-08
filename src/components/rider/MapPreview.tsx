import { MapPin } from "lucide-react";

interface MapPreviewProps {
  isOnline: boolean;
}

const MapPreview = ({ isOnline }: MapPreviewProps) => {
  return (
    <div className="relative bg-card rounded-2xl border border-border overflow-hidden h-48">
      {/* Simulated map grid */}
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

      {/* Center marker */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`relative transition-all duration-500 ${isOnline ? "scale-100" : "scale-90 opacity-50"}`}>
          <div className={`w-4 h-4 rounded-full ${isOnline ? "bg-primary" : "bg-muted-foreground"} transition-colors duration-300`} />
          {isOnline && <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary animate-ping opacity-30" />}
        </div>
      </div>

      {/* Nearby order markers when online */}
      {isOnline && (
        <>
          <div className="absolute top-8 left-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <MapPin className="w-5 h-5 text-urgent" />
          </div>
          <div className="absolute top-16 right-16 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <MapPin className="w-5 h-5 text-urgent" />
          </div>
          <div className="absolute bottom-12 left-1/3 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <MapPin className="w-5 h-5 text-urgent" />
          </div>
        </>
      )}

      {/* Status overlay */}
      <div className="absolute bottom-3 left-3">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
          isOnline ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
        }`}>
          {isOnline ? "3 orders nearby" : "Go online to see orders"}
        </span>
      </div>
    </div>
  );
};

export default MapPreview;
