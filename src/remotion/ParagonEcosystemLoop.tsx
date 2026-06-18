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
const BLUE = "#4ca7ee";
const NAVY = "#020813";
const TAU = Math.PI * 2;

const sinLoop = (frame: number, duration: number, phase = 0) =>
  Math.sin((frame / duration) * TAU + phase);

const cosLoop = (frame: number, duration: number, phase = 0) =>
  Math.cos((frame / duration) * TAU + phase);

const nodes = [
  { x: 668, y: 286, phase: 0.05, color: GOLD, radius: 7 },
  { x: 1152, y: 286, phase: 0.2, color: BLUE, radius: 7 },
  { x: 1374, y: 516, phase: 0.35, color: GOLD, radius: 7 },
  { x: 1152, y: 716, phase: 0.5, color: BLUE, radius: 7 },
  { x: 668, y: 716, phase: 0.65, color: GOLD, radius: 7 },
  { x: 546, y: 516, phase: 0.8, color: BLUE, radius: 7 },
];

const connectors = [
  { d: "M 960 528 C 858 456, 756 372, 668 286", color: GOLD, delay: 0.08 },
  { d: "M 960 528 C 1038 430, 1092 356, 1152 286", color: BLUE, delay: 0.22 },
  { d: "M 960 528 C 1118 518, 1254 516, 1374 516", color: GOLD, delay: 0.36 },
  { d: "M 960 528 C 1038 610, 1098 664, 1152 716", color: BLUE, delay: 0.5 },
  { d: "M 960 528 C 842 608, 756 668, 668 716", color: GOLD, delay: 0.64 },
  { d: "M 960 528 C 804 526, 662 520, 546 516", color: BLUE, delay: 0.78 },
];

