import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const GOLD = "#c8a84b";
const BLUE = "#3d8bd7";
const DEEP_NAVY = "#020813";
const TAU = Math.PI * 2;

const loopSin = (frame: number, duration: number, phase = 0) =>
  Math.sin((frame / duration) * TAU + phase);

const loopCos = (frame: number, duration: number, phase = 0) =>
  Math.cos((frame / duration) * TAU + phase);

const dashOffset = (progress: number, distance: number, direction = 1) =>
  direction * progress * distance;

const nodePositions = [
  { x: 1290, y: 92, delay: 0.05, size: 6 },
  { x: 1014, y: 522, delay: 0.2, size: 7 },
  { x: 1290, y: 802, delay: 0.35, size: 6 },
  { x: 895, y: 523, delay: 0.5, size: 5 },
  { x: 1486, y: 587, delay: 0.65, size: 6 },
  { x: 756, y: 520, delay: 0.8, size: 5 },
];

const OrbitLayer = ({
  progress,
  lineBreath,
  idPrefix,
}: {
  progress: number;
  lineBreath: number;
  idPrefix: string;
}) => {
  const orbitOpacity = 0.42 + lineBreath * 0.08;

  return (
    <svg
      viewBox="0 0 1920 1080"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "visible",
        mixBlendMode: "screen",
      }}
    >
      <defs>
        <radialGradient id={`${idPrefix}-hub-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#73b9ff" stopOpacity="0.26" />
          <stop offset="44%" stopColor="#1f67aa" stopOpacity="0.12" />
          <stop offset="100%" stopColor={DEEP_NAVY} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${idPrefix}-blue-trail`} x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor={BLUE} stopOpacity="0" />
          <stop offset="50%" stopColor="#8fd0ff" stopOpacity="0.62" />
          <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-gold-trail`} x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0" />
          <stop offset="50%" stopColor="#f3d989" stopOpacity="0.54" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </linearGradient>
        <filter id={`${idPrefix}-soft-glow`}>
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse
        cx="1192"
        cy="520"
        rx="456"
        ry="382"
        fill={`url(#${idPrefix}-hub-glow)`}
        opacity={0.42 + lineBreath * 0.16}
      />

      {[
        { cx: 1196, cy: 520, rx: 520, ry: 122, rotate: -8, color: GOLD, width: 1.2, dash: "8 26", dir: 1 },
        { cx: 1198, cy: 520, rx: 600, ry: 182, rotate: 14, color: BLUE, width: 1.1, dash: "9 34", dir: -1 },
        { cx: 1190, cy: 514, rx: 382, ry: 382, rotate: 0, color: "#7fc4ff", width: 1, dash: "5 34", dir: 1 },
        { cx: 1190, cy: 516, rx: 394, ry: 240, rotate: 76, color: GOLD, width: 0.9, dash: "4 30", dir: -1 },
        { cx: 1186, cy: 524, rx: 334, ry: 442, rotate: -33, color: "#8dcaff", width: 0.8, dash: "5 36", dir: 1 },
      ].map((orbit, index) => (
        <ellipse
          key={index}
          cx={orbit.cx}
          cy={orbit.cy}
          rx={orbit.rx}
          ry={orbit.ry}
          fill="none"
          stroke={orbit.color}
          strokeWidth={orbit.width}
          strokeOpacity={orbitOpacity * (index < 2 ? 0.56 : 0.32)}
          strokeDasharray={orbit.dash}
          strokeDashoffset={dashOffset(progress, 120, orbit.dir)}
          transform={`rotate(${orbit.rotate} ${orbit.cx} ${orbit.cy})`}
        />
      ))}

      {[
        { d: "M 210 680 C 560 594, 792 668, 1014 523 S 1434 344, 1772 432", stroke: `url(#${idPrefix}-blue-trail)`, offset: 340 },
        { d: "M 585 772 C 812 660, 1005 708, 1242 603 S 1544 496, 1788 644", stroke: `url(#${idPrefix}-gold-trail)`, offset: -250 },
        { d: "M 696 392 C 894 500, 1054 386, 1220 280 S 1496 214, 1696 318", stroke: `url(#${idPrefix}-blue-trail)`, offset: -210 },
      ].map((trail, index) => (
        <path
          key={trail.d}
          d={trail.d}
          fill="none"
          stroke={trail.stroke}
          strokeWidth={index === 0 ? 3.2 : 2.4}
          strokeLinecap="round"
          strokeOpacity={0.18 + lineBreath * 0.1}
          strokeDasharray="92 520"
          strokeDashoffset={trail.offset + dashOffset(progress, 420, index === 1 ? -1 : 1)}
          filter={`url(#${idPrefix}-soft-glow)`}
        />
      ))}

      {nodePositions.map((node) => {
        const pulse = 0.5 + 0.5 * Math.sin((progress + node.delay) * TAU);
        return (
          <g key={`${node.x}-${node.y}`} opacity={0.54 + pulse * 0.36}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size + pulse * 5}
              fill={GOLD}
              opacity={0.08 + pulse * 0.1}
              filter={`url(#${idPrefix}-soft-glow)`}
            />
            <circle cx={node.x} cy={node.y} r={node.size} fill="#f5d983" opacity={0.78} />
            <circle cx={node.x} cy={node.y} r={node.size + 3} fill="none" stroke={GOLD} strokeOpacity={0.42} />
          </g>
        );
      })}
    </svg>
  );
};

