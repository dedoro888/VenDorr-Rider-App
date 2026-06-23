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
  const currentIndex = stages.findIndex((s) => s.key === currentStage);
  const progress = currentIndex / (stages.length - 1);

  return (
    <div className="relative pt-1">
      {/* Track */}
      <div className="absolute left-[18px] right-[18px] top-[19px] h-1 rounded-full bg-border overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Nodes */}
      <div className="relative flex items-start justify-between">
        {stages.map((stage, i) => {
          const Icon = stage.icon;
          const isActive = i === currentIndex;
          const isCompleted = i < currentIndex;

          return (
            <div key={stage.key} className="flex flex-col items-center gap-1.5 w-9">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary scale-110 animate-pulse-glow"
                    : isCompleted
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border"
                }`}
              >
                <Icon className="w-4 h-4 transition-transform duration-300" />
              </div>
              <span
                className={`text-[10px] font-medium text-center leading-tight transition-colors duration-300 ${
                  isActive
                    ? "text-primary"
                    : isCompleted
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryStatus;
export type { Stage };
