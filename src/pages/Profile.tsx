import { useState } from "react";
import { Star, Bike, CreditCard, HelpCircle, LogOut, ChevronRight, Trash2, Sun, Moon, Monitor, Search, History, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import BottomNav from "@/components/rider/BottomNav";

const deliveryHistory = [
  { id: "VD-1042", status: "Completed", earnings: 650, date: "Apr 10, 2026" },
  { id: "VD-1041", status: "Completed", earnings: 500, date: "Apr 10, 2026" },
  { id: "VD-1040", status: "Cancelled", earnings: 0, date: "Apr 9, 2026" },
  { id: "VD-1039", status: "Completed", earnings: 750, date: "Apr 9, 2026" },
  { id: "VD-1038", status: "Completed", earnings: 400, date: "Apr 8, 2026" },
];

const Profile = () => {
  const { theme, setTheme } = useTheme();
  const [showHistory, setShowHistory] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [paymentLastEdit] = useState("Mar 10, 2026");
  const [vehicleLastEdit] = useState("Feb 15, 2026");

  const paymentNextEdit = "Apr 10, 2026";
  const vehicleNextEdit = "Mar 15, 2026";
  const canEditPayment = true;
  const canEditVehicle = true;

  const filteredHistory = deliveryHistory.filter(d =>
    d.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const themeOptions = [
    { value: "light" as const, icon: Sun, label: "Light" },
    { value: "dark" as const, icon: Moon, label: "Dark" },
    { value: "system" as const, icon: Monitor, label: "System" },
  ];

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

      {/* Theme selector */}
      <div className="px-5 mb-5">
        <p className="text-xs text-muted-foreground font-medium mb-2">Appearance</p>
        <div className="flex gap-2 bg-card rounded-xl border border-border p-1.5">
          {themeOptions.map(opt => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.value}
                onClick={() => setTheme(opt.value)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  theme === opt.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Vehicle details */}
      <div className="px-5 mb-3">
        <button className="w-full flex items-center gap-3 p-4 bg-card rounded-xl border border-border active:animate-press text-left">
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
            <Bike className="w-4 h-4 text-secondary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Vehicle Details</p>
            <p className="text-xs text-muted-foreground">Bike • Plate: LG-234 • Black</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {canEditVehicle
                ? `Editable • Last: ${vehicleLastEdit}`
                : `Next edit: ${vehicleNextEdit}`}
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Payment details */}
      <div className="px-5 mb-3">
        <button className="w-full flex items-center gap-3 p-4 bg-card rounded-xl border border-border active:animate-press text-left">
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
            <CreditCard className="w-4 h-4 text-secondary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Payment Details</p>
            <p className="text-xs text-muted-foreground">GTBank ••• 4521</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {canEditPayment
                ? `Editable • Last: ${paymentLastEdit}`
                : `Next edit: ${paymentNextEdit}`}
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Delivery History */}
      <div className="px-5 mb-3">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="w-full flex items-center gap-3 p-4 bg-card rounded-xl border border-border active:animate-press text-left"
        >
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
            <History className="w-4 h-4 text-secondary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Delivery History</p>
            <p className="text-xs text-muted-foreground">142 total deliveries</p>
          </div>
          <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${showHistory ? "rotate-90" : ""}`} />
        </button>

        {showHistory && (
          <div className="mt-2 space-y-2 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by Delivery ID..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {filteredHistory.map(d => (
              <div key={d.id} className="flex items-center justify-between p-3 bg-card rounded-xl border border-border">
                <div>
                  <p className="text-sm font-medium text-foreground">{d.id}</p>
                  <p className="text-xs text-muted-foreground">{d.date}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${d.status === "Completed" ? "text-primary" : "text-destructive"}`}>
                    {d.status === "Completed" ? `₦${d.earnings}` : "Cancelled"}
                  </p>
                  <p className={`text-[10px] ${d.status === "Completed" ? "text-primary" : "text-destructive"}`}>{d.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Support */}
      <div className="px-5 mb-3">
        <Link
          to="/support"
          className="w-full flex items-center gap-3 p-4 bg-card rounded-xl border border-border active:animate-press text-left"
        >
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
            <HelpCircle className="w-4 h-4 text-secondary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Support</p>
            <p className="text-xs text-muted-foreground">Help, FAQ & contact</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </Link>
      </div>

      {/* Logout */}
      <div className="px-5 mb-3">
        <button className="w-full flex items-center gap-3 p-4 bg-card rounded-xl border border-border active:animate-press text-left">
          <div className="w-9 h-9 rounded-full bg-destructive/15 flex items-center justify-center shrink-0">
            <LogOut className="w-4 h-4 text-destructive" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-destructive">Logout</p>
            <p className="text-xs text-muted-foreground">Sign out of your account</p>
          </div>
        </button>
      </div>

      {/* Delete account */}
      <div className="px-5 mb-5">
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="w-full flex items-center gap-3 p-4 bg-card rounded-xl border border-destructive/30 active:animate-press text-left"
        >
          <div className="w-9 h-9 rounded-full bg-destructive/15 flex items-center justify-center shrink-0">
            <Trash2 className="w-4 h-4 text-destructive" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-destructive">Delete Account</p>
            <p className="text-xs text-muted-foreground">Permanently remove your account</p>
          </div>
        </button>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end justify-center p-5">
          <div className="w-full max-w-sm bg-card rounded-2xl border border-border p-6 space-y-4 animate-slide-up">
            <div className="flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-destructive/15 flex items-center justify-center">
                <Shield className="w-7 h-7 text-destructive" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-foreground text-center">Delete Account?</h3>
            <p className="text-sm text-muted-foreground text-center">
              Your account will be deleted in 3 days. You can cancel deletion within this period.
            </p>
            <button className="thumb-zone w-full py-4 rounded-xl bg-destructive text-destructive-foreground font-bold text-base active:animate-press">
              Delete My Account
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="thumb-zone w-full py-4 rounded-xl bg-secondary text-secondary-foreground font-bold text-base active:animate-press"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Profile;
