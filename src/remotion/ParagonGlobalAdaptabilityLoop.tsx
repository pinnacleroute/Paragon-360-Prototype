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
const BLUE = "#4fa3e6";
const NAVY = "#020813";
const TAU = Math.PI * 2;

const sinLoop = (frame: number, duration: number, phase = 0) =>
  Math.sin((frame / duration) * TAU + phase);

const cosLoop = (frame: number, duration: number, phase = 0) =>
  Math.cos((frame / duration) * TAU + phase);

const connectionPoints = [
  { x: 866, y: 528, color: GOLD, phase: 0.1, radius: 7 },
  { x: 1304, y: 430, color: GOLD, phase: 0.35, radius: 8 },
  { x: 1714, y: 512, color: GOLD, phase: 0.62, radius: 7 },
  { x: 1037, y: 740, color: GOLD, phase: 0.86, radius: 7 },
  { x: 1366, y: 720, color: GOLD, phase: 0.48, radius: 7 },
  { x: 1818, y: 800, color: GOLD, phase: 0.72, radius: 7 },
  { x: 1224, y: 384, color: BLUE, phase: 0.0, radius: 5 },
  { x: 1508, y: 360, color: BLUE, phase: 0.5, radius: 5 },
];

const paths = [
  { d: "M 866 528 C 1032 396, 1178 404, 1304 430", color: BLUE, delay: 0.0 },
  { d: "M 1304 430 C 1456 380, 1596 420, 1714 512", color: GOLD, delay: 0.16 },
  { d: "M 1037 740 C 1118 648, 1250 638, 1366 720", color: BLUE, delay: 0.32 },
  { d: "M 1366 720 C 1530 776, 1688 762, 1818 800", color: GOLD, delay: 0.48 },
  { d: "M 866 528 C 904 648, 948 710, 1037 740", color: GOLD, delay: 0.64 },
];

