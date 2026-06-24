import { useRef, useState } from "react";
import { Star, Bike, CreditCard, HelpCircle, LogOut, ChevronRight, Trash2, Sun, Moon, Monitor, Search, History, Shield, X, ChevronDown, Camera, Pencil, KeyRound, Fingerprint, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useProfile } from "@/contexts/ProfileContext";
import { toast } from "@/hooks/use-toast";
import BottomNav from "@/components/rider/BottomNav";
import GlassKeypad from "@/components/rider/GlassKeypad";
import { isBiometricAvailable } from "@/lib/biometric";
import { getVehicleLastEdit } from "./EditVehicle";
import { getPaymentLastEdit } from "./EditPayment";

const deliveryHistory = [
  { id: "VD-1042", status: "Completed", earnings: 650, date: "Apr 10, 2026", vendor: "Chicken Republic", pickup: "SUB, Main Campus", dropoff: "Hall 3, Room 214", distance: "2.4 km", time: "2:34 PM", items: "2 meals" },
  { id: "VD-1041", status: "Completed", earnings: 500, date: "Apr 10, 2026", vendor: "Kilimanjaro", pickup: "Junction Road", dropoff: "Faculty Block A", distance: "1.8 km", time: "1:10 PM", items: "1 shawarma" },
  { id: "VD-1040", status: "Cancelled", earnings: 0, date: "Apr 9, 2026", vendor: "Cafeteria 2", pickup: "Central Cafe", dropoff: "Hall 5", distance: "2.0 km", time: "3:45 PM", items: "1 item" },
  { id: "VD-1039", status: "Completed", earnings: 750, date: "Apr 9, 2026", vendor: "Sweet Sensation", pickup: "Gate Area", dropoff: "Hall 5, Ground Floor", distance: "3.1 km", time: "12:22 PM", items: "3 items" },
  { id: "VD-1038", status: "Completed", earnings: 400, date: "Apr 8, 2026", vendor: "The Place", pickup: "Central Cafe", dropoff: "Hall 1, Room 102", distance: "1.2 km", time: "9:30 AM", items: "1 meal" },
];

