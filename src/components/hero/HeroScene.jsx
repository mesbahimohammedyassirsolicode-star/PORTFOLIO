import { memo } from 'react';
import './hero-scene.css';

/* ==================================================================
   Hero scene — MYM (Make Your Move) black & yellow.

   A single inline SVG (desk, monitor with a readable editor, phone,
   books, mug and the central MYM cube) plus HTML tech-panel overlays
   that float on top and connect back to the cube with dashed lines.

   Everything is vector/CSS — no WebGL, no image assets — so it stays
   crisp at any size and cheap on low-power devices.
   ================================================================== */

/* MYM wordmark paths — identical to the site logo so the cube carries
   the real brand identity, un-distorted, with no font dependency. */
const M_PATH = 'M10 46V18h7.4l7 12.6L31.4 18H39v28h-6.4V28.6L25.8 40h-2.4L16.4 28.6V46H10Z';
const Y_PATH = 'M37 18h6.6l3.6 6.2 3.6-6.2h6.6l-7.3 11.4V46H44.8V29.4L37 18Z';

/* Map the 64×64 wordmark onto the front face of the cube.
   The face is the parallelogram A(372,190) → B(529,210) → D(374,330),
   so its edge vectors are AB = (157,20) and AD = (2,140). Insetting the
   logo to 10–90% of each edge keeps it centred and undistorted. */
const CUBE_LOGO = 'matrix(1.9625 0.25 0.025 1.75 387.9 206)';

/* Readable PHP shown on the monitor — tokens coloured with the MYM
   palette (yellow keywords, white class names, grey structure). */
const CODE = [
  [['final ', 'k'], ['class ', 'k'], ['BookingService', 'c']],
  [['{', 'p']],
  [['    public ', 'k'], ['function ', 'k'], ['confirm', 'f'], ['(', 'p'], ['Booking ', 't'], ['$b', 'v'], ['): ', 'p'], ['void', 'k']],
  [['    {', 'p']],
  [['        $this->', 'v'], ['mailer', 'f'], ['->send(', 'f'], ['$b->code', 'v'], [');', 'p']],
  [['    }', 'p']],
  [['}', 'p']],
];

const TOK = {
  k: '#E7C600', // keyword  — yellow
  c: '#FFFFFF', // class    — white
  f: '#FFE873', // function — light yellow
  t: '#C9CDD4', // type     — light grey
  v: '#9AA0A8', // variable — grey
  p: '#6B7280', // punctuation
};

const TREE = [
  ['app', 0],
  ['  Http', 0],
  ['    Controllers', 1],
  ['      Booking', 1],
  ['  Models', 0],
  ['    User.php', 0],
  ['  Services', 0],
  ['    Mailer.php', 0],
];

/* ---------------- Tech icons (MYM accents) ---------------- */
const ReactIcon = () => (
  <svg viewBox="-13 -13 26 26" className="hero-tech__ico" aria-hidden="true">
    <g fill="none" stroke="#E7C600" strokeWidth="1.05">
      <ellipse rx="11" ry="4.4" />
      <ellipse rx="11" ry="4.4" transform="rotate(60)" />
      <ellipse rx="11" ry="4.4" transform="rotate(120)" />
    </g>
    <circle r="1.9" fill="#E7C600" />
  </svg>
);

const PhpIcon = () => (
  <svg viewBox="0 0 64 40" className="hero-tech__ico hero-tech__ico--php" aria-hidden="true">
    <ellipse cx="32" cy="20" rx="29" ry="17" fill="#141414" stroke="#E7C600" strokeWidth="1.4" />
    <text
      x="32"
      y="26.5"
      textAnchor="middle"
      fontStyle="italic"
      fontWeight="800"
      fontSize="19"
      fontFamily="Plus Jakarta Sans, sans-serif"
      fill="#E7C600"
    >
      php
    </text>
  </svg>
);

const LaravelIcon = () => (
  <svg
    viewBox="0 0 48 48"
    className="hero-tech__ico"
    fill="none"
    stroke="#E7C600"
    strokeWidth="2.2"
    strokeLinejoin="round"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M5 7 L14 12 V31 L26 38 V44 L5 32 Z" />
    <path d="M14 12 L26 19 V38" />
    <path d="M26 19 L36 13 L44 18 V30 L35 35.5 L26 30 Z" />
    <path d="M36 13 V24 M26 19 L35 24 L44 18" />
  </svg>
);

