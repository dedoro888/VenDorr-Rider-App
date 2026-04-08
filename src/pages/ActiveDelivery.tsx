import { useState } from "react";
import { ArrowLeft, Phone, MessageSquare, MapPin, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import DeliveryStatus, { type Stage } from "@/components/rider/DeliveryStatus";
import BottomNav from "@/components/rider/BottomNav";

const stageFlow: Stage[] = ["assigned", "at_vendor", "picked_up", "delivering", "completed"];
const stageButtons: Record<Stage, string> = {
  assigned: "Arrived at Vendor",
  at_vendor: "Picked Up Order",
  picked_up: "On the Way",
  delivering: "Delivered",
  completed: "Done",
};

const ActiveDelivery = () => {
  const [stageIndex, setStageIndex] = useState(0);
  const currentStage = stageFlow[stageIndex];
  const isCompleted = currentStage === "completed";

  const advance = () => {
    if (stageIndex < stageFlow.length - 1) setStageIndex(prev => prev + 1);
  };

  return (
    <div className="min-h-screen pb-24 bg-background">
      {/* Map area */}
      <div className="relative h-[45vh] bg-card border-b border-border">
        <Link to="/" className="absolute top-5 left-4 z-10 w-10 h-10 rounded-full bg-card/90 backdrop-blur flex items-center justify-center border border-border">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>

        {/* Simulated map */}
        <div className="absolute inset-0 opacity-15">
          <svg width="100%" height="100%" className="text-muted-foreground">
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 20} x2="100%" y2={i * 20} stroke="currentColor" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 30 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="100%" stroke="currentColor" strokeWidth="0.5" />
            ))}
          </svg>
        </div>

        {/* Route markers */}
        <div className="absolute top-1/3 left-1/4 flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <span className="text-[9px] text-primary font-medium mt-1">Pickup</span>
        </div>
        <div className="absolute bottom-1/3 right-1/4 flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-urgent/20 flex items-center justify-center">
            <Navigation className="w-4 h-4 text-urgent" />
          </div>
          <span className="text-[9px] text-urgent font-medium mt-1">Drop-off</span>
        </div>

        {/* Dotted route */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line x1="30%" y1="38%" x2="72%" y2="62%" stroke="hsl(145,65%,42%)" strokeWidth="2" strokeDasharray="6 4" opacity="0.5" />
        </svg>
      </div>

      {/* Order details */}
      <div className="px-5 -mt-4 relative z-10">
        <div className="bg-card rounded-2xl border border-border p-5 shadow-lg">
          {/* Progress tracker */}
          <div className="mb-5">
            <DeliveryStatus currentStage={currentStage} />
          </div>

          {/* Details */}
          <div className="space-y-3 mb-5">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground">Vendor</p>
                <p className="text-sm font-semibold text-foreground">Chicken Republic</p>
              </div>
              <div className="flex gap-2">
                <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center active:animate-press">
                  <Phone className="w-4 h-4 text-secondary-foreground" />
                </button>
                <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center active:animate-press">
                  <MessageSquare className="w-4 h-4 text-secondary-foreground" />
                </button>
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground">Customer</p>
                <p className="text-sm font-semibold text-foreground">Adewale J.</p>
              </div>
              <div className="flex gap-2">
                <button className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center active:animate-press">
                  <Phone className="w-4 h-4 text-secondary-foreground" />
                </button>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-muted-foreground">Hall 3, Room 214</span>
            </div>
          </div>

          {/* Action button */}
          {!isCompleted ? (
            <button
              onClick={advance}
              className="thumb-zone w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base active:animate-press transition-all"
            >
              {stageButtons[currentStage]}
            </button>
          ) : (
            <Link
              to="/"
              className="thumb-zone w-full py-4 rounded-xl bg-earnings text-earnings-foreground font-bold text-base text-center block active:animate-press"
            >
              ₦650 Earned — Back to Home
            </Link>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ActiveDelivery;