const Profile = () => {
  const { theme, setTheme } = useTheme();
  const { profile, updateProfile, setPin: savePin, setBiometricEnabled, hasPin } = useProfile();
  const [showHistory, setShowHistory] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showVehicle, setShowVehicle] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<typeof deliveryHistory[0] | null>(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editPhone, setEditPhone] = useState(profile.phone);
  const [editAvatar, setEditAvatar] = useState<string | null>(profile.avatar);
  const fileRef = useRef<HTMLInputElement>(null);

  // Transaction PIN setup
  const [showPinSetup, setShowPinSetup] = useState(false);
  const [pinStep, setPinStep] = useState<"enter" | "confirm">("enter");
  const [firstPin, setFirstPin] = useState("");
  const [pinValue, setPinValue] = useState("");
  const [pinError, setPinError] = useState(false);

  const initials = profile.name
    .split(" ")
    .map(n => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const openEdit = () => {
    setEditName(profile.name);
    setEditPhone(profile.phone);
    setEditAvatar(profile.avatar);
    setShowEditProfile(true);
  };

  const handleAvatarPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Image too large", description: "Please choose an image under 5MB.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setEditAvatar(reader.result as string);
    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    const name = editName.trim();
    const phone = editPhone.trim();
    if (!name) {
      toast({ title: "Name required", description: "Please enter your name.", variant: "destructive" });
      return;
    }
    updateProfile({ name, phone, avatar: editAvatar });
    setShowEditProfile(false);
    toast({ title: "Profile updated", description: "Your profile changes have been saved." });
  };

  const openPinSetup = () => {
    setPinStep("enter");
    setFirstPin("");
    setPinValue("");
    setPinError(false);
    setShowPinSetup(true);
  };

  const handlePinComplete = (code: string) => {
    if (pinStep === "enter") {
      setFirstPin(code);
      setPinValue("");
      setPinStep("confirm");
      return;
    }
    // confirm step
    if (code === firstPin) {
      savePin(code);
      setShowPinSetup(false);
      toast({ title: hasPin ? "PIN updated" : "PIN created", description: "Your transaction PIN is now active." });
    } else {
      setPinError(true);
      setTimeout(() => {
        setPinError(false);
        setPinValue("");
        setFirstPin("");
        setPinStep("enter");
      }, 700);
    }
  };

  const toggleBiometric = async () => {
    if (profile.biometricEnabled) {
      setBiometricEnabled(false);
      toast({ title: "Biometrics disabled" });
      return;
    }
    if (!hasPin) {
      toast({ title: "Create a PIN first", description: "Set a transaction PIN before enabling biometrics.", variant: "destructive" });
      return;
    }
    const available = await isBiometricAvailable();
    setBiometricEnabled(true);
    toast({
      title: "Biometrics enabled",
      description: available
        ? "Use Face ID / fingerprint to confirm transactions."
        : "Enabled. Falls back to PIN where biometrics aren't supported.",
    });
  };

  const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
  const formatDate = (ts: number) => new Date(ts).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

  const paymentLastTs = getPaymentLastEdit();
  const vehicleLastTs = getVehicleLastEdit();

  // First-time setup → always editable. Otherwise editable when last edit > 30 days ago.
  const canEditPayment = paymentLastTs == null || Date.now() - paymentLastTs > THIRTY_DAYS;
  const canEditVehicle = vehicleLastTs == null || Date.now() - vehicleLastTs > THIRTY_DAYS;

  const paymentLastEdit = paymentLastTs ? formatDate(paymentLastTs) : "Never";
  const vehicleLastEdit = vehicleLastTs ? formatDate(vehicleLastTs) : "Never";
  const paymentNextEdit = paymentLastTs ? formatDate(paymentLastTs + THIRTY_DAYS) : "Now";
  const vehicleNextEdit = vehicleLastTs ? formatDate(vehicleLastTs + THIRTY_DAYS) : "Now";

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
          <button onClick={openEdit} className="relative shrink-0 active:animate-press" aria-label="Edit profile picture">
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-full object-cover border border-border" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
                {initials}
              </div>
            )}
            <span className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center border-2 border-background">
              <Camera className="w-3 h-3 text-primary-foreground" />
            </span>
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">{profile.name}</h1>
            <p className="text-sm text-muted-foreground">{profile.phone}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3.5 h-3.5 text-earnings fill-earnings" />
              <span className="text-sm font-semibold text-earnings">4.8</span>
              <span className="text-xs text-muted-foreground">(142 deliveries)</span>
            </div>
          </div>
          <button
            onClick={openEdit}
            className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0 active:animate-press"
            aria-label="Edit profile"
          >
            <Pencil className="w-4 h-4 text-secondary-foreground" />
          </button>
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
            {canEditVehicle ? (
              <Link
                to="/profile/vehicle"
                className="thumb-zone w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center active:animate-press"
              >
                Edit Vehicle Details
              </Link>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground text-center">You can only update this once per month</p>
                <Link
                  to="/support/issue/account-changes"
                  className="thumb-zone w-full py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm flex items-center justify-center active:animate-press"
                >
                  Contact Support
                </Link>
              </div>
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
            {canEditPayment ? (
              <Link
                to="/profile/payment"
                className="thumb-zone w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center active:animate-press"
              >
                Edit Payment Details
              </Link>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground text-center">You can only update this once per month</p>
                <Link
                  to="/support/issue/account-changes"
                  className="thumb-zone w-full py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm flex items-center justify-center active:animate-press"
                >
                  Contact Support
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Security — Transaction PIN & Biometrics */}
      <div className="px-5 mb-3">
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <button
            onClick={openPinSetup}
            className="w-full flex items-center gap-3 p-4 active:animate-press text-left"
          >
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <KeyRound className="w-4 h-4 text-secondary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Transaction PIN</p>
              <p className="text-xs text-muted-foreground">
                {hasPin ? "PIN is set — tap to change" : "Create a 4-digit PIN for withdrawals"}
              </p>
            </div>
            {hasPin ? (
              <span className="text-[10px] font-semibold text-primary bg-primary/15 px-2 py-1 rounded-full">Active</span>
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
          </button>

          <div className="h-px bg-border mx-4" />

          <div className="w-full flex items-center gap-3 p-4 text-left">
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <Fingerprint className="w-4 h-4 text-secondary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Fingerprint & Face ID</p>
              <p className="text-xs text-muted-foreground">Confirm transactions with biometrics</p>
            </div>
            <button
              onClick={toggleBiometric}
              role="switch"
              aria-checked={profile.biometricEnabled}
              className={`relative w-12 h-7 rounded-full transition-colors duration-300 shrink-0 ${
                profile.biometricEnabled ? "bg-primary" : "bg-secondary"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-background shadow transition-transform duration-300 ${
                  profile.biometricEnabled ? "translate-x-5" : ""
                }`}
              />
            </button>
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

      {/* Edit profile modal */}
      {showEditProfile && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-end justify-center p-5">
          <div className="w-full max-w-sm bg-card rounded-2xl border border-border p-6 space-y-4 animate-slide-up">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Edit Profile</h3>
              <button onClick={() => setShowEditProfile(false)} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="flex flex-col items-center gap-2">
              <button onClick={() => fileRef.current?.click()} className="relative active:animate-press" aria-label="Change photo">
                {editAvatar ? (
                  <img src={editAvatar} alt="Preview" className="w-20 h-20 rounded-full object-cover border border-border" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary">
                    {initials}
                  </div>
                )}
                <span className="absolute -bottom-0.5 -right-0.5 w-7 h-7 rounded-full bg-primary flex items-center justify-center border-2 border-card">
                  <Camera className="w-3.5 h-3.5 text-primary-foreground" />
                </span>
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarPick} />
              {editAvatar && (
                <button onClick={() => setEditAvatar(null)} className="text-xs text-destructive font-medium">
                  Remove photo
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground font-medium">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  maxLength={60}
                  onChange={e => setEditName(e.target.value)}
                  className="mt-1 w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-medium">Phone Number</label>
                <input
                  type="tel"
                  value={editPhone}
                  maxLength={20}
                  onChange={e => setEditPhone(e.target.value)}
                  className="mt-1 w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <button
              onClick={saveProfile}
              className="thumb-zone w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base active:animate-press"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Profile;
