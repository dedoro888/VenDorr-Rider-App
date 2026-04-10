import { useState } from "react";
import { Star, Bike, CreditCard, HelpCircle, LogOut, ChevronRight, Trash2, Sun, Moon, Monitor, Search, History, Shield, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import BottomNav from "@/components/rider/BottomNav";

const deliveryHistory = [
  { id: "VD-1042", status: "Completed", earnings: 650, date: "Apr 10, 2026", vendor: "Chicken Republic", pickup: "SUB, Main Campus", dropoff: "Hall 3, Room 214", distance: "2.4 km", time: "2:34 PM", items: "2 meals" },
  { id: "VD-1041", status: "Completed", earnings: 500, date: "Apr 10, 2026", vendor: "Kilimanjaro", pickup: "Junction Road", dropoff: "Faculty Block A", distance: "1.8 km", time: "1:10 PM", items: "1 shawarma" },
  { id: "VD-1040", status: "Cancelled", earnings: 0, date: "Apr 9, 2026", vendor: "Cafeteria 2", pickup: "Central Cafe", dropoff: "Hall 5", distance: "2.0 km", time: "3:45 PM", items: "1 item" },
  { id: "VD-1039", status: "Completed", earnings: 750, date: "Apr 9, 2026", vendor: "Sweet Sensation", pickup: "Gate Area", dropoff: "Hall 5, Ground Floor", distance: "3.1 km", time: "12:22 PM", items: "3 items" },
  { id: "VD-1038", status: "Completed", earnings: 400, date: "Apr 8, 2026", vendor: "The Place", pickup: "Central Cafe", dropoff: "Hall 1, Room 102", distance: "1.2 km", time: "9:30 AM", items: "1 meal" },
];

const Profile = () => {
  const { theme, setTheme } = useTheme();
  const [showHistory, setShowHistory] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showVehicle, setShowVehicle] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<typeof deliveryHistory[0] | null>(null);
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
        <button
          onClick={() => setShowVehicle(!showVehicle)}
          className="w-full flex items-center gap-3 p-4 bg-card rounded-xl border border-border active:animate-press text-left"
        >
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
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${showVehicle ? "rotate-180" : ""}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showVehicle ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
          <div className="bg-card rounded-xl border border-border p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Vehicle Type</span>
              <span className="text-xs font-medium text-foreground">Motorcycle</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Plate Number</span>
              <span className="text-xs font-medium text-foreground">LG-234-ABC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Color</span>
              <span className="text-xs font-medium text-foreground">Black</span>
            </div>
            {canEditVehicle && (
              <button className="thumb-zone w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm active:animate-press">
                Edit Vehicle Details
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Payment details */}
      <div className="px-5 mb-3">
        <button
          onClick={() => setShowPayment(!showPayment)}
          className="w-full flex items-center gap-3 p-4 bg-card rounded-xl border border-border active:animate-press text-left"
        >
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
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${showPayment ? "rotate-180" : ""}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showPayment ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
          <div className="bg-card rounded-xl border border-border p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Bank</span>
              <span className="text-xs font-medium text-foreground">GTBank</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Account Number</span>
              <span className="text-xs font-medium text-foreground">••••••4521</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Account Name</span>
              <span className="text-xs font-medium text-foreground">Adebayo Olatunji</span>
            </div>
            {canEditPayment && (
              <button className="thumb-zone w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm active:animate-press">
                Edit Payment Details
              </button>
            )}
          </div>
        </div>
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
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${showHistory ? "rotate-180" : ""}`} />
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
              <button
                key={d.id}
                onClick={() => setSelectedDelivery(d)}
                className="w-full flex items-center justify-between p-3 bg-card rounded-xl border border-border active:animate-press text-left"
              >
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
              </button>
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

      {/* Delivery detail modal */}
      {selectedDelivery && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end justify-center p-5">
          <div className="w-full max-w-sm bg-card rounded-2xl border border-border p-6 space-y-4 animate-slide-up">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">{selectedDelivery.id}</h3>
              <button onClick={() => setSelectedDelivery(null)} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className={`inline-block px-2 py-1 rounded-lg text-xs font-semibold ${selectedDelivery.status === "Completed" ? "bg-primary/15 text-primary" : "bg-destructive/15 text-destructive"}`}>
              {selectedDelivery.status}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between"><span className="text-xs text-muted-foreground">Vendor</span><span className="text-xs font-medium text-foreground">{selectedDelivery.vendor}</span></div>
              <div className="flex justify-between"><span className="text-xs text-muted-foreground">Pickup</span><span className="text-xs font-medium text-foreground">{selectedDelivery.pickup}</span></div>
              <div className="flex justify-between"><span className="text-xs text-muted-foreground">Drop-off</span><span className="text-xs font-medium text-foreground">{selectedDelivery.dropoff}</span></div>
              <div className="flex justify-between"><span className="text-xs text-muted-foreground">Distance</span><span className="text-xs font-medium text-foreground">{selectedDelivery.distance}</span></div>
              <div className="flex justify-between"><span className="text-xs text-muted-foreground">Items</span><span className="text-xs font-medium text-foreground">{selectedDelivery.items}</span></div>
              <div className="flex justify-between"><span className="text-xs text-muted-foreground">Time</span><span className="text-xs font-medium text-foreground">{selectedDelivery.time}</span></div>
              <div className="flex justify-between"><span className="text-xs text-muted-foreground">Date</span><span className="text-xs font-medium text-foreground">{selectedDelivery.date}</span></div>
              <div className="flex justify-between"><span className="text-xs text-muted-foreground">Earnings</span><span className="text-xs font-bold text-earnings">₦{selectedDelivery.earnings}</span></div>
            </div>
            <button
              onClick={() => setSelectedDelivery(null)}
              className="thumb-zone w-full py-4 rounded-xl bg-secondary text-secondary-foreground font-bold text-base active:animate-press"
            >
              Close
            </button>
          </div>
        </div>
      )}

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
