"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────
// Agent Config
// ─────────────────────────────────────────────
const AGENTS = [
  {
    id: 1,
    name: "Agent #1: Layout Architect",
    color: "#22d3ee",       // cyan
    shadow: "rgba(34,211,238,0.5)",
    trail: "rgba(34,211,238,0.15)",
  },
  {
    id: 2,
    name: "Agent #2: Asset Placer",
    color: "#34d399",       // emerald
    shadow: "rgba(52,211,153,0.5)",
    trail: "rgba(52,211,153,0.15)",
  },
  {
    id: 3,
    name: "Agent #3: Typography & Copy",
    color: "#f87171",       // crimson
    shadow: "rgba(248,113,113,0.5)",
    trail: "rgba(248,113,113,0.15)",
  },
  {
    id: 4,
    name: "Agent #4: VFX & Shader",
    color: "#a78bfa",       // violet
    shadow: "rgba(167,139,250,0.5)",
    trail: "rgba(167,139,250,0.15)",
  },
  {
    id: 5,
    name: "Agent #5: Interaction QA",
    color: "#fbbf24",       // amber
    shadow: "rgba(251,191,36,0.5)",
    trail: "rgba(251,191,36,0.15)",
  },
];

// Waypoints per agent — percentage-based [0..1]
const WAYPOINTS: Array<Array<{ x: number; y: number; action?: "click" | "drag" | "type" }>> = [
  // Agent 1 – sweeps top section
  [
    { x: 0.1,  y: 0.1,  action: "drag"  },
    { x: 0.5,  y: 0.08, action: "click" },
    { x: 0.85, y: 0.15, action: "drag"  },
    { x: 0.6,  y: 0.35, action: "click" },
    { x: 0.2,  y: 0.5                   },
    { x: 0.4,  y: 0.7,  action: "click" },
    { x: 0.1,  y: 0.9                   },
    { x: 0.7,  y: 0.85, action: "drag"  },
  ],
  // Agent 2 – right side placements
  [
    { x: 0.75, y: 0.05, action: "click" },
    { x: 0.9,  y: 0.25, action: "drag"  },
    { x: 0.65, y: 0.45, action: "click" },
    { x: 0.8,  y: 0.6,  action: "drag"  },
    { x: 0.55, y: 0.75, action: "click" },
    { x: 0.9,  y: 0.9                   },
    { x: 0.3,  y: 0.95, action: "click" },
  ],
  // Agent 3 – type across headers
  [
    { x: 0.15, y: 0.12, action: "type"  },
    { x: 0.4,  y: 0.3,  action: "type"  },
    { x: 0.25, y: 0.55, action: "click" },
    { x: 0.5,  y: 0.6,  action: "type"  },
    { x: 0.7,  y: 0.4,  action: "type"  },
    { x: 0.8,  y: 0.75, action: "click" },
    { x: 0.45, y: 0.88, action: "type"  },
  ],
  // Agent 4 – VFX clicks
  [
    { x: 0.5,  y: 0.5,  action: "click" },
    { x: 0.3,  y: 0.2,  action: "click" },
    { x: 0.7,  y: 0.7,  action: "drag"  },
    { x: 0.15, y: 0.75, action: "click" },
    { x: 0.85, y: 0.35, action: "click" },
    { x: 0.6,  y: 0.55, action: "drag"  },
    { x: 0.2,  y: 0.88, action: "click" },
  ],
  // Agent 5 – QA wander
  [
    { x: 0.45, y: 0.22, action: "click" },
    { x: 0.6,  y: 0.14, action: "click" },
    { x: 0.35, y: 0.42, action: "click" },
    { x: 0.75, y: 0.55, action: "drag"  },
    { x: 0.25, y: 0.68, action: "click" },
    { x: 0.55, y: 0.82, action: "click" },
    { x: 0.88, y: 0.5,  action: "click" },
  ],
];