export const ParagonUmbrellaLoop = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const loopFrame = frame % durationInFrames;
  const progress = loopFrame / durationInFrames;

  const reveal = interpolate(frame, [0, 42], [0.92, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeReady = interpolate(frame, [durationInFrames - 30, durationInFrames - 1], [1, 0.92], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const breathing = 0.5 - loopCos(loopFrame, durationInFrames) * 0.5;
  const scale = 1 + breathing * 0.04;
  const driftY = loopSin(loopFrame, durationInFrames, -Math.PI / 2) * 10;
  const driftX = loopSin(loopFrame, durationInFrames, Math.PI * 0.35) * 5;
  const lineBreath = 0.5 + loopSin(loopFrame, durationInFrames, Math.PI * 0.2) * 0.5;
  const imageOpacity = reveal * fadeReady;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: DEEP_NAVY,
        overflow: "hidden",
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 72% 47%, rgba(47, 112, 178, 0.28) 0%, rgba(3, 13, 28, 0.46) 38%, rgba(1, 6, 15, 0.98) 82%), linear-gradient(135deg, #020712 0%, #061225 48%, #02060f 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: -56,
          transform: `translate3d(${driftX * -0.35}px, ${driftY * -0.25}px, 0) scale(${1.01 + lineBreath * 0.01})`,
          opacity: 0.72 * reveal,
          filter: "blur(0.2px)",
        }}
      >
        <OrbitLayer progress={progress} lineBreath={lineBreath} idPrefix="back" />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translate3d(${driftX}px, ${driftY}px, 0) scale(${scale})`,
          transformOrigin: "61% 51%",
          opacity: imageOpacity,
          filter: `saturate(${1.03 + lineBreath * 0.04}) contrast(1.04) drop-shadow(0 28px 72px rgba(20, 92, 160, ${0.12 + lineBreath * 0.08}))`,
        }}
      >
        <Img
          src={staticFile("assets/visual2.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <AbsoluteFill
        style={{
          transform: `translate3d(${driftX * 0.28}px, ${driftY * 0.18}px, 0)`,
          opacity: 0.66 * reveal * fadeReady,
        }}
      >
        <OrbitLayer progress={(progress + 0.08) % 1} lineBreath={lineBreath} idPrefix="front" />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(2, 8, 19, 0.52) 0%, rgba(2, 8, 19, 0.08) 36%, rgba(2, 8, 19, 0.18) 100%), radial-gradient(circle at 69% 49%, rgba(74, 151, 226, 0.1) 0%, transparent 36%)",
          opacity: 0.72,
          mixBlendMode: "multiply",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 180px rgba(0, 0, 0, 0.62), inset 0 0 28px rgba(200, 168, 75, 0.05)",
          opacity: 0.95,
        }}
      />
    </AbsoluteFill>
  );
};
