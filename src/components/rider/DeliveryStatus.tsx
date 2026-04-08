import { Store, Package, Truck, CheckCircle2, MapPin } from "lucide-react";

const stages = [
  { key: "assigned", label: "Assigned", icon: MapPin },
  { key: "at_vendor", label: "At Vendor", icon: Store },
  { key: "picked_up", label: "Picked Up", icon: Package },
  { key: "delivering", label: "Delivering", icon: Truck },
  { key: "completed", label: "Completed", icon: CheckCircle2 },
] as const;

type Stage = typeof stages[number]["key"];

interface DeliveryStatusProps {
  currentStage: Stage;
}

const DeliveryStatus = ({ currentStage }: DeliveryStatusProps) => {
  const currentIndex = stages.findIndex(s => s.key === currentStage);

  return (
    <div className="flex items-center justify-between px-2">
      {stages.map((stage, i) => {
        const Icon = stage.icon;
        const isActive = i === currentIndex;
        const isCompleted = i < currentIndex;

        return (
          <div key={stage.key} className="flex flex-col items-center relative">
            {/* Connector line */}
            {i > 0 && (
              <div className="absolute right-full top-4 w-8 sm:w-12 h-0.5">
                <div className={`h-full rounded-full transition-all duration-500 ${
                  isCompleted || isActive ? "bg-primary" : "bg-border"
                }`} />
              </div>
            )}
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
                isActive
                  ? "bg-primary text-primary-foreground scale-110 glow-online"
                  : isCompleted
                  ? "bg-primary/20 text-primary"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span className={`text-[10px] mt-1.5 font-medium text-center leading-tight ${
              isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
            }`}>
              {stage.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default DeliveryStatus;
export type { Stage };
