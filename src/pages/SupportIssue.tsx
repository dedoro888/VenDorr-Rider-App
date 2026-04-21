import { useMemo, useState } from "react";
import { ArrowLeft, Upload, X } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type Category = "payment" | "delivery" | "account" | "account-changes";

const categoryConfig: Record<Category, { title: string; subtypes: string[]; descPlaceholder: string }> = {
  payment: {
    title: "Payment Issue",
    subtypes: ["Missing earnings", "Failed withdrawal", "Wrong amount", "Bank not received", "Other"],
    descPlaceholder: "Describe the payment issue (amount, date, transaction ref…)",
  },
  delivery: {
    title: "Delivery Issue",
    subtypes: ["Wrong address", "Customer unreachable", "Damaged item", "Missing items", "Route problem", "Other"],
    descPlaceholder: "What happened during the delivery?",
  },
  account: {
    title: "Account Issue",
    subtypes: ["Profile not updating", "Verification stuck", "Account suspended", "Login problem", "Other"],
    descPlaceholder: "Describe your account issue…",
  },
  "account-changes": {
    title: "Request Account Changes",
    subtypes: ["Vehicle change", "Payout / bank change", "Phone number", "Name correction", "Other"],
    descPlaceholder: "Reason for the requested change…",
  },
};

const SupportIssue = () => {
  const { category } = useParams<{ category: Category }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const cfg = useMemo(() => {
    if (category && category in categoryConfig) return categoryConfig[category as Category];
    return categoryConfig.account;
  }, [category]);

  const [subtype, setSubtype] = useState(cfg.subtypes[0]);
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const isAccountChanges = category === "account-changes";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      toast({ title: "Description required", description: "Please add a few details.", variant: "destructive" });
      return;
    }
    toast({
      title: "Request submitted",
      description: "Support will respond shortly.",
    });
    navigate("/support");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-5 pt-6 pb-4 flex items-center gap-3">
        <Link to="/support" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>
        <h1 className="text-xl font-bold text-foreground">{cfg.title}</h1>
      </div>

      <form onSubmit={handleSubmit} className="px-5 space-y-4">
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
            {isAccountChanges ? "Change type" : "Issue type"}
          </label>
          <select
            value={subtype}
            onChange={e => setSubtype(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {cfg.subtypes.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
            {isAccountChanges ? "Reason" : "Description"}
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder={cfg.descPlaceholder}
            rows={5}
            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
            {isAccountChanges ? "Upload proof (optional)" : "Screenshot (optional)"}
          </label>
          {fileName ? (
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-card border border-border">
              <span className="text-sm text-foreground truncate">{fileName}</span>
              <button type="button" onClick={() => setFileName(null)} className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
                <X className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </div>
          ) : (
            <label className="flex items-center justify-center gap-2 w-full px-4 py-4 rounded-xl bg-card border border-dashed border-border text-sm text-muted-foreground cursor-pointer">
              <Upload className="w-4 h-4" />
              Tap to upload
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => {
                  const f = e.target.files?.[0];
                  if (f) setFileName(f.name);
                }}
              />
            </label>
          )}
        </div>

        <button
          type="submit"
          className="thumb-zone w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base active:animate-press"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default SupportIssue;