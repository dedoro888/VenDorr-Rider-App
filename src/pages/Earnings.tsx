import { Wallet, ArrowDownToLine, ChevronDown, ChevronUp, TrendingUp, Calendar } from "lucide-react";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import BottomNav from "@/components/rider/BottomNav";

const dailyData = [
  { label: "Mon", amount: 3200 },
  { label: "Tue", amount: 4500 },
  { label: "Wed", amount: 2800 },
  { label: "Thu", amount: 5100 },
  { label: "Fri", amount: 6200 },
  { label: "Sat", amount: 4800 },
  { label: "Sun", amount: 3600 },
];

const weeklyData = [
  { label: "Wk1", amount: 18200 },
  { label: "Wk2", amount: 22400 },
  { label: "Wk3", amount: 19800 },
  { label: "Wk4", amount: 24100 },
];

const monthlyData = [
  { label: "Jan", amount: 62000 },
  { label: "Feb", amount: 58000 },
  { label: "Mar", amount: 71000 },
  { label: "Apr", amount: 65000 },
  { label: "May", amount: 78000 },
  { label: "Jun", amount: 82000 },
];

const yearlyData = [
  { label: "2023", amount: 720000 },
  { label: "2024", amount: 850000 },
  { label: "2025", amount: 420000 },
];

const chartDataMap: Record<string, typeof dailyData> = {
  daily: dailyData,
  weekly: weeklyData,
  monthly: monthlyData,
  yearly: yearlyData,
};

const transactions = [
  { id: 1, type: "earning", desc: "Chicken Republic → Hall 3", amount: 650, time: "2:34 PM" },
  { id: 2, type: "earning", desc: "Kilimanjaro → Faculty Block", amount: 500, time: "1:10 PM" },
  { id: 3, type: "earning", desc: "Cafeteria 2 → Hall 5", amount: 400, time: "12:22 PM" },
  { id: 4, type: "withdrawal", desc: "Withdrawal to GTBank", amount: -3000, time: "11:00 AM" },
  { id: 5, type: "earning", desc: "Sweet Sensation → Gate", amount: 750, time: "10:15 AM" },
  { id: 6, type: "earning", desc: "The Place → Hall 1", amount: 550, time: "9:30 AM" },
];

const periods = ["daily", "weekly", "monthly", "yearly"] as const;

const Earnings = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [period, setPeriod] = useState<typeof periods[number]>("daily");

  const chartData = chartDataMap[period];
  const totalEarnings = chartData.reduce((s, d) => s + d.amount, 0);
  const avgPerDelivery = Math.round(totalEarnings / Math.max(chartData.length * 3, 1));

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

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-card rounded-xl p-3 border border-border text-center">
            <p className="text-[10px] text-muted-foreground mb-0.5">Today</p>
            <p className="text-base font-bold text-foreground">₦4,500</p>
          </div>
          <div className="bg-card rounded-xl p-3 border border-border text-center">
            <p className="text-[10px] text-muted-foreground mb-0.5">Deliveries</p>
            <p className="text-base font-bold text-foreground">142</p>
          </div>
          <div className="bg-card rounded-xl p-3 border border-border text-center">
            <p className="text-[10px] text-muted-foreground mb-0.5">Avg/Delivery</p>
            <p className="text-base font-bold text-primary">₦{avgPerDelivery}</p>
          </div>
        </div>

        {/* Withdraw */}
        <button className="thumb-zone w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base flex items-center justify-center gap-2 active:animate-press">
          <ArrowDownToLine className="w-5 h-5" />
          Withdraw Funds
        </button>
      </div>

      {/* Chart */}
      <div className="px-5 mt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Earnings Overview</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
        </div>

        {/* Period tabs */}
        <div className="flex gap-1 mb-4 bg-secondary rounded-xl p-1">
          {periods.map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 text-xs font-medium py-2 rounded-lg transition-all capitalize ${
                period === p ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="bg-card rounded-2xl border border-border p-4">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <XAxis dataKey="label" tick={{ fontSize: 10, fill: "hsl(215 15% 55%)" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220 18% 14%)",
                  border: "1px solid hsl(220 15% 22%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "hsl(210 20% 95%)",
                }}
                formatter={(value: number) => [`₦${value.toLocaleString()}`, "Earnings"]}
              />
              <Bar dataKey="amount" fill="hsl(145 65% 42%)" radius={[4, 4, 0, 0]} label={{ position: "top", fontSize: 9, fill: "hsl(215 15% 55%)", formatter: (v: number) => `₦${v >= 1000 ? `${(v/1000).toFixed(v >= 10000 ? 0 : 1)}k` : v}` }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
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
