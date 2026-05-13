import type { RoleFilter } from "@/data/projects";

function AiMlMockup({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="ai-bg" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor={c} stopOpacity="0.16" />
          <stop offset="100%" stopColor={c} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ai-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c} stopOpacity="0.24" />
          <stop offset="100%" stopColor={c} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="#060c18" />
      <rect width="400" height="220" fill="url(#ai-bg)" />

      {/* Grid */}
      {[50, 95, 140, 185].map(y => <line key={y} x1="28" y1={y} x2="295" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />)}
      {[75, 145, 215].map(x => <line key={x} x1={x} y1="20" x2={x} y2="195" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />)}

      {/* Area fill under curve */}
      <polygon points="40,195 75,178 115,158 155,128 200,100 240,78 280,62 295,56 295,195" fill="url(#ai-fill)" />

      {/* Loss curve */}
      <polyline points="40,195 75,178 115,158 155,128 200,100 240,78 280,62 295,56" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Curve dots */}
      {[[75,178],[155,128],[240,78],[295,56]].map(([cx,cy],i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="6" fill="#060c18" stroke={c} strokeWidth="2" />
          <circle cx={cx} cy={cy} r="2.5" fill={c} />
        </g>
      ))}

      {/* Axis lines */}
      <line x1="28" y1="195" x2="295" y2="195" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="28" y1="18" x2="28" y2="195" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

      {/* Neural network (right panel) */}
      <g transform="translate(315, 20)">
        {[18, 42, 66].map((y,i) => <circle key={i} cx="10" cy={y} r="5" fill={c} fillOpacity="0.55" />)}
        {[8, 28, 50, 70].map((y,i) => <circle key={i} cx="36" cy={y} r="5" fill={c} fillOpacity="0.35" />)}
        {[22, 52].map((y,i) => <circle key={i} cx="62" cy={y} r="5" fill={c} fillOpacity="0.7" />)}
        {[18,42,66].flatMap((y1,a) => [8,28,50,70].map((y2,b) => (
          <line key={`${a}${b}`} x1="15" y1={y1} x2="31" y2={y2} stroke={c} strokeWidth="0.7" strokeOpacity="0.18" />
        )))}
        {[8,28,50,70].flatMap((y1,a) => [22,52].map((y2,b) => (
          <line key={`${a}${b}`} x1="41" y1={y1} x2="57" y2={y2} stroke={c} strokeWidth="0.7" strokeOpacity="0.28" />
        )))}
        {/* Output label rects */}
        <rect x="70" y="10" width="26" height="9" rx="3" fill={c} fillOpacity="0.15" />
        <rect x="70" y="40" width="26" height="9" rx="3" fill={c} fillOpacity="0.08" />

        {/* Scatter below net */}
        {[[2,100],[18,115],[8,128],[25,140],[14,155],[28,168]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="3.5" fill={c} fillOpacity={0.25 + i * 0.07} />
        ))}
      </g>

      {/* Metric badges */}
      {[
        { x: 38, label: "AUC", w: 34 },
        { x: 118, label: "Loss", w: 28 },
        { x: 196, label: "Acc", w: 30 },
      ].map(({ x, w }) => (
        <g key={x}>
          <rect x={x} y="202" width="68" height="14" rx="4" fill={c} fillOpacity="0.1" stroke={c} strokeWidth="1" strokeOpacity="0.25" />
          <rect x={x + 8} y="207" width={w} height="4" rx="2" fill={c} fillOpacity="0.55" />
          <rect x={x + 8 + w + 4} y="207" width="16" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
        </g>
      ))}
    </svg>
  );
}