const EcosystemOverlay = ({ progress, breath }: { progress: number; breath: number }) => {
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
        <radialGradient id="ecosystem-hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#88ccff" stopOpacity="0.28" />
          <stop offset="42%" stopColor="#1f6ead" stopOpacity="0.11" />
          <stop offset="100%" stopColor={NAVY} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ecosystem-blue-line" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor={BLUE} stopOpacity="0" />
          <stop offset="50%" stopColor="#9ddcff" stopOpacity="0.62" />
          <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ecosystem-gold-line" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0" />
          <stop offset="50%" stopColor="#f4d98b" stopOpacity="0.56" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </linearGradient>
        <filter id="ecosystem-soft-glow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse
        cx="960"
        cy="528"
        rx="360"
        ry="300"
        fill="url(#ecosystem-hub-glow)"
        opacity={0.34 + breath * 0.2}
      />

      {[0, 1, 2].map((index) => (
        <ellipse
          key={index}
          cx="960"
          cy="528"
          rx={360 + index * 154}
          ry={206 + index * 90}
          fill="none"
          stroke={index === 1 ? BLUE : GOLD}
          strokeWidth={index === 0 ? 1.2 : 0.9}
          strokeOpacity={(0.14 + breath * 0.08) * (index === 2 ? 0.7 : 1)}
          strokeDasharray={index === 0 ? "8 30" : "5 38"}
          strokeDashoffset={(index % 2 === 0 ? 1 : -1) * progress * 180}
          transform={`rotate(${index === 1 ? 4 : -3} 960 528)`}
        />
      ))}

      {connectors.map((connector) => {
        const draw = 0.5 + 0.5 * sinLoop(progress * 240, 240, connector.delay * TAU - Math.PI / 2);
        return (
          <path
            key={connector.d}
            d={connector.d}
            fill="none"
            stroke={connector.color === GOLD ? "url(#ecosystem-gold-line)" : "url(#ecosystem-blue-line)"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeOpacity={0.16 + draw * 0.24}
            strokeDasharray="92 360"
            strokeDashoffset={progress * 250 - connector.delay * 180}
            filter="url(#ecosystem-soft-glow)"
          />
        );
      })}

      <circle
        cx="960"
        cy="528"
        r={18 + breath * 9}
        fill={GOLD}
        opacity={0.1 + breath * 0.1}
        filter="url(#ecosystem-soft-glow)"
      />
      <circle cx="960" cy="528" r="7" fill="#f6dc91" opacity="0.9" />

      {nodes.map((node, index) => {
        const pulse = 0.5 + 0.5 * sinLoop(progress * 240, 90, node.phase * TAU);
        const reveal = 0.78 + 0.22 * sinLoop(progress * 240, 240, node.phase * TAU);
        return (
          <g
            key={`${node.x}-${node.y}`}
            opacity={0.52 + pulse * 0.38}
            transform={`translate(0 ${sinLoop(progress * 240, 240, node.phase * TAU) * 4})`}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={node.radius + pulse * 14}
              fill={node.color}
              opacity={0.06 + pulse * 0.12}
              filter="url(#ecosystem-soft-glow)"
            />
            <circle cx={node.x} cy={node.y} r={node.radius} fill={node.color === GOLD ? "#f4d98b" : "#9bd8ff"} opacity={reveal} />
            <circle
              cx={node.x}
              cy={node.y}
              r={node.radius + 8}
              fill="none"
              stroke={node.color}
              strokeOpacity={0.24 + pulse * 0.18}
            />
            {index % 2 === 0 && (
              <circle
                cx={node.x}
                cy={node.y}
                r={node.radius + 19 + pulse * 5}
                fill="none"
                stroke={GOLD}
                strokeOpacity={0.08 + pulse * 0.08}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};

export const ParagonEcosystemLoop = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const loopFrame = frame % durationInFrames;
  const progress = loopFrame / durationInFrames;

  const reveal = interpolate(frame, [0, 42], [0.94, 1], {
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
  const shimmer = 0.5 + sinLoop(loopFrame, durationInFrames, Math.PI * 0.25) * 0.5;
  const driftX = sinLoop(loopFrame, durationInFrames, -Math.PI / 2) * 10;
  const driftY = sinLoop(loopFrame, durationInFrames, Math.PI * 0.2) * 5;
  const scale = 1 + breath * 0.03;

  return (
    <AbsoluteFill style={{ backgroundColor: NAVY, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 52% 50%, rgba(47, 118, 184, 0.26) 0%, rgba(5, 16, 34, 0.5) 38%, rgba(1, 6, 15, 0.98) 84%), linear-gradient(135deg, #020712 0%, #061225 46%, #02060f 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: -18,
          transform: `translate3d(${driftX}px, ${driftY}px, 0) scale(${scale})`,
          transformOrigin: "50% 50%",
          opacity: reveal * fadeReady,
          filter: `saturate(${1.02 + shimmer * 0.04}) contrast(1.035)`,
        }}
      >
        <Img
          src={staticFile("assets/visual7.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <AbsoluteFill
        style={{
          transform: `translate3d(${driftX * 0.22}px, ${driftY * 0.2}px, 0) scale(${1 + breath * 0.006})`,
          opacity: reveal * fadeReady,
        }}
      >
        <EcosystemOverlay progress={progress} breath={breath} />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            `linear-gradient(${98 + shimmer * 8}deg, transparent 0%, rgba(92, 178, 255, 0.04) 42%, rgba(244, 217, 139, 0.05) 50%, rgba(92, 178, 255, 0.025) 58%, transparent 100%)`,
          mixBlendMode: "screen",
          opacity: 0.42 + shimmer * 0.1,
          transform: `translate3d(${sinLoop(loopFrame, durationInFrames) * 28}px, 0, 0)`,
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(2, 8, 19, 0.22) 0%, rgba(2, 8, 19, 0.03) 50%, rgba(2, 8, 19, 0.2) 100%)",
          mixBlendMode: "multiply",
          opacity: 0.7,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 170px rgba(0, 0, 0, 0.58), inset 0 0 34px rgba(200, 168, 75, 0.04)",
        }}
      />
    </AbsoluteFill>
  );
};
