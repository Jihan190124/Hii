import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { SITE } from '../config/site.js';

// Three cloth colours, taken from sarees rather than from a screen: madder red, botanical green, indigo.
const RED = '#7A1E2C';
const GREEN = '#243D32';
const BLUE = '#1E2D5A';
const GOLD = '#C5A46D';

// Hand-placed pleat strips (same construction as the placeholder artwork), computed once.
function pleats(seed, n, x0, w, h = 1000) {
  const bw = w / n;
  return Array.from({ length: n }, (_, i) => {
    const x = x0 + i * bw;
    const sway = Math.sin(seed * 1.7 + i * 0.9) * 34;
    return {
      d: `M${x - 40} 0C${x + sway + 50} ${h * 0.3} ${x - sway - 10} ${h * 0.66} ${x + 24} ${h}L${x + bw + 24} ${h}C${x + bw - sway - 10} ${h * 0.66} ${x + bw + sway + 50} ${h * 0.3} ${x + bw - 40} 0Z`,
      fill: i % 2 ? '#fff' : '#000',
      opacity: 0.05 + 0.17 * Math.abs(Math.sin(seed * 0.6 + i * 0.85)),
    };
  });
}
const LAYER_FRONT = pleats(3.2, 16, -200, 1400);
const LAYER_BACK = pleats(7.1, 11, -200, 1400);

const goToShop = () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('shop')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
};

function Words({ title, text, primary, titleAs: Title = 'h2' }) {
  return (
    <>
      <Title className="vel-scene__title">{title}</Title>
      <p className="vel-scene__text">{text}</p>
      <div className="vel-scene__actions">{primary}</div>
    </>
  );
}

const ctaShop = (label) => (
  <button type="button" className="vel-btn vel-btn--light" onClick={goToShop}>{label}</button>
);
const ctaStory = (
  <Link to="/our-story" className="vel-btn vel-btn--outline-light">Our Story</Link>
);

// Reduced motion: no scroll-linked colour change, just the opening statement on one calm colour.
function StaticScene() {
  return (
    <section className="vel-scene vel-scene--static" style={{ background: GREEN }} aria-label="Introduction">
      <div className="vel-scene__chapter vel-scene__chapter--static">
        <Words
          titleAs="h1"
          title={SITE.tagline}
          text="Discover sarees that celebrate the beauty of every moment."
          primary={<>{ctaShop('Discover the Collection')}{ctaStory}</>}
        />
      </div>
    </section>
  );
}

function Chapter({ progress, range, children }) {
  const [a, b, c, d] = range;
  const opacity = useTransform(progress, [a, b, c, d], [0, 1, 1, 0]);
  const y = useTransform(progress, [a, b, c, d], [22, 0, 0, -22]);
  const visibility = useTransform(progress, (v) => (v > a && v < d ? 'visible' : 'hidden'));
  return (
    <motion.div className="vel-scene__chapter" style={{ opacity, y, visibility }}>
      {children}
    </motion.div>
  );
}

function Tick({ progress, from, to }) {
  const scaleY = useTransform(progress, [from, to], [0, 1], { clamp: true });
  return (
    <span className="vel-scene__tick">
      <motion.span style={{ scaleY }} />
    </span>
  );
}

function AnimatedScene() {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Hold each colour, then wash into the next.
  const background = useTransform(p, [0, 0.24, 0.4, 0.58, 0.74, 1], [RED, RED, GREEN, GREEN, BLUE, BLUE]);
  const frontX = useTransform(p, [0, 1], [0, -150]);
  const backX = useTransform(p, [0, 1], [-60, 90]);
  const sheenX = useTransform(p, [0, 1], [-500, 1300]);
  const lilyY = useTransform(p, [0, 1], [90, -160]);

  return (
    <section ref={ref} className="vel-scene" aria-label="Introduction">
      <motion.div className="vel-scene__stage" style={{ background }}>
        <svg className="vel-scene__cloth" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="vel-sheen" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#fff" stopOpacity="0.13" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.g style={{ x: backX }} opacity="0.7">
            {LAYER_BACK.map((s, i) => <path key={i} d={s.d} fill={s.fill} fillOpacity={s.opacity} />)}
          </motion.g>
          <motion.g style={{ x: frontX }}>
            {LAYER_FRONT.map((s, i) => <path key={i} d={s.d} fill={s.fill} fillOpacity={s.opacity} />)}
          </motion.g>
          <motion.rect y="0" width="360" height="1000" fill="url(#vel-sheen)" style={{ x: sheenX }} />
          <motion.path
            d="M-50 830C240 700 430 920 690 770S980 650 1060 700"
            fill="none"
            stroke={GOLD}
            strokeWidth="1.6"
            strokeOpacity="0.85"
            style={{ pathLength: p }}
          />
          <motion.g style={{ y: lilyY }} fill="none" stroke={GOLD} strokeOpacity="0.28" strokeWidth="1.4" strokeLinecap="round">
            <g transform="translate(790 560) scale(8)">
              <path d="M0 0C-6-10-5-22 0-30C5-22 6-10 0 0Z" />
              <path d="M0 0C-12-6-20-16-22-24C-12-22-4-12 0 0Z" />
              <path d="M0 0C12-6 20-16 22-24C12-22 4-12 0 0Z" />
            </g>
          </motion.g>
        </svg>
        <div className="vel-scene__shade" aria-hidden="true" />

        <div className="vel-scene__chapters">
          <Chapter progress={p} range={[-0.001, 0, 0.2, 0.3]}>
            <Words
              titleAs="h1"
              title={SITE.tagline}
              text="Discover sarees that celebrate the beauty of every moment."
              primary={<>{ctaShop('Discover the Collection')}{ctaStory}</>}
            />
          </Chapter>
          <Chapter progress={p} range={[0.34, 0.44, 0.56, 0.66]}>
            <Words
              title="Inspired by the lily."
              text="Simplicity, the richness of Indian textiles, and the moments that make every drape meaningful."
              primary={<Link to="/our-story" className="vel-btn vel-btn--outline-light">Discover Our Story</Link>}
            />
          </Chapter>
          <Chapter progress={p} range={[0.7, 0.8, 1, 1.001]}>
            <Words
              title="Every drape has its colour."
              text="Keep scrolling. The collection begins just below."
              primary={ctaShop('Enter the shop')}
            />
          </Chapter>
        </div>

        <div className="vel-scene__rail" aria-hidden="true">
          <Tick progress={p} from={0} to={0.33} />
          <Tick progress={p} from={0.33} to={0.66} />
          <Tick progress={p} from={0.66} to={1} />
        </div>
        <button type="button" className="vel-scene__skip" onClick={goToShop}>Skip to shop</button>
      </motion.div>
    </section>
  );
}

export default function FabricScene() {
  const reduce = useReducedMotion();
  return reduce ? <StaticScene /> : <AnimatedScene />;
}