const JsIcon = () => (
  <span className="hero-tech__ico hero-tech__ico--js" aria-hidden="true">JS</span>
);

const MysqlIcon = () => (
  <svg
    viewBox="0 0 48 48"
    className="hero-tech__ico"
    fill="none"
    stroke="#E7C600"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <ellipse cx="24" cy="13" rx="15" ry="6" />
    <path d="M9 13 V35 C9 38.3 15.7 41 24 41 C32.3 41 39 38.3 39 35 V13" />
    <path d="M9 24 C9 27.3 15.7 30 24 30 C32.3 30 39 27.3 39 24" />
  </svg>
);

const CARDS = [
  { id: 'react', name: 'React', catKey: 'hero_cat_react', Icon: ReactIcon },
  { id: 'php', name: 'PHP Native', catKey: 'hero_cat_php', Icon: PhpIcon },
  { id: 'laravel', name: 'Laravel', catKey: 'hero_cat_laravel', Icon: LaravelIcon },
  { id: 'js', name: 'JavaScript', catKey: 'hero_cat_js', Icon: JsIcon },
  { id: 'mysql', name: 'MySQL', catKey: 'hero_cat_mysql', Icon: MysqlIcon },
];

function HeroScene({ t, animate = true }) {
  return (
    <div
      className={`hero-stage${animate ? ' is-live' : ''}`}
      role="img"
      aria-label={t('hero_scene_label')}
    >
      <svg
        className="hero-svg"
        viewBox="0 0 880 780"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <radialGradient id="mymHeroGlow" cx="55%" cy="32%" r="60%">
            <stop offset="0" stopColor="#E7C600" stopOpacity=".22" />
            <stop offset="1" stopColor="#E7C600" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="mymHeroDeskTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1C1C1C" />
            <stop offset="1" stopColor="#0B0B0B" />
          </linearGradient>
          <linearGradient id="mymHeroDeskFront" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#111111" />
            <stop offset="1" stopColor="#070707" />
          </linearGradient>
          <linearGradient id="mymHeroFaceFront" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#262626" />
            <stop offset="1" stopColor="#101010" />
          </linearGradient>
          <linearGradient id="mymHeroFaceTop" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#5A5A5A" />
            <stop offset="1" stopColor="#2B2B2B" />
          </linearGradient>
          <linearGradient id="mymHeroFaceRight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#141414" />
            <stop offset="1" stopColor="#070707" />
          </linearGradient>
          <linearGradient id="mymHeroScreen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#121212" />
            <stop offset="1" stopColor="#080808" />
          </linearGradient>
          <linearGradient id="mymHeroPhone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#262626" />
            <stop offset="1" stopColor="#0C0C0C" />
          </linearGradient>
          <linearGradient id="mymHeroLeaf" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#1B241E" />
            <stop offset="1" stopColor="#33513F" />
          </linearGradient>
          <linearGradient id="mymHeroEdge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#E7C600" stopOpacity="0" />
            <stop offset=".45" stopColor="#E7C600" />
            <stop offset="1" stopColor="#FFE873" />
          </linearGradient>
          <filter id="mymHeroGlowF" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="mymHeroSoft" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <filter id="mymHeroBlur2">
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
        </defs>

        {/* ---------- Ambient light + city silhouette ---------- */}
        <ellipse cx="487" cy="250" rx="330" ry="285" fill="url(#mymHeroGlow)" />
        <g filter="url(#mymHeroBlur2)" opacity=".5">
          <rect x="250" y="150" width="60" height="400" fill="#101010" />
          <rect x="330" y="72" width="82" height="430" fill="#141414" />
          <rect x="540" y="14" width="112" height="360" fill="#151515" stroke="rgba(231,198,0,.10)" />
          <rect x="690" y="96" width="90" height="300" fill="#111111" />
          <rect x="796" y="44" width="84" height="380" fill="#141414" stroke="rgba(231,198,0,.08)" />
        </g>
        <rect x="344" y="76" width="76" height="3" fill="#E7C600" filter="url(#mymHeroGlowF)" opacity=".55" />

        {/* ---------- Desk: top surface + front edge ---------- */}
        <polygon points="40,540 300,505 880,440 880,722 150,625" fill="url(#mymHeroDeskTop)" />
        <polygon points="150,625 880,735 880,780 150,780" fill="url(#mymHeroDeskFront)" />
        <path d="M150 625 L880 735" stroke="url(#mymHeroEdge)" strokeWidth="2.6" filter="url(#mymHeroGlowF)" fill="none" />
        <path d="M356 674 L634 742" stroke="#E7C600" strokeWidth="2.6" strokeLinecap="round" opacity=".5" filter="url(#mymHeroGlowF)" fill="none" />
        <path d="M140 650 L205 662" stroke="#E7C600" strokeWidth="2.2" strokeLinecap="round" opacity=".5" filter="url(#mymHeroGlowF)" fill="none" />

        {/* ---------- Chair ---------- */}
        <g fill="#0B0B0B" stroke="rgba(231,198,0,.28)" strokeWidth="1.5" strokeLinejoin="round">
          <path d="M52 548 C72 536 112 548 130 578 L152 700 C120 724 82 718 64 690 Z" />
          <path d="M140 652 C204 640 274 652 320 702 L309 718 C252 692 192 686 150 702 Z" />
          <path d="M196 716 V770 M120 772 H268" fill="none" />
        </g>

        {/* ---------- Plant + lamp ---------- */}
        <g>
          <rect x="150" y="484" width="56" height="28" rx="9" fill="#141414" stroke="#3A3A3A" />
          <ellipse cx="178" cy="498" rx="42" ry="15" fill="#E7C600" opacity=".12" filter="url(#mymHeroSoft)" />
          <g fill="url(#mymHeroLeaf)" stroke="rgba(190,205,195,.14)" strokeWidth=".8">
            <path d="M126 500 C100 468 92 428 112 406 C126 440 132 470 126 500Z" />
            <path d="M126 500 C140 460 152 430 174 416 C176 450 152 482 126 500Z" />
            <path d="M126 500 C90 492 68 470 62 448 C94 450 116 470 126 500Z" />
            <path d="M126 500 C150 484 176 480 196 486 C178 502 150 508 126 500Z" />
            <path d="M126 500 C116 466 120 436 138 414 C146 444 142 476 126 500Z" />
          </g>
          <path d="M92 500 H162 L154 550 H100 Z" fill="#101010" stroke="#2A2A2A" />
        </g>

        {/* ---------- Monitor ---------- */}
        <polygon points="304,545 444,552 452,582 296,574" fill="#0B0B0B" stroke="#242424" />
        <polygon points="214,330 524,356 514,560 206,512" fill="#E7C600" opacity=".1" filter="url(#mymHeroSoft)" />
        <polygon points="222,336 528,362 518,556 214,508" fill="#050505" stroke="#2A2A2A" strokeWidth="2" />
        <g transform="matrix(1 0.098 -0.07 1.0235 234 340)">
          <rect width="285" height="170" fill="url(#mymHeroScreen)" />
          {/* title bar */}
          <rect width="285" height="14" fill="#181818" />
          <circle cx="8" cy="7" r="2.2" fill="#3A3A3A" />
          <circle cx="16" cy="7" r="2.2" fill="#3A3A3A" />
          <circle cx="24" cy="7" r="2.2" fill="#3A3A3A" />
          <text x="40" y="9.6" fontFamily="JetBrains Mono, monospace" fontSize="6.4" fill="#6B7280">
            MymService.php
          </text>
          {/* file tree */}
          <rect x="0" y="14" width="46" height="156" fill="#0E0E0E" />
          {TREE.map(([label, active], i) => (
            <text
              key={label}
              x="5"
              y={27 + i * 11}
              fontFamily="JetBrains Mono, monospace"
              fontSize="6.4"
              fill={active ? '#E7C600' : '#5A5A5A'}
            >
              {label}
            </text>
          ))}
          {/* code */}
          {CODE.map((segs, i) => (
            <text
              key={i}
              x="64"
              y={34 + i * 19}
              fontFamily="JetBrains Mono, monospace"
              fontSize="12.4"
            >
              {segs.map(([text, cls], j) => (
                <tspan key={j} fill={TOK[cls]}>
                  {text.replace(/ /g, '\u00A0')}
                </tspan>
              ))}
            </text>
          ))}
          {CODE.map((_, i) => (
            <text
              key={`ln-${i}`}
              x="54"
              y={34 + i * 19}
              textAnchor="end"
              fontFamily="JetBrains Mono, monospace"
              fontSize="7.6"
              fill="#3C3C3C"
            >
              {i + 1}
            </text>
          ))}
        </g>

        {/* ---------- Keyboard + mouse ---------- */}
        <g transform="matrix(1 0.2 -0.25 0.85 200 566)">
          <rect width="240" height="42" rx="3" fill="#121212" stroke="#2E2E2E" />
          {Array.from({ length: 4 }).map((_, r) =>
            Array.from({ length: 17 }).map((__, k) => (
              <rect
                key={`${r}-${k}`}
                x={6 + k * 13.5}
                y={5 + r * 9}
                width="11.5"
                height="6.5"
                rx="1.4"
                fill="#1B1B1B"
                stroke="#333333"
                strokeWidth=".5"
              />
            ))
          )}
        </g>
        <ellipse cx="486" cy="622" rx="30" ry="12" transform="rotate(14 486 622)" fill="#131313" stroke="#2E2E2E" />

        {/* ---------- Phone: simplified MYM app UI ---------- */}
        <ellipse cx="582" cy="574" rx="58" ry="12" fill="#E7C600" opacity=".16" filter="url(#mymHeroSoft)" />
        <g transform="translate(579 490) rotate(16)">
          <rect x="-40" y="-82" width="80" height="164" rx="14" fill="#070707" stroke="#4A4A4A" strokeWidth="2" />
          <rect x="-35" y="-76" width="70" height="152" rx="10" fill="url(#mymHeroPhone)" />
          <rect x="-12" y="-72" width="24" height="5" rx="2.5" fill="#070707" />
          {/* app header */}
          <text x="-28" y="-50" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="800" fontSize="14" fill="#FFFFFF">
            MYM
          </text>
          <text x="-28" y="-39" fontFamily="JetBrains Mono, monospace" fontSize="5.6" fill="#E7C600">
            MAKE YOUR MOVE
          </text>
          {/* primary button */}
          <rect x="-28" y="-33" width="56" height="15" rx="4" fill="#E7C600" />
          <rect x="-18" y="-28" width="26" height="4" rx="2" fill="#0D0D0D" />
          {/* list rows */}
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(0 ${-8 + i * 24})`}>
              <rect x="-28" y="0" width="56" height="19" rx="4" fill="#161616" />
              <rect x="-24" y="5" width="9" height="9" rx="2.5" fill="#E7C600" />
              <rect x="-12" y="6" width="30" height="3.4" rx="1.7" fill="#6B7280" />
              <rect x="-12" y="12" width="20" height="2.8" rx="1.4" fill="#3A3A3A" />
            </g>
          ))}
        </g>

        {/* ---------- Books ---------- */}
        <g transform="translate(684 486) rotate(8.5)">
          {['Clean Architecture', 'SOLID Principles', 'System Design'].map((label, i) => (
            <g key={label} transform={`translate(${i === 1 ? -4 : i === 2 ? 2 : 0} ${i * 34})`}>
              <rect x="-6" y="-14" width="196" height="34" rx="3" fill="#111111" stroke="#2A2A2A" />
              <rect x="184" y="-14" width="10" height="34" rx="2" fill="#1E1E1E" />
              <rect x="-6" y="-14" width="196" height="2" fill="#E7C600" opacity={i === 0 ? 0.9 : 0.3} />
              <text x="6" y="7" fontSize="13" fontFamily="Inter, sans-serif" fontWeight="500" fill="#D7D9DE" opacity=".92">
                {label}
              </text>
            </g>
          ))}
        </g>
        <path d="M674 700 L880 735" stroke="#E7C600" strokeWidth="1.8" filter="url(#mymHeroGlowF)" fill="none" opacity=".45" />

        {/* ---------- Mug ---------- */}
        <g>
          <ellipse cx="636" cy="672" rx="40" ry="8" fill="#000" opacity=".5" />
          <path d="M672 614 C700 612 700 650 672 650" fill="none" stroke="#2A2A2A" strokeWidth="7" />
          <rect x="598" y="598" width="76" height="74" rx="9" fill="#0E0E0E" stroke="#2A2A2A" strokeWidth="1.5" />
          <ellipse cx="636" cy="598" rx="38" ry="8" fill="#070707" stroke="#333333" />
          <text x="636" y="648" textAnchor="middle" fontSize="30" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">
            <tspan fill="#FFFFFF">M</tspan>
            <tspan fill="#E7C600">Y</tspan>
          </text>
        </g>

        {/* ---------- Connectors: tech panels → cube ---------- */}
        <g className="hero-connectors">
          <g fill="none" stroke="rgba(231,198,0,.5)" strokeWidth="1.4" strokeDasharray="2 5" strokeLinecap="round">
            <path d="M302 142 H346 V198 H372" />
            <path d="M249 250 H322 V272 H374" />
            <path d="M190 360 H262 V332 H374" />
            <path d="M658 168 H626 V162 H602" />
            <path d="M661 306 H632 V282 H602" />
          </g>
          <g fill="#E7C600">
            <circle cx="372" cy="198" r="2.6" />
            <circle cx="374" cy="272" r="2.6" />
            <circle cx="374" cy="332" r="2.6" />
            <circle cx="602" cy="162" r="2.6" />
            <circle cx="602" cy="282" r="2.6" />
          </g>
        </g>

        {/* ---------- Central MYM cube ---------- */}
        <g className="hero-cube">
          <ellipse className="hero-cube__glow" cx="487" cy="256" rx="170" ry="150" fill="#E7C600" opacity=".2" filter="url(#mymHeroSoft)" />
          {/* faces */}
          <polygon points="372,190 529,210 529,365 374,330" fill="url(#mymHeroFaceFront)" />
          <polygon points="372,190 444,142 602,158 529,210" fill="url(#mymHeroFaceTop)" />
          <polygon points="529,210 602,158 602,315 529,365" fill="url(#mymHeroFaceRight)" />
          {/* inner glass cube */}
          <g
            transform="translate(487 253) scale(.6) translate(-487 -253)"
            fill="none"
            stroke="#E7C600"
            strokeWidth="1.6"
            opacity=".3"
            strokeLinejoin="round"
          >
            <polygon points="372,190 529,210 529,365 374,330" />
            <polygon points="372,190 444,142 602,158 529,210" />
            <polygon points="529,210 602,158 602,315 529,365" />
          </g>
          {/* edge highlights — soft yellow glow under crisp brand edges */}
          <g fill="none" stroke="#E7C600" strokeWidth="6" strokeLinejoin="round" opacity=".3" filter="url(#mymHeroGlowF)">
            <polygon points="372,190 529,210 529,365 374,330" />
            <polygon points="372,190 444,142 602,158 529,210" />
            <polygon points="529,210 602,158 602,315 529,365" />
          </g>
          <g fill="none" stroke="#E7C600" strokeWidth="2.2" strokeLinejoin="round">
            <polygon points="372,190 529,210 529,365 374,330" />
            <polygon points="372,190 444,142 602,158 529,210" />
            <polygon points="529,210 602,158 602,315 529,365" />
          </g>
          {/* MYM wordmark, projected onto the front face */}
          <g transform={CUBE_LOGO}>
            <path d={M_PATH} fill="#FFFFFF" />
            <path d={Y_PATH} fill="#E7C600" />
          </g>
        </g>
      </svg>

      {/* ---------- Floating tech panels ---------- */}
      {CARDS.map(({ id, name, catKey, Icon }) => (
        <div key={id} className={`hero-tech hero-tech--${id}`} aria-hidden="true">
          <Icon />
          <span className="hero-tech__text">
            <strong>{name}</strong>
            <small>{t(catKey)}</small>
          </span>
        </div>
      ))}
    </div>
  );
}

export default memo(HeroScene);