function FullStackMockup({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="fs-bg" cx="25%" cy="20%" r="65%">
          <stop offset="0%" stopColor={c} stopOpacity="0.09" />
          <stop offset="100%" stopColor={c} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="220" fill="#050e0a" />
      <rect width="400" height="220" fill="url(#fs-bg)" />

      {/* Browser window */}
      <rect x="12" y="10" width="376" height="202" rx="10" fill="#0a0f0d" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />

      {/* Chrome bar */}
      <rect x="12" y="10" width="376" height="28" rx="10" fill="rgba(255,255,255,0.05)" />
      <rect x="12" y="28" width="376" height="10" fill="rgba(255,255,255,0.05)" />
      <circle cx="30" cy="24" r="4.5" fill="#ff5f57" fillOpacity="0.85" />
      <circle cx="46" cy="24" r="4.5" fill="#febc2e" fillOpacity="0.85" />
      <circle cx="62" cy="24" r="4.5" fill="#28c840" fillOpacity="0.85" />
      <rect x="82" y="18" width="200" height="12" rx="6" fill="rgba(255,255,255,0.07)" />
      <rect x="92" y="22" width="70" height="4" rx="2" fill="rgba(255,255,255,0.15)" />

      {/* Sidebar */}
      <rect x="12" y="38" width="76" height="174" fill="rgba(255,255,255,0.025)" />
      {/* Logo area */}
      <rect x="21" y="47" width="14" height="14" rx="3.5" fill={c} fillOpacity="0.28" />
      <rect x="39" y="51" width="38" height="6" rx="2" fill="rgba(255,255,255,0.12)" />
      {/* Nav items */}
      {[72, 90, 108, 126, 144, 162, 180].map((y, i) => (
        <g key={i}>
          {i === 0 && <rect x="12" y={y} width="3" height="12" fill={c} />}
          <rect x="21" y={y} width={i === 0 ? 56 : 42} height="12" rx="3"
            fill={i === 0 ? c : "transparent"} fillOpacity={i === 0 ? 0.14 : 0}
          />
          <rect x="21" y={y + 2} width="8" height="8" rx="2" fill={i === 0 ? c : "rgba(255,255,255,0.18)"} fillOpacity={i === 0 ? 0.6 : 1} />
          <rect x="33" y={y + 4} width={i === 0 ? 30 : 22} height="4" rx="1.5" fill={i === 0 ? c : "rgba(255,255,255,0.1)"} fillOpacity={i === 0 ? 0.5 : 1} />
        </g>
      ))}

      {/* Main content */}
      <rect x="98" y="46" width="118" height="9" rx="3" fill="rgba(255,255,255,0.14)" />
      <rect x="98" y="59" width="78" height="5" rx="2" fill="rgba(255,255,255,0.07)" />

      {/* Stat cards */}
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={98 + i * 96} y="74" width="88" height="46" rx="6"
            fill="rgba(255,255,255,0.03)"
            stroke={i === 0 ? c : "rgba(255,255,255,0.07)"}
            strokeWidth="1" strokeOpacity="0.3"
          />
          <rect x={108 + i * 96} y="83" width="22" height="14" rx="3" fill={c} fillOpacity={i === 0 ? 0.22 : 0.06} />
          <rect x={134 + i * 96} y="84" width="34" height="6" rx="2" fill="rgba(255,255,255,0.14)" />
          <rect x={108 + i * 96} y="101" width={52 - i * 6} height="5" rx="1.5" fill="rgba(255,255,255,0.08)" />
        </g>
      ))}

      {/* Table */}
      <rect x="98" y="128" width="280" height="11" rx="3" fill={c} fillOpacity="0.07" />
      {[0,1,2,3].map(col => (
        <rect key={col} x={102 + col * 70} y="131" width={col === 0 ? 55 : 44} height="5" rx="1.5"
          fill={col === 0 ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)"} />
      ))}
      {[144, 159, 174].map((y, i) => (
        <g key={i}>
          <rect x="98" y={y} width="280" height="11" rx="2" fill={i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent"} />
          <rect x="102" y={y + 2} width="50" height="7" rx="1.5" fill="rgba(255,255,255,0.1)" />
          <rect x="172" y={y + 2} width="36" height="7" rx="1.5" fill={i === 1 ? c : "rgba(255,255,255,0.07)"} fillOpacity={i === 1 ? 0.28 : 1} />
          <rect x="218" y={y + 2} width="28" height="7" rx="1.5" fill="rgba(255,255,255,0.07)" />
        </g>
      ))}

      {/* Status bar */}
      <rect x="98" y="192" width="280" height="18" rx="6" fill={c} fillOpacity="0.07" stroke={c} strokeWidth="1" strokeOpacity="0.2" />
      <circle cx="113" cy="201" r="4" fill={c} fillOpacity="0.45" />
      <rect x="122" y="198" width="45" height="6" rx="2" fill={c} fillOpacity="0.38" />
      <rect x="328" y="198" width="38" height="6" rx="2" fill="rgba(255,255,255,0.14)" />
    </svg>
  );
}

