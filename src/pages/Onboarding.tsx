import { useState } from "react";
import { User, Bike, FileText, CreditCard, CheckCircle2, Camera, Car, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  { label: "Personal", icon: User },
  { label: "Vehicle", icon: Bike },
  { label: "Documents", icon: FileText },
  { label: "Payment", icon: CreditCard },
  { label: "Approval", icon: CheckCircle2 },
];

const vehicleTypes = [
  { key: "bike", label: "Motorcycle", icon: Bike, desc: "Fast & agile" },
  { key: "bicycle", label: "Bicycle", icon: Bike, desc: "Eco-friendly" },
  { key: "car", label: "Car", icon: Car, desc: "Larger orders" },
];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const navigate = useNavigate();

  const next = () => step < 4 && setStep(step + 1);
  const canProceed = () => {
    if (step === 0) return name.length > 1 && phone.length > 5;
    if (step === 1) return vehicle !== "";
    return true;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Progress */}
      <div className="px-5 pt-6 pb-2">
        <p className="text-xs text-muted-foreground font-medium mb-3">Step {step + 1} of 5</p>
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= step ? "bg-primary" : "bg-border"
            }`} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 py-6">
        {step === 0 && (
          <div className="animate-fade-in space-y-5">
            <h2 className="text-2xl font-bold text-foreground">Personal Details</h2>
            <p className="text-sm text-muted-foreground">Let's get to know you</p>

            <button className="w-20 h-20 rounded-full bg-secondary border-2 border-dashed border-border flex items-center justify-center mx-auto active:animate-press">
              <Camera className="w-7 h-7 text-muted-foreground" />
            </button>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="thumb-zone w-full px-4 py-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="thumb-zone w-full px-4 py-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-in space-y-5">
            <h2 className="text-2xl font-bold text-foreground">Vehicle Type</h2>
            <p className="text-sm text-muted-foreground">What will you be riding?</p>

            <div className="space-y-3">
              {vehicleTypes.map(v => {
                const Icon = v.icon;
                const selected = vehicle === v.key;
                return (
                  <button
                    key={v.key}
                    onClick={() => setVehicle(v.key)}
                    className={`thumb-zone w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all active:animate-press ${
                      selected ? "border-primary bg-primary/10" : "border-border bg-card"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      selected ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-foreground">{v.label}</p>
                      <p className="text-xs text-muted-foreground">{v.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in space-y-5">
            <h2 className="text-2xl font-bold text-foreground">Documents</h2>
            <p className="text-sm text-muted-foreground">Upload required documents</p>

            {["Valid ID (NIN/Voter's Card)", "Driver's License", "Vehicle Papers"].map((doc, i) => (
              <button key={i} className="thumb-zone w-full flex items-center justify-between p-4 bg-card rounded-xl border border-border active:animate-press">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{doc}</span>
                </div>
                <span className="text-xs text-primary font-medium">Upload</span>
              </button>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in space-y-5">
            <h2 className="text-2xl font-bold text-foreground">Payment Setup</h2>
            <p className="text-sm text-muted-foreground">Where should we send your earnings?</p>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Bank Name"
                className="thumb-zone w-full px-4 py-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Account Number"
                className="thumb-zone w-full px-4 py-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Account Name"
                className="thumb-zone w-full px-4 py-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fade-in flex flex-col items-center justify-center text-center py-12 space-y-4">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center animate-scale-in">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Application Submitted!</h2>
            <p className="text-sm text-muted-foreground max-w-xs">
              We're reviewing your application. You'll be notified once approved. This usually takes 24-48 hours.
            </p>
          </div>
        )}
      </div>

      {/* Bottom action */}
      <div className="px-5 pb-8 safe-bottom">
        {step < 4 ? (
          <button
            onClick={next}
            disabled={!canProceed()}
            className={`thumb-zone w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 active:animate-press transition-all ${
              canProceed()
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            Continue
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => navigate("/")}
            className="thumb-zone w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base active:animate-press"
          >
            Go to Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
