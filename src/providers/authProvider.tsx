"use client";

import { AuthRequests } from "@/core/net/auth";
import { useStore } from "@/core/store/store";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { FEATURES } from "@/core/config/flags";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const path = usePathname();

  const { profile, setProfile, setIsProfileLoading } = useStore(
    useShallow(({ profile, setProfile, setIsProfileLoading }) => ({
      profile,
      setProfile,
      setIsProfileLoading,
    }))
  );

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: AuthRequests.GetMe,
    refetchOnMount: false,
    retry: false,
    enabled: !FEATURES.simplifiedOrderFlow,
  });

  useEffect(() => {
    if (FEATURES.simplifiedOrderFlow) {
      return;
    }

    setIsProfileLoading(isLoading);
    if (!profile && data) {
      setProfile(data);
    }
  }, [data, profile]);

  useEffect(() => {
    if (FEATURES.simplifiedOrderFlow) {
      return;
    }

    if (profile && path === "/auth") {
      router.push("/profile");
    }
    if (!profile && path === "/profile") {
      router.push("/auth");
    }
  }, [profile, path]);

  return children;
}