const GlobalOverlay = ({ progress, breath }: { progress: number; breath: number }) => {
  return (
    <svg
      viewBox="0 0 1920 1080"
      style={{
        position: "absolute",
        inset: 0,
        mixBlendMode: "screen",
        overflow: "visible",
      }}
    >
      <defs>
        <radialGradient id="global-blue-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7fc6ff" stopOpacity="0.24" />
          <stop offset="52%" stopColor="#1c5c9a" stopOpacity="0.09" />
          <stop offset="100%" stopColor={NAVY} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="global-blue-line" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor={BLUE} stopOpacity="0" />
          <stop offset="48%" stopColor="#9bd8ff" stopOpacity="0.58" />
          <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="global-gold-line" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0" />
          <stop offset="50%" stopColor="#f2d98b" stopOpacity="0.5" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </linearGradient>
        <filter id="global-soft-glow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse
        cx={1170 + sinLoop(progress * 240, 240, 0.4) * 36}
        cy="530"
        rx="760"
        ry="360"
        fill="url(#global-blue-glow)"
        opacity={0.28 + breath * 0.12}
      />

      {[
        { cx: 1220, cy: 604, rx: 890, ry: 414, rotate: -6, color: GOLD, dash: "10 44", dir: 1 },
        { cx: 1228, cy: 570, rx: 780, ry: 318, rotate: -2, color: BLUE, dash: "8 38", dir: -1 },
        { cx: 1262, cy: 514, rx: 710, ry: 226, rotate: 7, color: "#8dcfff", dash: "6 34", dir: 1 },
        { cx: 1240, cy: 598, rx: 972, ry: 498, rotate: 4, color: GOLD, dash: "4 36", dir: -1 },
      ].map((arc, index) => (
        <ellipse
          key={index}
          cx={arc.cx}
          cy={arc.cy}
          rx={arc.rx}
          ry={arc.ry}
          fill="none"
          stroke={arc.color}
          strokeWidth={index < 2 ? 1.35 : 0.9}
          strokeOpacity={(0.16 + breath * 0.1) * (index === 3 ? 0.62 : 1)}
          strokeDasharray={arc.dash}
          strokeDashoffset={arc.dir * progress * 180}
          transform={`rotate(${arc.rotate} ${arc.cx} ${arc.cy})`}
        />
      ))}

      {paths.map((path) => {
        const draw = 0.5 + 0.5 * sinLoop(progress * 240, 240, path.delay * TAU - Math.PI / 2);
        return (
          <path
            key={path.d}
            d={path.d}
            fill="none"
            stroke={path.color === GOLD ? "url(#global-gold-line)" : "url(#global-blue-line)"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeOpacity={0.12 + draw * 0.28}
            strokeDasharray="150 420"
            strokeDashoffset={progress * 320 - path.delay * 220}
            filter="url(#global-soft-glow)"
          />
        );
      })}

      {connectionPoints.map((point) => {
        const pulse = 0.5 + 0.5 * sinLoop(progress * 240, 90, point.phase * TAU);
        const isGold = point.color === GOLD;
        return (
          <g key={`${point.x}-${point.y}`} opacity={0.58 + pulse * 0.32}>
            <circle
              cx={point.x}
              cy={point.y}
              r={point.radius + pulse * (isGold ? 16 : 11)}
              fill={point.color}
              opacity={isGold ? 0.1 + pulse * 0.1 : 0.08 + pulse * 0.12}
              filter="url(#global-soft-glow)"
            />
            <circle cx={point.x} cy={point.y} r={point.radius} fill={isGold ? "#f4d98b" : "#9bd8ff"} opacity="0.82" />
            <circle
              cx={point.x}
              cy={point.y}
              r={point.radius + 7}
              fill="none"
              stroke={point.color}
              strokeOpacity={0.26 + pulse * 0.18}
              strokeWidth="1"
            />
          </g>
        );
      })}

      <path
        d="M 260 402 C 640 170, 1128 160, 1664 268"
        fill="none"
        stroke="url(#global-gold-line)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity={0.14 + breath * 0.1}
        strokeDasharray="110 760"
        strokeDashoffset={progress * -520}
        filter="url(#global-soft-glow)"
      />
    </svg>
  );
};

export const ParagonGlobalAdaptabilityLoop = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const loopFrame = frame % durationInFrames;
  const progress = loopFrame / durationInFrames;

  const reveal = interpolate(frame, [0, 36], [0.94, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeReady = interpolate(frame, [durationInFrames - 30, durationInFrames - 1], [1, 0.94], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const breath = 0.5 - cosLoop(loopFrame, durationInFrames) * 0.5;
  const shimmer = 0.5 + sinLoop(loopFrame, durationInFrames, Math.PI * 0.35) * 0.5;
  const scale = 1 + breath * 0.03;
  const driftX = sinLoop(loopFrame, durationInFrames, -Math.PI / 2) * 18;
  const driftY = sinLoop(loopFrame, durationInFrames, Math.PI * 0.2) * 7;

  return (
    <AbsoluteFill style={{ backgroundColor: NAVY, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 72% 48%, rgba(45, 120, 184, 0.28) 0%, rgba(5, 16, 34, 0.5) 38%, rgba(1, 6, 15, 0.98) 82%), linear-gradient(135deg, #020712 0%, #061225 46%, #02060f 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: -20,
          transform: `translate3d(${driftX}px, ${driftY}px, 0) scale(${scale})`,
          transformOrigin: "67% 52%",
          opacity: reveal * fadeReady,
          filter: `saturate(${1.02 + shimmer * 0.05}) contrast(1.035)`,
        }}
      >
        <Img
          src={staticFile("assets/visual6.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <AbsoluteFill
        style={{
          transform: `translate3d(${driftX * 0.24}px, ${driftY * 0.18}px, 0) scale(${1 + breath * 0.006})`,
          opacity: reveal * fadeReady,
        }}
      >
        <GlobalOverlay progress={progress} breath={breath} />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            `linear-gradient(${104 + shimmer * 8}deg, transparent 0%, rgba(102, 183, 255, 0.045) 42%, rgba(244, 217, 139, 0.055) 50%, rgba(102, 183, 255, 0.03) 58%, transparent 100%)`,
          mixBlendMode: "screen",
          opacity: 0.45 + shimmer * 0.12,
          transform: `translate3d(${sinLoop(loopFrame, durationInFrames) * 34}px, 0, 0)`,
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(2, 8, 19, 0.34) 0%, rgba(2, 8, 19, 0.04) 42%, rgba(2, 8, 19, 0.14) 100%)",
          mixBlendMode: "multiply",
          opacity: 0.74,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 180px rgba(0, 0, 0, 0.58), inset 0 0 34px rgba(200, 168, 75, 0.04)",
        }}
      />
    </AbsoluteFill>
  );
};
