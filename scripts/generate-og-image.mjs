import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const width = 1200;
const height = 630;
const rootDir = process.cwd();
const pandaPath = path.join(rootDir, 'public', 'favicon.png');
const outputDir = path.join(rootDir, 'public');
const outputPath = path.join(outputDir, 'og-image.png');
const pandaBuffer = await readFile(pandaPath);
const pandaDataUri = `data:image/png;base64,${pandaBuffer.toString('base64')}`;

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="110" y1="48" x2="1094" y2="594" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F8EDD0"/>
      <stop offset="1" stop-color="#EEDCB2"/>
    </linearGradient>
    <linearGradient id="panel" x1="90" y1="90" x2="1110" y2="540" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFF8E7"/>
      <stop offset="1" stop-color="#F8EBCB"/>
    </linearGradient>
    <clipPath id="avatar-clip">
      <rect x="142" y="172" width="164" height="164" rx="28" ry="28"/>
    </clipPath>
  </defs>

  <rect width="${width}" height="${height}" rx="36" fill="url(#bg)"/>
  <circle cx="1048" cy="88" r="98" fill="#D1BE95" opacity="0.32"/>
  <circle cx="1128" cy="154" r="42" fill="#E1D2AC" opacity="0.55"/>
  <rect x="64" y="64" width="1072" height="502" rx="34" fill="url(#panel)" stroke="#6B5B4A" stroke-opacity="0.22" stroke-width="3"/>

  <rect x="108" y="106" width="984" height="4" rx="2" fill="#6B5B4A" fill-opacity="0.18"/>
  <rect x="136" y="166" width="176" height="176" rx="34" fill="#FFF8E7" stroke="#2C5F2D" stroke-opacity="0.14" stroke-width="3"/>
  <image href="${pandaDataUri}" x="142" y="172" width="164" height="164" preserveAspectRatio="xMidYMid slice" clip-path="url(#avatar-clip)"/>

  <text x="374" y="214" fill="#4A3B2A" font-size="68" font-family="Georgia, serif" font-weight="700">Michael (Pum)</text>
  <text x="374" y="278" fill="#2C5F2D" font-size="34" font-family="Arial, sans-serif" font-weight="700">Full-stack developer and creative coder</text>

  <text x="374" y="344" fill="#6B5B4A" font-size="28" font-family="Arial, sans-serif">
    <tspan x="374" dy="0">Design-focused web apps, product-minded builds,</tspan>
    <tspan x="374" dy="42">and thoughtful developer tooling.</tspan>
  </text>

  <rect x="374" y="414" width="320" height="2" rx="1" fill="#2C5F2D" fill-opacity="0.22"/>
  <text x="374" y="462" fill="#2C5F2D" font-size="30" font-family="Arial, sans-serif" font-weight="700">pum.works</text>
</svg>`;

await mkdir(outputDir, { recursive: true });
await sharp(Buffer.from(svg)).png().toFile(outputPath);
await writeFile(path.join(outputDir, 'og-image.svg'), svg, 'utf8');

console.log(`Generated ${outputPath}`);
