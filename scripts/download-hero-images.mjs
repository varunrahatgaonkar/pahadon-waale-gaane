import fs from 'fs';
import path from 'path';
import https from 'https';

const heroDir = path.join(process.cwd(), 'public', 'hero');
if (!fs.existsSync(heroDir)) {
  fs.mkdirSync(heroDir, { recursive: true });
}

// 6 Unsplash high quality mountain / hill road / mist photos
const imageUrls = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&q=80', // Mountain lake & trees
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80', // Rocky peaks & mist
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80', // Winding mountain valley
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80', // Foggy pine forest road
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1600&q=80', // Mountain road dusk
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80', // Starry night over snowy peaks
];

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Downloading 6 hero images into public/hero/...');
  for (let i = 0; i < imageUrls.length; i++) {
    const dest = path.join(heroDir, `hero-${i + 1}.jpg`);
    try {
      await downloadImage(imageUrls[i], dest);
      console.log(`Saved hero-${i + 1}.jpg`);
    } catch (e) {
      console.error(`Failed hero-${i + 1}.jpg:`, e.message);
      // Fallback: copy scene.png if exists
      const scenePath = path.join(process.cwd(), 'public', 'scene.png');
      if (fs.existsSync(scenePath)) {
        fs.copyFileSync(scenePath, dest);
        console.log(`Copied fallback scene.png to hero-${i + 1}.jpg`);
      }
    }
  }
}

main();