function SystemsMockup({ c }: { c: string }) {
  const rows = [
    { in: 0,  segs: [[c, 18], ["rgba(255,255,255,0.65)", 60], [c, 28], ["#fbbf24", 32]] },
    { in: 0,  segs: [["rgba(255,255,255,0.25)", 8]] },
    { in: 16, segs: [[c, 16], ["rgba(255,255,255,0.6)", 36], ["rgba(255,255,255,0.28)", 12], ["#fbbf24", 30]] },
    { in: 16, segs: [[c, 16], ["rgba(255,255,255,0.6)", 28], ["rgba(255,255,255,0.28)", 12], ["rgba(255,255,255,0.45)", 76]] },
    { in: 16, segs: [[c, 16], ["rgba(255,255,255,0.6)", 40], ["rgba(255,255,255,0.28)", 8]] },
    { in: 32, segs: [["rgba(255,255,255,0.38)", 88], [c, 20], ["rgba(255,255,255,0.28)", 8]] },
    { in: 32, segs: [["rgba(255,255,255,0.28)", 48]] },
    { in: 16, segs: [[c, 14], ["rgba(255,255,255,0.55)", 16]] },
    { in: 0,  segs: [["rgba(255,255,255,0.25)", 8]] },
    { in: 0,  segs: [] },
    { in: 0,  segs: [[c, 22], ["rgba(255,255,255,0.55)", 34], ["rgba(255,255,255,0.28)", 8], ["rgba(255,255,255,0.45)", 58]] },
    { in: 0,  segs: [["rgba(255,255,255,0.25)", 8]] },
    { in: 16, segs: [["#fbbf24", 28], ["rgba(255,255,255,0.4)", 12]] },
  ];

  return (
    <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="sys-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={c} stopOpacity="0.07" />
          <stop offset="100%" stopColor={c} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="220" fill="#080603" />
      <rect width="400" height="220" fill="url(#sys-bg)" />

      {/* Editor frame */}
      <rect x="10" y="8" width="380" height="204" rx="9" fill="#0d0b09" stroke="rgba(255,255,255,0.09)" strokeWidth="1" />

      {/* Title bar */}
      <rect x="10" y="8" width="380" height="26" rx="9" fill="rgba(255,255,255,0.055)" />
      <rect x="10" y="24" width="380" height="10" fill="rgba(255,255,255,0.055)" />
      <circle cx="28" cy="21" r="4.5" fill="#ff5f57" fillOpacity="0.85" />
      <circle cx="44" cy="21" r="4.5" fill="#febc2e" fillOpacity="0.85" />
      <circle cx="60" cy="21" r="4.5" fill="#28c840" fillOpacity="0.85" />

      {/* Tabs */}
      <rect x="82" y="11" width="78" height="20" rx="4" fill="rgba(255,255,255,0.08)" />
      <rect x="86" y="15" width="50" height="6" rx="2" fill={c} fillOpacity="0.4" />
      <rect x="164" y="11" width="65" height="20" rx="4" fill="rgba(255,255,255,0.03)" />
      <rect x="168" y="15" width="42" height="6" rx="2" fill="rgba(255,255,255,0.15)" />

      {/* Gutter */}
      <rect x="10" y="34" width="30" height="165" fill="rgba(0,0,0,0.25)" />

      {/* Active line highlight */}
      <rect x="40" y="68" width="340" height="16" fill={c} fillOpacity="0.065" />

      {/* Code rows */}
      {rows.map((row, i) => {
        const y = 42 + i * 15;
        let x = 46 + row.in;
        return (
          <g key={i}>
            <rect x="14" y={y + 3} width="18" height="8" rx="2"
              fill={i === 2 ? c : "rgba(255,255,255,0.11)"}
              fillOpacity={i === 2 ? 0.38 : 1}
            />
            {row.segs.map(([col, w], j) => {
              const el = <rect key={j} x={x} y={y + 4} width={w as number} height="7" rx="2" fill={col as string} />;
              x += (w as number) + 5;
              return el;
            })}
          </g>
        );
      })}

      {/* Minimap */}
      <rect x="368" y="34" width="22" height="165" fill="rgba(255,255,255,0.02)" />
      {[0,1,2,3,4,5,6,7,8,9].map(i => (
        <rect key={i} x="372" y={38 + i * 16} width={6 + (i % 3) * 4} height="4" rx="1.5" fill={c} fillOpacity="0.13" />
      ))}
      <rect x="368" y="34" width="22" height="46" fill={c} fillOpacity="0.07" stroke={c} strokeWidth="0.5" strokeOpacity="0.3" />

      {/* Status bar */}
      <rect x="10" y="199" width="380" height="13" rx="5" fill="rgba(255,255,255,0.035)" />
      <rect x="18" y="202" width="5" height="7" rx="1" fill={c} fillOpacity="0.5" />
      <rect x="26" y="202" width="32" height="7" rx="2" fill="rgba(255,255,255,0.14)" />
      <rect x="348" y="202" width="36" height="7" rx="2" fill="rgba(255,255,255,0.1)" />
    </svg>
  );
}

