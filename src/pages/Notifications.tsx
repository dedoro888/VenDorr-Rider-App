import { Bell, Package, Wallet, XCircle } from "lucide-react";
import BottomNav from "@/components/rider/BottomNav";

const notifications = [
  { id: 1, icon: Package, color: "text-primary", bg: "bg-primary/15", title: "New order available", desc: "Chicken Republic → Hall 3", time: "Just now" },
  { id: 2, icon: Wallet, color: "text-earnings", bg: "bg-earnings/15", title: "Payment received", desc: "₦650 added to your wallet", time: "5 min ago" },
  { id: 3, icon: XCircle, color: "text-destructive", bg: "bg-destructive/15", title: "Order cancelled", desc: "Customer cancelled order #1042", time: "15 min ago" },
  { id: 4, icon: Wallet, color: "text-earnings", bg: "bg-earnings/15", title: "Payment received", desc: "₦500 added to your wallet", time: "1 hr ago" },
  { id: 5, icon: Package, color: "text-primary", bg: "bg-primary/15", title: "New order available", desc: "Sweet Sensation → Gate Area", time: "2 hrs ago" },
];

const Notifications = () => {
  return (
    <div className="min-h-screen pb-24 bg-background">
      <div className="px-5 pt-6 pb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Notifications</h1>
        <div className="w-6 h-6 rounded-full bg-urgent flex items-center justify-center">
          <span className="text-[10px] font-bold text-foreground">3</span>
        </div>
      </div>

      <div className="px-5 space-y-2">
        {notifications.map((n, i) => {
          const Icon = n.icon;
          return (
            <div
              key={n.id}
              className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border animate-fade-in"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className={`w-9 h-9 rounded-full ${n.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                <Icon className={`w-4 h-4 ${n.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.desc}</p>
              </div>
              <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
            </div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
};

export default Notifications;
