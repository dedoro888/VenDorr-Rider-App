import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

export interface ActiveDeliverySession {
  orderId: string;
  vendor: string;
  pickup: string;
  dropoff: string;
  earning: number;
  distance: string;
  stageIndex: number;
  acceptedAt: number;
}

interface RiderContextValue {
  isOnline: boolean;
  setOnline: (online: boolean) => void;
  activeDelivery: ActiveDeliverySession | null;
  startDelivery: (session: Omit<ActiveDeliverySession, "acceptedAt" | "stageIndex"> & { stageIndex?: number }) => void;
  updateDeliveryStage: (stageIndex: number) => void;
  endDelivery: () => void;
}

const RiderContext = createContext<RiderContextValue | undefined>(undefined);

const ONLINE_KEY = "rider:isOnline";
const ACTIVE_KEY = "rider:activeDelivery";

export const RiderProvider = ({ children }: { children: ReactNode }) => {
  const [isOnline, setIsOnlineState] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ONLINE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const [activeDelivery, setActiveDelivery] = useState<ActiveDeliverySession | null>(() => {
    try {
      const raw = localStorage.getItem(ACTIVE_KEY);
      return raw ? (JSON.parse(raw) as ActiveDeliverySession) : null;
    } catch {
      return null;
    }
  });

  // Persist online status
  useEffect(() => {
    try {
      localStorage.setItem(ONLINE_KEY, isOnline ? "true" : "false");
    } catch {
      /* ignore */
    }
  }, [isOnline]);

  // Persist active delivery
  useEffect(() => {
    try {
      if (activeDelivery) {
        localStorage.setItem(ACTIVE_KEY, JSON.stringify(activeDelivery));
      } else {
        localStorage.removeItem(ACTIVE_KEY);
      }
    } catch {
      /* ignore */
    }
  }, [activeDelivery]);

  // Cross-tab sync
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === ONLINE_KEY) {
        setIsOnlineState(e.newValue === "true");
      }
      if (e.key === ACTIVE_KEY) {
        setActiveDelivery(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const setOnline = useCallback((online: boolean) => {
    setIsOnlineState(online);
  }, []);

  const startDelivery: RiderContextValue["startDelivery"] = useCallback((session) => {
    setActiveDelivery({
      ...session,
      stageIndex: session.stageIndex ?? 0,
      acceptedAt: Date.now(),
    });
  }, []);

  const updateDeliveryStage = useCallback((stageIndex: number) => {
    setActiveDelivery(prev => (prev ? { ...prev, stageIndex } : prev));
  }, []);

  const endDelivery = useCallback(() => {
    setActiveDelivery(null);
  }, []);

  return (
    <RiderContext.Provider
      value={{ isOnline, setOnline, activeDelivery, startDelivery, updateDeliveryStage, endDelivery }}
    >
      {children}
    </RiderContext.Provider>
  );
};

export const useRider = () => {
  const ctx = useContext(RiderContext);
  if (!ctx) throw new Error("useRider must be used within RiderProvider");
  return ctx;
};