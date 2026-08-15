import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export async function GET() {
  try {
    const images: string[] = [];

    // Exclusively scan public/hero/ directory
    const heroDir = path.join(process.cwd(), "public", "hero");
    if (fs.existsSync(heroDir)) {
      const heroFiles = fs.readdirSync(heroDir);
      for (const file of heroFiles) {
        const ext = path.extname(file).toLowerCase();
        if (ALLOWED_EXTENSIONS.has(ext)) {
          images.push(`/hero/${file}`);
        }
      }
    }

    images.sort((a, b) => a.localeCompare(b));

    const finalImages = images.length > 0 ? images : ["/hero/hero-1.jpg"];

    return NextResponse.json({ images: finalImages });
  } catch (err) {
    console.error("Failed to read hero images:", err);
    return NextResponse.json({ images: ["/hero/hero-1.jpg"] });
  }
}