function MobileMockup({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="mob-bg" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={c} stopOpacity="0.11" />
          <stop offset="100%" stopColor={c} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="220" fill="#0c0714" />
      <rect width="400" height="220" fill="url(#mob-bg)" />

      {/* Phone 1 — left/center */}
      <rect x="62" y="8" width="112" height="204" rx="18" fill="#100e1a" stroke={c} strokeWidth="1.5" strokeOpacity="0.38" />
      <rect x="174" y="58" width="3" height="20" rx="1.5" fill={c} fillOpacity="0.35" />
      <rect x="59" y="66" width="3" height="16" rx="1.5" fill="rgba(255,255,255,0.14)" />
      <rect x="59" y="87" width="3" height="16" rx="1.5" fill="rgba(255,255,255,0.14)" />

      {/* Screen */}
      <rect x="68" y="20" width="100" height="180" rx="12" fill="#0d0b18" />
      {/* Notch */}
      <rect x="100" y="20" width="36" height="10" rx="5" fill="#100e1a" />

      {/* Status dots */}
      <circle cx="78" cy="28" r="2" fill="rgba(255,255,255,0.2)" />
      <circle cx="158" cy="28" r="2" fill={c} fillOpacity="0.5" />

      {/* App header */}
      <rect x="68" y="34" width="100" height="22" fill={c} fillOpacity="0.13" />
      <rect x="76" y="41" width="48" height="7" rx="2" fill={c} fillOpacity="0.55" />
      <rect x="154" y="41" width="10" height="7" rx="2" fill={c} fillOpacity="0.35" />

      {/* Search */}
      <rect x="74" y="62" width="88" height="11" rx="5.5" fill="rgba(255,255,255,0.07)" />
      <rect x="80" y="65" width="32" height="5" rx="2" fill="rgba(255,255,255,0.12)" />

      {/* Album items */}
      {[80, 97, 114, 131, 148, 165].map((y, i) => (
        <g key={i}>
          <rect x="74" y={y} width="88" height="13" rx="4" fill="rgba(255,255,255,0.04)" />
          <rect x="78" y={y + 2} width="16" height="9" rx="3" fill={c} fillOpacity={0.14 + i * 0.05} />
          <rect x="98" y={y + 4} width={28 + i * 3} height="5" rx="1.5" fill="rgba(255,255,255,0.15)" />
          <rect x="154" y={y + 4} width="6" height="5" rx="1.5" fill="rgba(255,255,255,0.08)" />
        </g>
      ))}

      {/* Bottom nav */}
      <rect x="68" y="183" width="100" height="17" rx="6" fill="#100e1a" />
      <line x1="68" y1="183" x2="168" y2="183" stroke={c} strokeWidth="0.8" strokeOpacity="0.18" />
      {[0,1,2,3].map(i => (
        <rect key={i} x={75 + i * 22} y="187" width="14" height="10" rx="3"
          fill={i === 0 ? c : "rgba(255,255,255,0.1)"}
          fillOpacity={i === 0 ? 0.28 : 1}
        />
      ))}
      {/* Active indicator dot */}
      <rect x="80" y="199" width="4" height="2" rx="1" fill={c} fillOpacity="0.5" />

      {/* Phone 2 — right, slightly behind */}
      <rect x="196" y="24" width="108" height="190" rx="15" fill="#0e0c1a" stroke={c} strokeWidth="1" strokeOpacity="0.2" />
      <rect x="202" y="34" width="96" height="172" rx="9" fill="#0b0a16" />

      {/* Photo grid */}
      {[0,1].flatMap(col => [0,1,2,3].map(row => (
        <rect key={`${col}-${row}`}
          x={205 + col * 50} y={37 + row * 44} width="45" height="39" rx="5"
          fill={c} fillOpacity={0.04 + (col + row) * 0.035}
        />
      )))}

      {/* Selected photo */}
      <rect x="205" y="37" width="45" height="39" rx="5" fill={c} fillOpacity="0.16" stroke={c} strokeWidth="1.5" strokeOpacity="0.5" />
      <circle cx="227" cy="56" r="7" fill={c} fillOpacity="0.22" />
      <rect x="223" y="53" width="8" height="6" rx="1.5" fill={c} fillOpacity="0.6" />

      {/* Floating tag */}
      <rect x="256" y="47" width="34" height="11" rx="5.5" fill={c} fillOpacity="0.18" stroke={c} strokeWidth="1" strokeOpacity="0.35" />
      <rect x="262" y="51" width="22" height="3.5" rx="1.5" fill={c} fillOpacity="0.55" />

      {/* Label beneath */}
      <rect x="205" y="213" width="96" height="7" rx="2" fill={c} fillOpacity="0.1" />
    </svg>
  );
}

const MOCKUP_MAP: Record<RoleFilter, (props: { c: string }) => React.ReactElement> = {
  "ai-ml": AiMlMockup,
  "full-stack": FullStackMockup,
  "systems": SystemsMockup,
  "mobile": MobileMockup,
};

interface ProjectMockupProps {
  role: RoleFilter;
  accentColor: string;
}

export function ProjectMockup({ role, accentColor }: ProjectMockupProps) {
  const Mockup = MOCKUP_MAP[role];
  return <Mockup c={accentColor} />;
}
