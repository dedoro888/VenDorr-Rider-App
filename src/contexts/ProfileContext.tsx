import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";

export interface RiderProfile {
  name: string;
  phone: string;
  avatar: string | null;
}

interface ProfileContextValue {
  profile: RiderProfile;
  updateProfile: (updates: Partial<RiderProfile>) => void;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

const PROFILE_KEY = "rider:profile";

const DEFAULT_PROFILE: RiderProfile = {
  name: "Adebayo Olatunji",
  phone: "+234 812 345 6789",
  avatar: null,
};

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<RiderProfile>(() => {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      return raw ? { ...DEFAULT_PROFILE, ...JSON.parse(raw) } : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch {
      /* ignore */
    }
  }, [profile]);

  const updateProfile = useCallback((updates: Partial<RiderProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
};
