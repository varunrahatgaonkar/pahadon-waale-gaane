import { NextResponse } from "next/server";

// Store active heartbeat sessions
const activeSessions = new Map<string, number>();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session") || "anon";
  const now = Date.now();

  // Clean up sessions older than 45 seconds
  activeSessions.set(sessionId, now);
  for (const [id, timestamp] of activeSessions.entries()) {
    if (now - timestamp > 45000) {
      activeSessions.delete(id);
    }
  }

  // Base listener simulation based on time of day + active real heartbeats
  const hour = new Date().getHours();
  let baseMultiplier = 12;
  if (hour >= 18 || hour <= 2) baseMultiplier = 28; // Evening & late night peak for Pahadi songs
  else if (hour >= 12) baseMultiplier = 19;

  const totalListeners = Math.max(activeSessions.size + baseMultiplier, 12);

  return NextResponse.json({
    listeners: totalListeners,
    timestamp: now,
  });
}