// ─────────────────────────────────────────────
// Cursor SVG
// ─────────────────────────────────────────────
function CursorSVG({ color, shadow }: { color: string; shadow: string }) {
  return (
    <svg
      width="22"
      height="26"
      viewBox="0 0 22 26"
      fill="none"
      style={{ filter: `drop-shadow(0 0 6px ${shadow})` }}
    >
      <path
        d="M2 2L2 20L6.5 15.5L9.5 22L12.5 21L9.5 14H17L2 2Z"
        fill={color}
        stroke="#0A0A0A"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────
// Click Ripple
// ─────────────────────────────────────────────
function ClickRipple({ color, onDone }: { color: string; onDone: () => void }) {
  return (
    <motion.div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: `2px solid ${color}`,
        pointerEvents: "none",
      }}
      initial={{ scale: 0.5, opacity: 0.9 }}
      animate={{ scale: 2.5, opacity: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      onAnimationComplete={onDone}
    />
  );
}

// ─────────────────────────────────────────────
// Selection Box (blueprint wireframe)
// ─────────────────────────────────────────────
function SelectionBox({
  x, y, w, h, color, label,
}: {
  x: number; y: number; w: number; h: number; color: string; label: string;
}) {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        border: `1.5px dashed ${color}`,
        pointerEvents: "none",
        zIndex: 10,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Corner handles */}
      {[
        { top: -3, left: -3 },
        { top: -3, right: -3 },
        { bottom: -3, left: -3 },
        { bottom: -3, right: -3 },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 6,
            height: 6,
            background: color,
            ...pos,
          }}
        />
      ))}
      {/* Dimension label */}
      <div
        style={{
          position: "absolute",
          top: -18,
          left: 0,
          fontFamily: "DM Mono, monospace",
          fontSize: 9,
          color,
          whiteSpace: "nowrap",
          background: "rgba(10,10,10,0.8)",
          padding: "1px 4px",
          borderRadius: 2,
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Single Agent Cursor
// ─────────────────────────────────────────────
interface AgentCursorProps {
  agent: typeof AGENTS[0];
  waypoints: typeof WAYPOINTS[0];
  containerW: number;
  containerH: number;
  userActive: boolean;
  startDelay: number;
}

function AgentCursor({
  agent, waypoints, containerW, containerH, userActive, startDelay,
}: AgentCursorProps) {
  const [pos, setPos] = useState({
    x: waypoints[0].x * containerW,
    y: waypoints[0].y * containerH,
  });
  const [waypointIdx, setWaypointIdx] = useState(0);
  const [showRipple, setShowRipple] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const controls = useAnimationControls();
  const rafRef = useRef<number | null>(null);
  const posRef = useRef(pos);
  posRef.current = pos;
  const startedRef = useRef(false);

  const nextWaypoint = useCallback(
    (idx: number) => {
      const wp = waypoints[idx % waypoints.length];
      const targetX = wp.x * containerW;
      const targetY = wp.y * containerH;

      // Animate cursor position with spring-like lerp via RAF
      const SPEED = 0.045;
      const move = () => {
        setPos((cur) => {
          const nx = cur.x + (targetX - cur.x) * SPEED;
          const ny = cur.y + (targetY - cur.y) * SPEED;
          const dx = Math.abs(nx - targetX);
          const dy = Math.abs(ny - targetY);
          if (dx < 1.5 && dy < 1.5) {
            // Arrived — trigger action
            if (wp.action === "click" || wp.action === "drag") {
              setIsClicking(true);
              setShowRipple(true);
              setTimeout(() => setIsClicking(false), 200);
            } else if (wp.action === "type") {
              setIsTyping(true);
              setTimeout(() => setIsTyping(false), 600);
            }
            // Schedule next waypoint
            setTimeout(() => {
              setWaypointIdx((prev) => prev + 1);
            }, wp.action ? 500 : 200);
            return { x: targetX, y: targetY };
          }
          rafRef.current = requestAnimationFrame(move);
          return { x: nx, y: ny };
        });
      };

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(move);
    },
    [waypoints, containerW, containerH]
  );

  // Start after delay
  useEffect(() => {
    const t = setTimeout(() => {
      startedRef.current = true;
      nextWaypoint(0);
    }, startDelay);
    return () => clearTimeout(t);
  }, [startDelay, nextWaypoint]);

  // On waypoint index change
  useEffect(() => {
    if (!startedRef.current || waypointIdx === 0) return;
    nextWaypoint(waypointIdx);
  }, [waypointIdx, nextWaypoint]);

  // Cleanup RAF
  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const effectiveOpacity = userActive ? 0.25 : 1;

  return (
    <div
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        pointerEvents: "none",
        zIndex: 50,
        transition: "opacity 0.4s ease",
        opacity: effectiveOpacity,
        willChange: "transform",
      }}
    >
      {/* Scale on click */}
      <motion.div
        animate={isClicking ? { scale: [1, 0.85, 1.1, 1] } : { scale: 1 }}
        transition={{ duration: 0.25 }}
        style={{ position: "relative" }}
      >
        <CursorSVG color={agent.color} shadow={agent.shadow} />

        {/* Click ripple */}
        {showRipple && (
          <ClickRipple
            color={agent.color}
            onDone={() => setShowRipple(false)}
          />
        )}

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            style={{
              position: "absolute",
              top: -28,
              left: 16,
              background: "rgba(10,10,10,0.9)",
              border: `1px solid ${agent.color}`,
              borderRadius: 4,
              padding: "2px 6px",
              fontFamily: "DM Mono, monospace",
              fontSize: 9,
              color: agent.color,
              whiteSpace: "nowrap",
            }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            typing…
          </motion.div>
        )}
      </motion.div>

      {/* Name badge */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 18,
          background: "rgba(10,10,10,0.92)",
          border: `1px solid ${agent.color}`,
          borderRadius: 4,
          padding: "2px 8px",
          fontFamily: "DM Mono, monospace",
          fontSize: 9,
          color: agent.color,
          whiteSpace: "nowrap",
          boxShadow: `0 0 8px ${agent.shadow}`,
          letterSpacing: "0.05em",
        }}
      >
        {agent.name}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Blueprint Boxes (Phase 1)
