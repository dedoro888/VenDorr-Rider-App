import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PAYMENT_KEY = "rider:paymentLastEdit";

export const getPaymentLastEdit = (): number | null => {
  try {
    const v = localStorage.getItem(PAYMENT_KEY);
    return v ? parseInt(v, 10) : null;
  } catch {
    return null;
  }
};

const EditPayment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bank, setBank] = useState("GTBank");
  const [account, setAccount] = useState("0123456789");
  const [name, setName] = useState("Adebayo Olatunji");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (account.length < 10) {
      toast({ title: "Invalid account", description: "Account number must be at least 10 digits.", variant: "destructive" });
      return;
    }
    try {
      localStorage.setItem(PAYMENT_KEY, Date.now().toString());
    } catch {
      /* ignore */
    }
    toast({ title: "Payment details updated", description: "Your payout account has been saved." });
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-5 pt-6 pb-4 flex items-center gap-3">
        <Link to="/profile" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>
        <h1 className="text-xl font-bold text-foreground">Edit Payment</h1>
      </div>
      <form onSubmit={handleSubmit} className="px-5 space-y-4">
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Bank</label>
          <select value={bank} onChange={e => setBank(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            {["GTBank", "Access Bank", "Zenith Bank", "First Bank", "UBA", "Opay", "Palmpay", "Kuda"].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Account Number</label>
          <input
            value={account}
            onChange={e => setAccount(e.target.value.replace(/\D/g, "").slice(0, 10))}
            inputMode="numeric"
            maxLength={10}
            className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Account Name</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <button type="submit" className="thumb-zone w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base active:animate-press">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPayment;