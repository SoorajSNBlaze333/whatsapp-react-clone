import { createContext, PropsWithChildren, useEffect, useState } from "react";

export type Profile = {
  id: string;
  name: string;
  blueTickEnabled: boolean;
  avatarUrl: string;
};

export const ProfileContext = createContext<
  | undefined
  | {
      profile: Profile;
      isLoading: boolean;
    }
>(undefined);

export default function ProfileProvider({ children }: PropsWithChildren) {
  const [profile, setProfile] = useState<{
    profile: Profile;
    isLoading: boolean;
  }>({
    profile: {
      id: "",
      name: "",
      blueTickEnabled: false,
      avatarUrl: "",
    },
    isLoading: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setProfile((prev) => ({ ...prev, isLoading: true }));
      const response = await fetch("/api/mock/profile");
      const data = await response.json();
      setProfile((prev) => ({
        ...prev,
        profile: data,
        isLoading: false,
      }));
    };

    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ ...profile }}>
      {children}
    </ProfileContext.Provider>
  );
}
