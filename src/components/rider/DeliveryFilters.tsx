export type DeliveryFilter = "all" | "nearby" | "high_pay" | "short_distance" | "scheduled";

const filters: { id: DeliveryFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "nearby", label: "Nearby" },
  { id: "high_pay", label: "High Pay" },
  { id: "short_distance", label: "Short Distance" },
  { id: "scheduled", label: "Scheduled" },
];

interface Props {
  active: DeliveryFilter;
  onChange: (f: DeliveryFilter) => void;
}

const DeliveryFilters = ({ active, onChange }: Props) => {
  return (
    <div className="-mx-5 px-5 overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 min-w-max pb-1">
        {filters.map(f => {
          const isActive = active === f.id;
          return (
            <button
              key={f.id}
              onClick={() => onChange(f.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground border border-border"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryFilters;