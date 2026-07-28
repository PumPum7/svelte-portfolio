import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const width = 1200;
const height = 630;
const outputDir = path.join(process.cwd(), 'public');
const assetixDir = path.join(outputDir, 'work', 'assetix');
const movieFavesDir = path.join(outputDir, 'work', 'movie-faves');

const cards = [
	{
		path: 'og-image.png',
		kicker: 'MICHAEL / SOFTWARE ENGINEER',
		title: 'Interface to\ninfrastructure.',
		subtitle: 'Mobile · Web · Backend · Systems'
	},
	{
		path: 'work/rust-database-og.png',
		kicker: 'CASE STUDY / 03',
		title: 'Rust Database',
		subtitle: 'TCP · MVCC · B-tree · Write-ahead log'
	}
];

function escapeXml(value) {
	return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function cardSvg(card) {
	const titleLines = card.title.split('\n');
	const title = titleLines
		.map((line, index) => `<tspan x="78" dy="${index === 0 ? 0 : 94}">${escapeXml(line)}</tspan>`)
		.join('');

	return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#F2F1EC"/>
  <g stroke="#161817" stroke-opacity=".08"><path d="M0 105H1200M0 210H1200M0 315H1200M0 420H1200M0 525H1200"/><path d="M200 0V630M400 0V630M600 0V630M800 0V630M1000 0V630"/></g>
  <path d="M758 526c96-86 157-50 232-121s123-104 242-70M730 558c104-83 166-44 242-113s130-95 257-64M715 592c104-78 173-37 254-106s136-87 261-47" fill="none" stroke="#161817" stroke-opacity=".16" stroke-width="2"/>
  <rect x="78" y="62" width="16" height="16" fill="#2155FF"/>
  <text x="108" y="76" font-family="monospace" font-size="16" letter-spacing="2" fill="#2155FF">${escapeXml(card.kicker)}</text>
  <text x="78" y="236" font-family="Arial, Helvetica, sans-serif" font-size="86" font-weight="600" letter-spacing="-5" fill="#161817">${title}</text>
  <text x="78" y="538" font-family="monospace" font-size="18" letter-spacing="1" fill="#60635F">${escapeXml(card.subtitle)}</text>
  <text x="1038" y="76" font-family="monospace" font-size="16" letter-spacing="1" fill="#161817">pum.works</text>
</svg>`;
}

async function generateMovieFavesVisual({ outputPath, visualHeight, transparent }) {
	const scale = visualHeight / 800;
	const screenshotHeights = [660, 560, 500].map((value) => Math.round(value * scale));
	const screenshots = await Promise.all(
		['home.webp', 'discover.webp', 'details.webp'].map((name, index) =>
			sharp(path.join(movieFavesDir, name))
				.resize({ height: screenshotHeights[index] })
				.png()
				.toBuffer()
		)
	);
	const widths = await Promise.all(
		screenshots.map(async (image) => (await sharp(image).metadata()).width ?? 0)
	);
	const lefts = [500, 745, 940];
	const tops = [70, 140, 210].map((value) => Math.round(value * scale));
	const frames = widths
		.map(
			(imageWidth, index) =>
				`<rect x="${lefts[index] - 9}" y="${tops[index] - 9}" width="${imageWidth + 18}" height="${screenshotHeights[index] + 18}" fill="#F2F1EC" stroke="#161817" stroke-opacity=".32"/>`
		)
		.join('');
	const drawing = `
<svg width="${width}" height="${visualHeight}" viewBox="0 0 ${width} ${visualHeight}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${visualHeight}" fill="#F2F1EC" fill-opacity="${transparent ? 0.78 : 1}"/>
  <rect x="70" y="${Math.round(62 * scale)}" width="14" height="14" fill="#2155FF"/>
  <text x="98" y="${Math.round(75 * scale)}" font-family="monospace" font-size="${Math.round(15 * scale)}" letter-spacing="2" fill="#2155FF">MOVIEFAVES / PERSONAL PROJECT</text>
  <text x="70" y="${Math.round(205 * scale)}" font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(72 * scale)}" font-weight="700" letter-spacing="-5" fill="#161817">MovieFaves</text>
  <text x="74" y="${Math.round(262 * scale)}" font-family="monospace" font-size="${Math.round(15 * scale)}" letter-spacing="2" fill="#60635F">FLUTTER / MOBILE PRODUCT</text>
  <text x="74" y="${Math.round(314 * scale)}" font-family="monospace" font-size="${Math.round(13 * scale)}" letter-spacing="1" fill="#2155FF">TMDB DATA → DART MODELS → INTERFACE</text>
  <text x="74" y="${Math.round(710 * scale)}" font-family="monospace" font-size="${Math.round(12 * scale)}" letter-spacing="1.5" fill="#60635F">DESIGNED + BUILT END-TO-END</text>
  ${frames}
</svg>`;
	await sharp({
		create: {
			width,
			height: visualHeight,
			channels: 4,
			background: transparent ? { r: 242, g: 241, b: 236, alpha: 0 } : '#f2f1ec'
		}
	})
		.composite([
			{ input: Buffer.from(drawing), left: 0, top: 0 },
			...screenshots.map((input, index) => ({ input, left: lefts[index], top: tops[index] }))
		])
		.toFile(outputPath);
}

async function resizedAssetixImage(filename, size) {
	return sharp(path.join(assetixDir, filename))
		.resize(size, size, { kernel: sharp.kernel.nearest })
		.png()
		.toBuffer();
}

async function generateAssetixCover({ outputPath, visualHeight, transparent }) {
	const scale = visualHeight / 800;
	const battleSpriteSize = Math.round(210 * scale);
	const rosterSpriteSize = Math.round(112 * scale);
	const [palantir, treasury, gold, doge, index] = await Promise.all([
		resizedAssetixImage('palantir.png', battleSpriteSize),
		resizedAssetixImage('us-treasury.png', battleSpriteSize),
		resizedAssetixImage('gold-bar.png', rosterSpriteSize),
		resizedAssetixImage('doge-coin.png', rosterSpriteSize),
		resizedAssetixImage('sp-500.png', rosterSpriteSize)
	]);
	const frameTop = Math.round(70 * scale);
	const frameHeight = Math.round(660 * scale);
	const titleY = Math.round(202 * scale);
	const battleTop = Math.round(235 * scale);
	const rosterTop = Math.round(590 * scale);

	const drawing = `
<svg width="${width}" height="${visualHeight}" viewBox="0 0 ${width} ${visualHeight}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${visualHeight}" fill="#F2F1EC" fill-opacity="${transparent ? 0.78 : 1}"/>
  <rect x="70" y="${Math.round(62 * scale)}" width="14" height="14" fill="#2155FF"/>
  <text x="98" y="${Math.round(75 * scale)}" font-family="monospace" font-size="${Math.round(15 * scale)}" letter-spacing="2" fill="#2155FF">ASSETIX / STARTHACK 2026</text>
  <text x="70" y="${titleY}" font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(94 * scale)}" font-weight="700" letter-spacing="-5" fill="#161817">Assetix</text>
  <text x="74" y="${Math.round(258 * scale)}" font-family="monospace" font-size="${Math.round(15 * scale)}" letter-spacing="2" fill="#60635F">FINANCIAL LITERACY / GAME SYSTEMS</text>
  <text x="74" y="${Math.round(308 * scale)}" font-family="monospace" font-size="${Math.round(13 * scale)}" letter-spacing="1" fill="#2155FF">NEXT.JS → RUST / WASM → FASTAPI</text>
  <rect x="530" y="${frameTop}" width="600" height="${frameHeight}" fill="#E9E8E1" fill-opacity=".82" stroke="#161817" stroke-opacity=".32"/>
  <path d="M${Math.round(750)} ${Math.round(390 * scale)}H${Math.round(915)}" stroke="#2155FF" stroke-width="2"/>
  <circle cx="832" cy="${Math.round(390 * scale)}" r="7" fill="#2155FF"/>
  <text x="565" y="${Math.round(120 * scale)}" font-family="monospace" font-size="${Math.round(12 * scale)}" letter-spacing="1.5" fill="#60635F">PLAYER ASSET</text>
  <text x="955" y="${Math.round(120 * scale)}" font-family="monospace" font-size="${Math.round(12 * scale)}" letter-spacing="1.5" fill="#60635F">OPPONENT</text>
  <text x="565" y="${Math.round(655 * scale)}" font-family="monospace" font-size="${Math.round(12 * scale)}" letter-spacing="1.5" fill="#2155FF">ROUND STATE / ABILITIES / MARKET EVENTS</text>
  <text x="74" y="${Math.round(545 * scale)}" font-family="monospace" font-size="${Math.round(12 * scale)}" letter-spacing="1.5" fill="#60635F">SELECTED FINMONS</text>
