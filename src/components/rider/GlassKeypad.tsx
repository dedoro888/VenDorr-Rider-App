import { Delete } from "lucide-react";

const keys = [
  { n: "1", s: "" },
  { n: "2", s: "ABC" },
  { n: "3", s: "DEF" },
  { n: "4", s: "GHI" },
  { n: "5", s: "JKL" },
  { n: "6", s: "MNO" },
  { n: "7", s: "PQRS" },
  { n: "8", s: "TUV" },
  { n: "9", s: "WXYZ" },
];

interface GlassKeypadProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  onComplete?: (value: string) => void;
  /** Optional element rendered in the bottom-left cell (e.g. Face ID button) */
  leftAction?: React.ReactNode;
  error?: boolean;
}

const GlassKeypad = ({
  value,
  onChange,
  length = 4,
  onComplete,
  leftAction,
  error,
}: GlassKeypadProps) => {
  const press = (digit: string) => {
    if (value.length >= length) return;
    const next = value + digit;
    onChange(next);
    if (next.length === length) onComplete?.(next);
  };

  const back = () => onChange(value.slice(0, -1));

  return (
    <div className="space-y-7">
      {/* Dots indicator */}
      <div className={`flex justify-center gap-4 ${error ? "animate-press" : ""}`}>
        {Array.from({ length }).map((_, i) => (
          <span
            key={i}
            className={`w-3.5 h-3.5 rounded-full border transition-all duration-200 ${
              error
                ? "border-destructive bg-destructive/40"
                : i < value.length
                ? "bg-primary border-primary scale-110"
                : "bg-transparent border-foreground/30"
            }`}
          />
        ))}
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-x-7 gap-y-4 justify-items-center">
        {keys.map(k => (
          <button
            key={k.n}
            type="button"
            onClick={() => press(k.n)}
            className="glass-key thumb-zone w-[72px] h-[72px] rounded-full flex flex-col items-center justify-center transition-transform duration-150 active:scale-90"
          >
            <span className="text-[26px] font-semibold text-foreground leading-none">{k.n}</span>
            {k.s && (
              <span className="text-[9px] tracking-[0.18em] font-semibold text-muted-foreground mt-1">
                {k.s}
              </span>
            )}
          </button>
        ))}

        {/* Bottom-left action (or empty) */}
        <div className="w-[72px] h-[72px] flex items-center justify-center">{leftAction}</div>

        {/* 0 */}
        <button
          type="button"
          onClick={() => press("0")}
          className="glass-key thumb-zone w-[72px] h-[72px] rounded-full flex items-center justify-center transition-transform duration-150 active:scale-90"
        >
          <span className="text-[26px] font-semibold text-foreground leading-none">0</span>
        </button>

        {/* Delete */}
        <button
          type="button"
          onClick={back}
          disabled={value.length === 0}
          className="thumb-zone w-[72px] h-[72px] rounded-full flex items-center justify-center transition-transform duration-150 active:scale-90 disabled:opacity-30"
        >
          <Delete className="w-6 h-6 text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default GlassKeypad;
