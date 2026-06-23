import { useEffect, useState } from "react";
import { ArrowLeft, Phone, MessageSquare, MapPin, Navigation, Clock, Route, AlertTriangle } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import DeliveryStatus, { type Stage } from "@/components/rider/DeliveryStatus";
import GoogleMapView from "@/components/rider/GoogleMapView";
import BottomNav from "@/components/rider/BottomNav";
import { useRider } from "@/contexts/RiderContext";

const stageFlow: Stage[] = ["assigned", "at_vendor", "picked_up", "delivering", "completed"];
const stageButtons: Record<Stage, string> = {
  assigned: "Navigate to Vendor",
  at_vendor: "Arrived at Vendor",
  picked_up: "Confirm Pickup",
  delivering: "Mark as Delivered",
  completed: "Done",
};

const stageDescriptions: Record<Stage, string> = {
  assigned: "Head to Chicken Republic to pick up the order",
  at_vendor: "Confirm you've arrived at the vendor",
  picked_up: "Verify you have all items before leaving",
  delivering: "Navigate to the customer's location",
  completed: "Delivery complete!",
};

// Mock locations
const vendorLocation = { lat: 6.5264, lng: 3.3772 };
const customerLocation = { lat: 6.5224, lng: 3.3832 };
const riderLocation = { lat: 6.5244, lng: 3.3792 };

const orderItems = [
  { name: "Chicken & Chips (Large)", qty: 1 },
  { name: "Jollof Rice Special", qty: 1 },
  { name: "Pepsi 50cl", qty: 2 },
];

const ActiveDelivery = () => {
  const { activeDelivery, updateDeliveryStage, endDelivery } = useRider();
  const [stageIndex, setStageIndex] = useState(activeDelivery?.stageIndex ?? 0);

  // Sync persisted stage on mount/changes
  useEffect(() => {
    if (activeDelivery && activeDelivery.stageIndex !== stageIndex) {
      setStageIndex(activeDelivery.stageIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDelivery?.orderId]);

  if (!activeDelivery) {
    return <Navigate to="/" replace />;
  }

  const currentStage = stageFlow[stageIndex];
  const isCompleted = currentStage === "completed";
  const isPastPickup = stageIndex >= 2;

  const advance = () => {
    if (stageIndex < stageFlow.length - 1) {
      const next = stageIndex + 1;
      setStageIndex(next);
      updateDeliveryStage(next);
    }
  };

  // Map markers based on current stage
  const getMarkers = () => {
    const markers = [];
    if (!isCompleted) {
      markers.push({ position: riderLocation, color: "primary" as const, label: "You" });
    }
    if (stageIndex < 3) {
      markers.push({ position: vendorLocation, color: "earnings" as const, label: "P" });
    }
    if (stageIndex >= 2) {
      markers.push({ position: customerLocation, color: "urgent" as const, label: "D" });
    }
    return markers;
  };

  // Dynamic map center
  const mapCenter = stageIndex < 2 ? vendorLocation : customerLocation;

  return (
    <div className="min-h-screen pb-24 bg-background">
      {/* Map area */}
      <div className="relative h-[40vh] border-b border-border">
        <Link to="/" className="absolute top-5 left-4 z-10 w-10 h-10 rounded-full bg-card/90 backdrop-blur flex items-center justify-center border border-border">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>

        {/* ETA badge */}
        <div className="absolute top-5 right-4 z-10 bg-card/90 backdrop-blur border border-border rounded-full px-3 py-1.5 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-semibold text-foreground">
            {isCompleted ? "Done" : stageIndex < 2 ? "4 min" : "8 min"}
          </span>
        </div>

        <GoogleMapView
          className="h-full"
          center={mapCenter}
          zoom={15}
          markers={getMarkers()}
        />

        {/* Distance ribbon */}
        {!isCompleted && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-card/90 backdrop-blur border border-border rounded-full px-4 py-2 flex items-center gap-2">
            <Route className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">
              {stageIndex < 2 ? "1.2 km to vendor" : "2.4 km to customer"}
            </span>
          </div>
        )}
      </div>

      {/* Order details */}
      <div className="px-5 -mt-4 relative z-10">
        <div className="bg-card rounded-2xl border border-border p-5 shadow-lg space-y-5 animate-slide-up">
          {/* Progress tracker */}
          <DeliveryStatus currentStage={currentStage} />

          {/* Stage instruction */}
          <div className="bg-secondary/50 rounded-xl px-4 py-3">
            <p className="text-xs text-muted-foreground">Next step</p>
            <p className="text-sm font-semibold text-foreground">{stageDescriptions[currentStage]}</p>
          </div>

          {/* Vendor info */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Vendor</p>
                <p className="text-sm font-semibold text-foreground">{activeDelivery.vendor}</p>
                <p className="text-xs text-muted-foreground">{activeDelivery.pickup}</p>
              </div>
            </div>
            <button className="thumb-zone w-10 h-10 rounded-full bg-secondary flex items-center justify-center active:animate-press">
              <Phone className="w-4 h-4 text-secondary-foreground" />
            </button>
          </div>

          <div className="h-px bg-border" />

          {/* Customer info */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-urgent/15 flex items-center justify-center shrink-0">
                <Navigation className="w-5 h-5 text-urgent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Customer</p>
                <p className="text-sm font-semibold text-foreground">Customer</p>
                <p className="text-xs text-muted-foreground">{activeDelivery.dropoff}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center active:animate-press">
                <Phone className="w-4 h-4 text-secondary-foreground" />
              </button>
              <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center active:animate-press">
                <MessageSquare className="w-4 h-4 text-secondary-foreground" />
              </button>
            </div>
          </div>

          <div className="h-px bg-border" />

          {/* Order items */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">Order Items</p>
            <div className="space-y-1.5">
              {orderItems.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-sm text-foreground">{item.name}</span>
                  <span className="text-xs text-muted-foreground">×{item.qty}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cannot cancel warning */}
          {isPastPickup && !isCompleted && (
            <div className="flex items-center gap-2 bg-urgent/10 rounded-xl px-3 py-2">
              <AlertTriangle className="w-4 h-4 text-urgent shrink-0" />
              <span className="text-xs text-urgent font-medium">Order picked up — cannot cancel or reassign</span>
            </div>
          )}

          {/* Earnings */}
          <div className="flex items-center justify-between bg-earnings/10 rounded-xl px-4 py-3">
            <span className="text-sm text-muted-foreground">Earnings</span>
            <span className="text-lg font-bold text-earnings">₦{activeDelivery.earning}</span>
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
              onClick={endDelivery}
              className="thumb-zone w-full py-4 rounded-xl bg-earnings text-earnings-foreground font-bold text-base text-center block active:animate-press"
            >
              ₦{activeDelivery.earning} Earned — Back to Home
            </Link>
          )}

          {/* Safety row */}
          {!isCompleted && (
            <div className="flex justify-center gap-6 pt-1">
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground active:text-foreground">
                <AlertTriangle className="w-3.5 h-3.5" />
                Report Issue
              </button>
              <button className="flex items-center gap-1.5 text-xs text-destructive active:text-destructive/80">
                <Phone className="w-3.5 h-3.5" />
                Emergency
              </button>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ActiveDelivery;
