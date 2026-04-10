import { Slider } from "@/components/ui/slider";

interface DeliveryRangeSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const DeliveryRangeSelector = ({ value, onChange }: DeliveryRangeSelectorProps) => {
  return (
    <div className="bg-card rounded-2xl border border-border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Delivery Range</span>
        <span className="text-sm font-bold text-primary">{value} km</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={1}
        max={10}
        step={0.5}
      />
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>1 km</span>
        <span>5 km</span>
        <span>10 km</span>
      </div>
    </div>
  );
};

export default DeliveryRangeSelector;
