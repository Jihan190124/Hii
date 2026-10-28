// Generates tasteful SVG placeholder artwork (draped pleats + gold border + lily motif)
// into /public/images. Replace these files with real VEL photography when available.
// Run: npm run placeholders
import { mkdirSync, writeFileSync } from 'node:fs';

const OUT = new URL('../public/images/', import.meta.url);
mkdirSync(OUT, { recursive: true });

const GOLD = '#C5A46D';
const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)));
const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (h, t, to) => {
  const a = rgb(h), b = rgb(to);
  return '#' + a.map((v, i) => clamp(v + (b[i] - v) * t).toString(16).padStart(2, '0')).join('');
};
const light = (h, t) => mix(h, t, '#ffffff');
const dark = (h, t) => mix(h, t, '#000000');

const lily = (x, y, s, color, op = 1) =>
  `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${color}" stroke-opacity="${op}" stroke-width="1.5" stroke-linecap="round">` +
  `<path d="M0 0C-6-10-5-22 0-30C5-22 6-10 0 0Z"/><path d="M0 0C-12-6-20-16-22-24C-12-22-4-12 0 0Z"/><path d="M0 0C12-6 20-16 22-24C12-22 4-12 0 0Z"/></g>`;

const pleats = (w, h, seed, n) => {
  let s = '';
  const bw = w / n;
  for (let i = 0; i < n; i++) {
    const x = i * bw;
    const sway = Math.sin(seed * 1.7 + i * 0.9) * 34;
    const a = (0.05 + 0.17 * Math.abs(Math.sin(seed * 0.6 + i * 0.85))).toFixed(3);
    const tone = i % 2 ? '#ffffff' : '#000000';
    s += `<path d="M${x - 40} 0C${x + sway + 50} ${h * 0.3} ${x - sway - 10} ${h * 0.66} ${x + 24} ${h}L${x + bw + 24} ${h}C${x + bw - sway - 10} ${h * 0.66} ${x + bw + sway + 50} ${h * 0.3} ${x + bw - 40} 0Z" fill="${tone}" fill-opacity="${a}"/>`;
  }
  return s;
};

const wrap = (w, h, defs, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice">${defs}${body}</svg>`;

const baseDefs = (base) =>
  `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${light(base, 0.18)}"/><stop offset="1" stop-color="${dark(base, 0.12)}"/></linearGradient>` +
  `<radialGradient id="v" cx=".5" cy=".4" r=".85"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".24"/></radialGradient></defs>`;

function saree({ base, seed, detail = false, w = 900, h = 1200 }) {
  const border = dark(base, 0.46);
  const by = detail ? h * 0.36 : h * 0.82;
  const bh = detail ? h * 0.26 : h * 0.18;
  let band = `<rect x="-200" y="${by}" width="${w + 400}" height="${bh}" fill="${border}"/>`;
  [0.06, 0.12, 0.88, 0.94].forEach((f) => {
    band += `<rect x="-200" y="${by + bh * f}" width="${w + 400}" height="1.6" fill="${GOLD}" fill-opacity=".85"/>`;
  });
  const step = detail ? 130 : 86;
  for (let x = -40; x < w + 120; x += step) band += lily(x, by + bh * 0.66, detail ? 1.35 : 0.85, GOLD, 0.9);
  const body =
    `<rect width="${w}" height="${h}" fill="url(#g)"/>` +
    pleats(w, h, seed, detail ? 6 : 11) +
    (detail ? `<g transform="rotate(-14 ${w / 2} ${h / 2})">${band}</g>` : band) +
    `<rect width="${w}" height="${h}" fill="url(#v)"/>`;
  return wrap(w, h, baseDefs(base), body);
}

const write = (name, svg) => writeFileSync(new URL(name, OUT), svg);

// Product artwork: [id, base colour, seed]
const items = [
  ['vel-001', '#EFE6D3', 1], ['vel-002', '#CDB280', 2], ['vel-003', '#E9D2D3', 3], ['vel-004', '#2F4E40', 4],
  ['vel-005', '#D8A9A7', 5], ['vel-006', '#2F4E40', 6], ['vel-007', '#A9B8A2', 7], ['vel-008', '#222C3D', 8],
  ['vel-009', '#EFE6D3', 9], ['vel-010', '#E9D2D3', 10], ['vel-011', '#B5694F', 11], ['vel-012', '#CDB280', 12],
];
items.forEach(([id, base, seed]) => {
  write(`${id}-a.svg`, saree({ base, seed }));
  write(`${id}-b.svg`, saree({ base, seed: seed + 20, detail: true }));
});

write('story-large.svg', saree({ base: '#E9D2D3', seed: 31, w: 1000, h: 1300 }));
write('story-small.svg', saree({ base: '#A9B8A2', seed: 33, detail: true, w: 700, h: 900 }));
write('story-detail.svg', saree({ base: '#EFE6D3', seed: 35, detail: true, w: 1000, h: 1300 }));
write('collection-festive.svg', saree({ base: '#B5694F', seed: 41, w: 800, h: 1000 }));
write('collection-petals.svg', saree({ base: '#E9D2D3', seed: 43, detail: true, w: 800, h: 1000 }));
write('collection-classics.svg', saree({ base: '#A9B8A2', seed: 45, w: 800, h: 1000 }));
write('collection-evening.svg', saree({ base: '#222C3D', seed: 47, detail: true, w: 800, h: 1000 }));

console.log('Placeholder images written to public/images');