// ─────────────────────────────────────────────
function BlueprintBoxes({
  containerW,
  containerH,
}: {
  containerW: number;
  containerH: number;
}) {
  const boxes = [
    { x: 0.05, y: 0.05, w: 0.55, h: 0.18, color: "#22d3ee", label: `${Math.round(containerW * 0.55)} × ${Math.round(containerH * 0.18)}px — HERO` },
    { x: 0.05, y: 0.28, w: 0.28, h: 0.12, color: "#34d399", label: `${Math.round(containerW * 0.28)} × ${Math.round(containerH * 0.12)}px — CARD` },
    { x: 0.38, y: 0.28, w: 0.28, h: 0.12, color: "#34d399", label: `${Math.round(containerW * 0.28)} × ${Math.round(containerH * 0.12)}px — CARD` },
    { x: 0.05, y: 0.45, w: 0.88, h: 0.22, color: "#a78bfa", label: `${Math.round(containerW * 0.88)} × ${Math.round(containerH * 0.22)}px — GRID` },
    { x: 0.65, y: 0.05, w: 0.3,  h: 0.32, color: "#f87171", label: `${Math.round(containerW * 0.3)} × ${Math.round(containerH * 0.32)}px — SIDEBAR` },
    { x: 0.05, y: 0.72, w: 0.88, h: 0.1,  color: "#fbbf24", label: `${Math.round(containerW * 0.88)} × ${Math.round(containerH * 0.1)}px — FOOTER` },
  ];

  return (
    <>
      {boxes.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.25, duration: 0.4 }}
        >
          <SelectionBox
            x={b.x * containerW}
            y={b.y * containerH}
            w={b.w * containerW}
            h={b.h * containerH}
            color={b.color}
            label={b.label}
          />
        </motion.div>
      ))}
    </>
  );
}

// ─────────────────────────────────────────────
// Grid Overlay
// ─────────────────────────────────────────────
function GridOverlay() {
  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        pointerEvents: "none",
        zIndex: 1,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    />
  );
}

// ─────────────────────────────────────────────
// Phase Status HUD
// ─────────────────────────────────────────────
const PHASE_LABELS = [
  "◉ PHASE 1 — BLUEPRINT",
  "◉ PHASE 2 — ASSEMBLY",
  "◉ PHASE 3 — AMBIENT",
];

