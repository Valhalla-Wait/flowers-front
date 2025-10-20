"use client";

import { AuthRequests } from "@/core/net/auth";
import { Roles } from "@/core/net/types";
import { useStore } from "@/core/store/store";
import { useQuery } from "@tanstack/react-query";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { profile, setProfile } = useStore(
    useShallow(({ profile, setProfile }) => ({
      profile,
      setProfile,
    }))
  );

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: AuthRequests.GetMe,
    refetchOnMount: false,
    retry: false,
  });

  // const path = usePathname();

  useEffect(() => {
    if (!profile && data) {
      setProfile(data);
    }
  }, [data]);

  // if (profile && path === "/auth") {
  //   router.push("/profile");
  // } else if (!profile && path === "/profile") {
  //   router.push("/auth");
  // }

  return children;
}
