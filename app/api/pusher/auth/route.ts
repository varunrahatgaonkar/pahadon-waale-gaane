import { NextResponse } from "next/server";
import Pusher from "pusher";

export async function POST(request: Request) {
  try {
    const appId = process.env.PUSHER_APP_ID;
    const key = process.env.PUSHER_KEY || process.env.NEXT_PUBLIC_PUSHER_KEY;
    const secret = process.env.PUSHER_SECRET;
    const cluster = process.env.PUSHER_CLUSTER || process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

    if (!appId || !key || !secret || !cluster) {
      return NextResponse.json(
        { error: "Pusher server configuration missing" },
        { status: 500 }
      );
    }

    const pusher = new Pusher({
      appId,
      key,
      secret,
      cluster,
      useTLS: true,
    });

    const body = await request.text();
    const params = new URLSearchParams(body);
    const socketId = params.get("socket_id");
    const channelName = params.get("channel_name");

    if (!socketId || !channelName) {
      return NextResponse.json(
        { error: "Missing socket_id or channel_name" },
        { status: 400 }
      );
    }

    const presenceData = {
      user_id: "user_" + Math.random().toString(36).substring(2, 9),
      user_info: {
        joinedAt: new Date().toISOString(),
      },
    };

    const authResponse = pusher.authorizeChannel(socketId, channelName, presenceData);
    return NextResponse.json(authResponse);
  } catch (err) {
    console.error("Pusher auth error:", err);
    return NextResponse.json({ error: "Auth failed" }, { status: 500 });
  }
}
