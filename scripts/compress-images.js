/**
 * compress-images.js
 *
 * Batch-compresses all images in the Oneiros-26 public folder.
 * Targets: 90+ Lighthouse score, <300KB per image.
 *
 * Usage:  node scripts/compress-images.js
 */

import sharp from 'sharp';
import { readdirSync, statSync, existsSync, writeFileSync, readFileSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC = join(__dirname, '..', 'public');

/* ── helpers ─────────────────────────────────────────────────────────── */

async function processFile(fullPath, maxWidth, quality) {
    const name = basename(fullPath);
    const dir = fullPath.slice(0, fullPath.length - name.length - 1) || '.';

    if (/\.(jpe?g|png)$/i.test(name)) {
        // Convert to .webp
        const outPath = join(dir, basename(name, extname(name)) + '.webp');
        const before = statSync(fullPath).size;
        const inputBuffer = readFileSync(fullPath);
        const meta = await sharp(inputBuffer).metadata();
        let pipeline = sharp(inputBuffer);
        if (meta.width && meta.width > maxWidth) {
            pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
        }
        const outBuffer = await pipeline.webp({ quality }).toBuffer();
        writeFileSync(outPath, outBuffer);
        const after = outBuffer.length;
        console.log(`  ✅ ${name} → ${basename(outPath)}  ${(before/1024/1024).toFixed(1)}MB → ${(after/1024).toFixed(0)}KB  (-${((1-after/before)*100).toFixed(0)}%)`);
    } else if (/\.webp$/i.test(name)) {
        // Re-compress in-place only if smaller
        const before = statSync(fullPath).size;
        const inputBuffer = readFileSync(fullPath);
        const meta = await sharp(inputBuffer).metadata();
        let pipeline = sharp(inputBuffer);
        if (meta.width && meta.width > maxWidth) {
            pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
        }
        const outBuffer = await pipeline.webp({ quality }).toBuffer();
        const after = outBuffer.length;
        if (after < before) {
            writeFileSync(fullPath, outBuffer);
            console.log(`  ✅ ${name}  ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB  (-${((1-after/before)*100).toFixed(0)}%)`);
        } else {
            console.log(`  ⏭  ${name} already optimal (${(before/1024).toFixed(0)}KB)`);
        }
    }
}

async function compressDir(dirPath, maxWidth, quality) {
    if (!existsSync(dirPath)) {
        console.log(`  ⏭  ${dirPath} not found — skipping`);
        return;
    }

    const entries = readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = join(dirPath, entry.name);
        if (entry.isDirectory()) {
            await compressDir(fullPath, maxWidth, quality);
        } else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) {
            await processFile(fullPath, maxWidth, quality);
        }
    }
}

/* ── 1. Major events (5.7MB → <300KB) ──────────────────────────────── */
async function compressMajorEvents() {
    console.log('\n🖼  Major Events (max 1400px, q75)\n');
    await compressDir(join(PUBLIC, 'major_events'), 1400, 75);
}

/* ── 2. Minor events ─────────────────────────────────────────────────── */
async function compressMinorEvents() {
    console.log('\n🖼  Minor Events (max 1200px, q75)\n');
    await compressDir(join(PUBLIC, 'minor_events'), 1200, 75);
}

/* ── 3. Team images ──────────────────────────────────────────────────── */
async function compressTeam() {
    console.log('\n🖼  Team (max 400px, q80)\n');
    await compressDir(join(PUBLIC, 'team'), 400, 80);
}

/* ── 4. Logo ─────────────────────────────────────────────────────────── */
async function compressLogo() {
    console.log('\n🖼  Logo\n');
    const webpPath = join(PUBLIC, 'oneiros-logo.webp');
    const pngPath = join(PUBLIC, 'oneiros-logo.png');
    const inputPath = existsSync(webpPath) ? webpPath : pngPath;
    if (existsSync(inputPath)) {
        await processFile(inputPath, 800, 85);
    } else {
        console.log('  ⏭  oneiros-logo not found — skipping');
    }
}

/* ── Run ─────────────────────────────────────────────────────────────── */

(async () => {
    console.log('═══════════════════════════════════════════════');
    console.log('  Oneiros-26 Image Compression');
    console.log('  Target: <300KB/image, 90+ Lighthouse');
    console.log('═══════════════════════════════════════════════');

    await compressMajorEvents();
    await compressMinorEvents();
    await compressTeam();
    await compressLogo();

    console.log('\n✨ Done! Compressed WebP files are in-place.\n');
})();
