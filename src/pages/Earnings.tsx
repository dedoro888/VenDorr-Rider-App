import { Wallet, ArrowDownToLine, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import BottomNav from "@/components/rider/BottomNav";

const transactions = [
  { id: 1, type: "earning", desc: "Chicken Republic → Hall 3", amount: 650, time: "2:34 PM" },
  { id: 2, type: "earning", desc: "Kilimanjaro → Faculty Block", amount: 500, time: "1:10 PM" },
  { id: 3, type: "earning", desc: "Cafeteria 2 → Hall 5", amount: 400, time: "12:22 PM" },
  { id: 4, type: "withdrawal", desc: "Withdrawal to GTBank", amount: -3000, time: "11:00 AM" },
  { id: 5, type: "earning", desc: "Sweet Sensation → Gate", amount: 750, time: "10:15 AM" },
  { id: 6, type: "earning", desc: "The Place → Hall 1", amount: 550, time: "9:30 AM" },
];

const Earnings = () => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="min-h-screen pb-24 bg-background">
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-xl font-bold text-foreground">Earnings</h1>
      </div>

      {/* Summary cards */}
      <div className="px-5 space-y-3">
        <div className="bg-card rounded-2xl p-5 border border-border glow-earnings">
          <p className="text-xs text-muted-foreground font-medium mb-1">Total Balance</p>
          <p className="text-4xl font-extrabold text-earnings animate-count-up">₦12,850</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Today</p>
            <p className="text-xl font-bold text-foreground">₦4,500</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-xs text-muted-foreground mb-1">This Week</p>
            <p className="text-xl font-bold text-foreground">₦18,200</p>
          </div>
        </div>

        {/* Withdraw */}
        <button className="thumb-zone w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base flex items-center justify-center gap-2 active:animate-press">
          <ArrowDownToLine className="w-5 h-5" />
          Withdraw Funds
        </button>
      </div>

      {/* Transaction history */}
      <div className="px-5 mt-6">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-sm font-semibold text-foreground">Transaction History</span>
          {showHistory ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        {showHistory && (
          <div className="space-y-2 animate-fade-in">
            {transactions.map(tx => (
              <div key={tx.id} className="flex items-center justify-between py-3 px-4 bg-card rounded-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    tx.type === "earning" ? "bg-primary/15" : "bg-destructive/15"
                  }`}>
                    <Wallet className={`w-4 h-4 ${tx.type === "earning" ? "text-primary" : "text-destructive"}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{tx.desc}</p>
                    <p className="text-xs text-muted-foreground">{tx.time}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold ${tx.amount > 0 ? "text-primary" : "text-destructive"}`}>
                  {tx.amount > 0 ? "+" : ""}₦{Math.abs(tx.amount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Earnings;
