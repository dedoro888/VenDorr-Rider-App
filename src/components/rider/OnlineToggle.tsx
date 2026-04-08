import { Power } from "lucide-react";

interface OnlineToggleProps {
  isOnline: boolean;
  onToggle: () => void;
}

const OnlineToggle = ({ isOnline, onToggle }: OnlineToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className={`thumb-zone relative flex items-center justify-center w-28 h-28 rounded-full transition-all duration-500 active:animate-press ${
        isOnline
          ? "bg-primary animate-pulse-glow"
          : "bg-secondary border-2 border-border"
      }`}
    >
      <Power className={`w-10 h-10 transition-colors duration-300 ${isOnline ? "text-primary-foreground" : "text-muted-foreground"}`} />
      <span className={`absolute -bottom-8 text-sm font-semibold tracking-wide ${isOnline ? "text-primary" : "text-muted-foreground"}`}>
        {isOnline ? "ONLINE" : "OFFLINE"}
      </span>
    </button>
  );
};

export default OnlineToggle;
