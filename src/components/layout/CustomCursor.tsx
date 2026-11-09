"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isPointer, setIsPointer] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for fluid cinematic following
  const springX = useSpring(mouseX, { stiffness: 450, damping: 35 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 35 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 1024;

    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest("a, button, [role='button'], input, textarea, select");
      const projectCard = target.closest("[data-cursor-text]");

      if (projectCard) {
        const text = projectCard.getAttribute("data-cursor-text") || "VIEW";
        setCursorText(text);
        setIsPointer(true);
      } else if (clickable) {
        setCursorText("");
        setIsPointer(true);
      } else {
        setCursorText("");
        setIsPointer(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden lg:block">
      {/* Outer Follower */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorText ? 88 : isPointer ? 48 : 30,
          height: cursorText ? 88 : isPointer ? 48 : 30,
          backgroundColor: cursorText
            ? "rgba(8, 8, 8, 0.92)"
            : isPointer
            ? "rgba(212, 255, 0, 0.12)"
            : "transparent",
          borderColor: cursorText
            ? "rgba(212, 255, 0, 0.85)"
            : isPointer
            ? "rgba(212, 255, 0, 0.6)"
            : "rgba(255, 255, 255, 0.25)",
          borderWidth: "1px",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {cursorText ? (
          <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-semibold">
            {cursorText}
          </span>
        ) : null}
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent pointer-events-none shadow-[0_0_8px_rgba(212,255,0,0.8)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorText ? 0 : isPointer ? 1.4 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}
