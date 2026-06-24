import { useRef, useState, useEffect, useCallback } from "react";
import { useRider } from "@/contexts/RiderContext";

const POS_KEY = "rider:statusBadgePos";
const BADGE_W = 90;
const BADGE_H = 32;
const MARGIN = 12;

interface Pos {
  x: number;
  y: number;
}

/**
 * Floating, always-visible AND draggable driver status indicator.
 */
const StatusBadge = () => {
  const { isOnline } = useRider();
  const dragging = useRef(false);
  const moved = useRef(false);
  const offset = useRef<Pos>({ x: 0, y: 0 });

  const defaultPos = useCallback((): Pos => ({
    x: window.innerWidth - BADGE_W - MARGIN,
    y: MARGIN,
  }), []);

  const [pos, setPos] = useState<Pos>(() => {
    try {
      const raw = localStorage.getItem(POS_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      /* ignore */
    }
    return { x: window.innerWidth - BADGE_W - MARGIN, y: MARGIN };
  });

  const clamp = useCallback((p: Pos): Pos => ({
    x: Math.min(Math.max(MARGIN, p.x), window.innerWidth - BADGE_W - MARGIN),
    y: Math.min(Math.max(MARGIN, p.y), window.innerHeight - BADGE_H - MARGIN),
  }), []);

  useEffect(() => {
    setPos(prev => clamp(prev));
    const onResize = () => setPos(prev => clamp(prev));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [clamp]);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    moved.current = false;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    moved.current = true;
    setPos(clamp({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y }));
  };

  const handlePointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    setPos(prev => {
      try {
        localStorage.setItem(POS_KEY, JSON.stringify(prev));
      } catch {
        /* ignore */
      }
      return prev;
    });
  };

  return (
    <div
      className="fixed z-50 touch-none cursor-grab active:cursor-grabbing select-none"
      style={{ left: pos.x, top: pos.y }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-colors ${
          isOnline ? "glass-primary text-primary-foreground" : "glass text-muted-foreground"
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            isOnline ? "bg-primary-foreground animate-pulse" : "bg-muted-foreground"
          }`}
        />
        {isOnline ? "Online" : "Offline"}
      </div>
    </div>
  );
};

export default StatusBadge;
