import { MapPin, Navigation, Clock, Banknote } from "lucide-react";
import { useEffect, useState } from "react";

interface IncomingOrderProps {
  vendor: string;
  pickup: string;
  dropoff: string;
  distance: string;
  earning: number;
  timeLimit: number;
  onAccept: () => void;
  onDecline: () => void;
}

const IncomingOrder = ({ vendor, pickup, dropoff, distance, earning, timeLimit, onAccept, onDecline }: IncomingOrderProps) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(interval); onDecline(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLimit, onDecline]);

  const progress = (timeLeft / timeLimit) * 100;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 safe-bottom animate-slide-up">
      <div className="bg-card border border-border rounded-2xl p-5 shadow-2xl">
        {/* Timer bar */}
        <div className="w-full h-1 bg-secondary rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-urgent rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-foreground">New Order</span>
          <div className="flex items-center gap-1.5 text-urgent">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-semibold">{timeLeft}s</span>
          </div>
        </div>

        <div className="space-y-3 mb-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center mt-0.5 shrink-0">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pickup</p>
              <p className="text-sm font-semibold text-foreground">{vendor}</p>
              <p className="text-xs text-muted-foreground">{pickup}</p>
            </div>
          </div>

          <div className="ml-4 border-l-2 border-dashed border-border h-3" />

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-urgent/15 flex items-center justify-center mt-0.5 shrink-0">
              <Navigation className="w-4 h-4 text-urgent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Drop-off</p>
              <p className="text-sm font-semibold text-foreground">{dropoff}</p>
              <p className="text-xs text-muted-foreground">{distance}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-5 px-3 py-2.5 bg-earnings/10 rounded-xl">
          <Banknote className="w-5 h-5 text-earnings" />
          <span className="text-lg font-bold text-earnings">₦{earning.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground ml-1">estimated</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onDecline}
            className="thumb-zone flex-1 py-4 rounded-xl bg-secondary text-secondary-foreground font-semibold text-base active:animate-press transition-colors"
          >
            Decline
          </button>
          <button
            onClick={onAccept}
            className="thumb-zone flex-[2] py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base active:animate-press transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingOrder;
