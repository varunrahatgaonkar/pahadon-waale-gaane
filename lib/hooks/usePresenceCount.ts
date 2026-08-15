"use client";

import { useState, useEffect } from "react";
import { getPusherClient } from "@/lib/pusher-client";

export function usePresenceCount(): number {
  const [memberCount, setMemberCount] = useState<number>(1);

  useEffect(() => {
    const pusher = getPusherClient();
    if (!pusher) return;

    const channelName = "presence-site-visitors";
    const channel = pusher.subscribe(channelName);

    channel.bind("pusher:subscription_succeeded", (members: { count: number }) => {
      setMemberCount(members.count);
    });

    channel.bind("pusher:member_added", () => {
      setMemberCount((prev) => prev + 1);
    });

    channel.bind("pusher:member_removed", () => {
      setMemberCount((prev) => Math.max(1, prev - 1));
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(channelName);
    };
  }, []);

  return memberCount;
}
