import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface EarningsCardProps {
  amount: number;
  deliveries: number;
}

const EarningsCard = ({ amount, deliveries }: EarningsCardProps) => {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (amount === 0) { setDisplayed(0); return; }
    const step = Math.ceil(amount / 30);
    const interval = setInterval(() => {
      setDisplayed(prev => {
        if (prev + step >= amount) { clearInterval(interval); return amount; }
        return prev + step;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [amount]);

  return (
    <div className="bg-card rounded-2xl p-5 border border-border">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground font-medium">Today's Earnings</span>
        <TrendingUp className="w-4 h-4 text-earnings" />
      </div>
      <div className="flex items-end gap-4">
        <span className="text-3xl font-extrabold text-earnings animate-count-up">
          ₦{displayed.toLocaleString()}
        </span>
        <span className="text-sm text-muted-foreground mb-1">
          {deliveries} {deliveries === 1 ? "delivery" : "deliveries"}
        </span>
      </div>
    </div>
  );
};

export default EarningsCard;
