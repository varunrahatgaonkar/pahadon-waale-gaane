import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const EXCLUDE_FILES = new Set([
  "favicon.ico",
  "next.svg",
  "globe.svg",
  "vercel.svg",
  "window.svg",
  "file.svg",
  "og-scene.png",
]);

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export async function GET() {
  try {
    const images: string[] = [];

    // Scan public/ directory
    const publicDir = path.join(process.cwd(), "public");
    if (fs.existsSync(publicDir)) {
      const files = fs.readdirSync(publicDir);
      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (!EXCLUDE_FILES.has(file) && ALLOWED_EXTENSIONS.has(ext)) {
          images.push(`/${file}`);
        }
      }
    }

    // Scan public/hero/ directory
    const heroDir = path.join(publicDir, "hero");
    if (fs.existsSync(heroDir)) {
      const heroFiles = fs.readdirSync(heroDir);
      for (const file of heroFiles) {
        const ext = path.extname(file).toLowerCase();
        if (ALLOWED_EXTENSIONS.has(ext)) {
          images.push(`/hero/${file}`);
        }
      }
    }

    // Ensure scene.png is first if present, otherwise fallback
    images.sort((a, b) => {
      if (a === "/scene.png") return -1;
      if (b === "/scene.png") return 1;
      return a.localeCompare(b);
    });

    const finalImages = images.length > 0 ? images : ["/scene.png"];

    return NextResponse.json({ images: finalImages });
  } catch (err) {
    console.error("Failed to read hero images:", err);
    return NextResponse.json({ images: ["/scene.png"] });
  }
}