</svg>`;

	await sharp({
		create: {
			width,
			height: visualHeight,
			channels: 4,
			background: transparent ? { r: 242, g: 241, b: 236, alpha: 0 } : '#f2f1ec'
		}
	})
		.composite([
			{ input: Buffer.from(drawing), left: 0, top: 0 },
			{ input: palantir, left: 580, top: battleTop },
			{ input: treasury, left: 900, top: battleTop },
			{ input: gold, left: 70, top: rosterTop },
			{ input: doge, left: 210, top: rosterTop },
			{ input: index, left: 350, top: rosterTop }
		])
		.toFile(outputPath);
}

async function generateAssetixEngine(outputPath) {
	const spriteSize = 150;
	const sprites = await Promise.all(
		[
			'palantir.png',
			'gold-bar.png',
			'doge-coin.png',
			'us-treasury.png',
			'sp-500.png',
			'smart-contract.png'
		].map((name) => resizedAssetixImage(name, spriteSize))
	);
	const drawing = `
<svg width="1200" height="800" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="800" fill="#E9E8E1" fill-opacity=".82"/>
  <text x="70" y="76" font-family="monospace" font-size="15" letter-spacing="2" fill="#2155FF">ASSETIX / BATTLE ENGINE</text>
  <text x="70" y="142" font-family="Arial, Helvetica, sans-serif" font-size="48" font-weight="600" letter-spacing="-2" fill="#161817">One round, one explicit state transition.</text>
  <path d="M370 392H480M720 392H830" stroke="#161817" stroke-width="2"/>
  <circle cx="425" cy="392" r="6" fill="#2155FF"/><circle cx="775" cy="392" r="6" fill="#2155FF"/>
  <rect x="480" y="290" width="240" height="204" fill="#2155FF"/>
  <text x="510" y="340" font-family="monospace" font-size="14" letter-spacing="2" fill="white">RUST / WASM</text>
  <text x="510" y="398" font-family="Arial, Helvetica, sans-serif" font-size="31" font-weight="600" fill="white">Resolve round</text>
  <text x="510" y="446" font-family="monospace" font-size="12" letter-spacing="1" fill="white">ABILITY · EVENT · SWAP</text>
  <text x="90" y="235" font-family="monospace" font-size="13" letter-spacing="1.5" fill="#60635F">PLAYER TEAM</text>
  <text x="890" y="235" font-family="monospace" font-size="13" letter-spacing="1.5" fill="#60635F">OPPONENT TEAM</text>
  <g font-family="monospace" font-size="12" letter-spacing="1" fill="#60635F"><text x="70" y="720">INPUT / VALIDATED TEAMS + SEED</text><text x="455" y="720">STATE / DETERMINISTIC ROUND</text><text x="870" y="720">OUTPUT / RESULT + PROGRESSION</text></g>