function PhaseHUD({ phase }: { phase: number }) {
  return (
    <motion.div
      key={phase}
      style={{
        position: "absolute",
        top: 12,
        right: 16,
        fontFamily: "DM Mono, monospace",
        fontSize: 9,
        letterSpacing: "0.14em",
        color: "#22d3ee",
        background: "rgba(10,10,10,0.85)",
        border: "1px solid rgba(34,211,238,0.3)",
        borderRadius: 4,
        padding: "4px 10px",
        zIndex: 100,
        pointerEvents: "none",
      }}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.3 }}
    >
      {PHASE_LABELS[phase]}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Agent Activity Log (bottom strip)
// ─────────────────────────────────────────────
const LOG_MESSAGES = [
  { agent: 1, color: "#22d3ee", msg: "Snapping hero grid to 12-col layout…" },
  { agent: 2, color: "#34d399", msg: "Dropping cover image asset into slot…" },
  { agent: 3, color: "#f87171", msg: "Typing project title placeholder…" },
  { agent: 4, color: "#a78bfa", msg: "Applying blur shader to background…" },
  { agent: 5, color: "#fbbf24", msg: "Testing hover state on card…" },
  { agent: 1, color: "#22d3ee", msg: "Adjusting section padding to 96px…" },
  { agent: 3, color: "#f87171", msg: "Inserting description copy…" },
  { agent: 4, color: "#a78bfa", msg: "Rendering ripple on click target…" },
  { agent: 2, color: "#34d399", msg: "Aligning image to bounding box…" },
  { agent: 5, color: "#fbbf24", msg: "Verifying CTA button interaction…" },
];

function ActivityLog({ phase }: { phase: number }) {
  const [logIdx, setLogIdx] = useState(0);

  useEffect(() => {
    if (phase === 0) return;
    const interval = setInterval(() => {
      setLogIdx((i) => (i + 1) % LOG_MESSAGES.length);
    }, 1400);
    return () => clearInterval(interval);
  }, [phase]);

  if (phase === 0) return null;
  const entry = LOG_MESSAGES[logIdx];

  return (
    <motion.div
      style={{
        position: "absolute",
        bottom: 10,
        left: 12,
        fontFamily: "DM Mono, monospace",
        fontSize: 9,
        color: entry.color,
        background: "rgba(10,10,10,0.85)",
        border: `1px solid ${entry.color}33`,
        borderRadius: 4,
        padding: "4px 10px",
        zIndex: 100,
        pointerEvents: "none",
        letterSpacing: "0.08em",
        maxWidth: "80%",
      }}
      key={logIdx}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <span style={{ opacity: 0.6 }}>agent_{entry.agent} →</span>{" "}
      {entry.msg}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// Main Export
// ─────────────────────────────────────────────
export default function AutonomousBuilderOverlay({
  className = "",
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 800, h: 600 });
  const [phase, setPhase] = useState(0); // 0=blueprint, 1=assembly, 2=ambient
  const [userActive, setUserActive] = useState(false);
  const userTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Measure container
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const r = containerRef.current.getBoundingClientRect();
        setDims({ w: r.width, h: r.height });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Phase progression
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2000);
    const t2 = setTimeout(() => setPhase(2), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Detect real user mouse movement
  useEffect(() => {
    const onMove = () => {
      setUserActive(true);
      if (userTimerRef.current) clearTimeout(userTimerRef.current);
      userTimerRef.current = setTimeout(() => setUserActive(false), 2500);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 40,
      }}
    >
      {/* Grid */}
      <GridOverlay />

      {/* Blueprint boxes (phase 0 only) */}
      <AnimatePresence>
        {phase === 0 && (
          <motion.div
            key="blueprints"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none" }}
          >
            <BlueprintBoxes containerW={dims.w} containerH={dims.h} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cursors */}
      {AGENTS.map((agent, i) => (
        <AgentCursor
          key={agent.id}
          agent={agent}
          waypoints={WAYPOINTS[i]}
          containerW={dims.w}
          containerH={dims.h}
          userActive={userActive}
          startDelay={i * 180}
        />
      ))}

      {/* HUD */}
      <AnimatePresence mode="wait">
        <PhaseHUD key={phase} phase={phase} />
      </AnimatePresence>

      {/* Activity log */}
      <AnimatePresence mode="wait">
        <ActivityLog phase={phase} />
      </AnimatePresence>
    </div>
  );
}

