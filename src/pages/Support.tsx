import { ArrowLeft, MessageCircle, HelpCircle, Phone, CreditCard, Package, User, ChevronRight, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const SUPPORT_PHONE = "+2348147131630";

const issueCategories = [
  { slug: "payment", icon: CreditCard, label: "Payment Issue", desc: "Missing earnings, failed withdrawal" },
  { slug: "delivery", icon: Package, label: "Delivery Issue", desc: "Order problems, route issues" },
  { slug: "account", icon: User, label: "Account Issue", desc: "Profile, verification, suspension" },
  { slug: "account-changes", icon: Settings, label: "Request Account Changes", desc: "Vehicle or payout changes beyond limit" },
];

const faqs = [
  { q: "How do I withdraw my earnings?", a: "Go to Earnings → Withdraw Funds. Select your bank and enter the amount." },
  { q: "Why is my account pending?", a: "Your documents are being verified. This typically takes 24-48 hours." },
  { q: "How do I change my vehicle?", a: "Go to Profile → Vehicle Details. Note: you can only edit once per month." },
];

const Support = () => {
  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="px-5 pt-6 pb-4 flex items-center gap-3">
        <Link to="/profile" className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>
        <h1 className="text-xl font-bold text-foreground">Support</h1>
      </div>

      {/* Quick actions */}
      <div className="px-5 mb-6 space-y-2">
        <Link
          to="/support/chat"
          className="thumb-zone w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-base flex items-center justify-center gap-2 active:animate-press"
        >
          <MessageCircle className="w-5 h-5" />
          Start Live Chat
        </Link>
        <a
          href={`tel:${SUPPORT_PHONE}`}
          className="thumb-zone w-full py-4 rounded-xl bg-card border border-border text-foreground font-bold text-base flex items-center justify-center gap-2 active:animate-press"
        >
          <Phone className="w-5 h-5" />
          Call Support
        </a>
      </div>

      {/* Issue categories */}
      <div className="px-5 mb-6">
        <p className="text-sm font-semibold text-foreground mb-3">Report an Issue</p>
        <div className="space-y-2">
          {issueCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                to={`/support/issue/${cat.slug}`}
                className="w-full flex items-center gap-3 p-4 bg-card rounded-xl border border-border active:animate-press text-left"
              >
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{cat.label}</p>
                  <p className="text-xs text-muted-foreground">{cat.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* FAQ */}
      <div className="px-5">
        <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-primary" />
          Frequently Asked Questions
        </p>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="p-4 bg-card rounded-xl border border-border">
              <p className="text-sm font-semibold text-foreground mb-1">{faq.q}</p>
              <p className="text-xs text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;