</svg>`;
	await sharp({
		create: {
			width: 1200,
			height: 800,
			channels: 4,
			background: { r: 233, g: 232, b: 225, alpha: 0 }
		}
	})
		.composite([
			{ input: Buffer.from(drawing), left: 0, top: 0 },
			{ input: sprites[0], left: 70, top: 300 },
			{ input: sprites[1], left: 200, top: 395 },
			{ input: sprites[2], left: 70, top: 490 },
			{ input: sprites[3], left: 980, top: 300 },
			{ input: sprites[4], left: 850, top: 395 },
			{ input: sprites[5], left: 980, top: 490 }
		])
		.webp({ quality: 90 })
		.toFile(outputPath);
}

await mkdir(path.join(outputDir, 'work'), { recursive: true });
for (const card of cards) {
	await sharp(Buffer.from(cardSvg(card)))
		.png()
		.toFile(path.join(outputDir, card.path));
}

await generateMovieFavesVisual({
	outputPath: path.join(outputDir, 'work', 'movie-faves-cover.webp'),
	visualHeight: 800,
	transparent: true
});
await generateMovieFavesVisual({
	outputPath: path.join(outputDir, 'work', 'movie-faves-og.png'),
	visualHeight: 630,
	transparent: false
});
await generateAssetixCover({
	outputPath: path.join(outputDir, 'work', 'assetix-cover.webp'),
	visualHeight: 800,
	transparent: true
});
await generateAssetixCover({
	outputPath: path.join(outputDir, 'work', 'assetix-og.png'),
	visualHeight: 630,
	transparent: false
});
await generateAssetixEngine(path.join(outputDir, 'work', 'assetix-engine.webp'));

console.log(`Generated ${cards.length + 5} portfolio images in ${outputDir}`);
