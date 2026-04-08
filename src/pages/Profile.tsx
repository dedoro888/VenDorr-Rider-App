import { Star, Bike, CreditCard, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import BottomNav from "@/components/rider/BottomNav";

const menuItems = [
  { icon: Bike, label: "Vehicle Details", desc: "Bike • Plate: LG-234" },
  { icon: CreditCard, label: "Payment Details", desc: "GTBank ••• 4521" },
  { icon: HelpCircle, label: "Support", desc: "Help & FAQs" },
  { icon: LogOut, label: "Logout", desc: "Sign out", destructive: true },
];

const Profile = () => {
  return (
    <div className="min-h-screen pb-24 bg-background">
      {/* Profile header */}
      <div className="px-5 pt-6 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
            AO
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Adebayo Olatunji</h1>
            <p className="text-sm text-muted-foreground">+234 812 345 6789</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3.5 h-3.5 text-earnings fill-earnings" />
              <span className="text-sm font-semibold text-earnings">4.8</span>
              <span className="text-xs text-muted-foreground">(142 deliveries)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 mb-5">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card rounded-xl p-3 border border-border text-center">
            <p className="text-lg font-bold text-foreground">142</p>
            <p className="text-[10px] text-muted-foreground">Deliveries</p>
          </div>
          <div className="bg-card rounded-xl p-3 border border-border text-center">
            <p className="text-lg font-bold text-earnings">4.8</p>
            <p className="text-[10px] text-muted-foreground">Rating</p>
          </div>
          <div className="bg-card rounded-xl p-3 border border-border text-center">
            <p className="text-lg font-bold text-primary">98%</p>
            <p className="text-[10px] text-muted-foreground">Accept Rate</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-5 space-y-2">
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={i}
              className="w-full flex items-center gap-3 p-4 bg-card rounded-xl border border-border active:animate-press text-left"
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                item.destructive ? "bg-destructive/15" : "bg-secondary"
              }`}>
                <Icon className={`w-4 h-4 ${item.destructive ? "text-destructive" : "text-secondary-foreground"}`} />
              </div>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${item.destructive ? "text-destructive" : "text-foreground"}`}>{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
