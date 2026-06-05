"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styles from "../page.module.css";

// Define the props type
interface MaskContainerProps {
  children: React.ReactNode;
  revealText: React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: React.CSSProperties;
}

export const MaskContainer = ({
  children,
  revealText,
  size = 1,
  revealSize = 220,
  className,
}: MaskContainerProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<{ x: number | null; y: number | null }>({ x: null, y: null });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updateMousePosition = (e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  useEffect(() => {
    const currentRef = containerRef.current;
    if (currentRef) {
      currentRef.addEventListener("mousemove", updateMousePosition);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("mousemove", updateMousePosition);
      }
    };
  }, []);

  let maskSize = isHovered ? revealSize : size;
  let maskPositionX = mousePosition.x !== null ? mousePosition.x - maskSize / 2 : 0;
  let maskPositionY = mousePosition.y !== null ? mousePosition.y - maskSize / 2 : 0;

  return (
    <motion.div
      ref={containerRef}
      style={{
        height: '200px',
        position: 'relative',
        backgroundColor: isHovered ? 'var(--slate-900)' : 'var(--white)',
        ...className,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '6xl',
          position: 'absolute',
          color: 'black', // Changed to black
          backgroundImage: 'url(/mask.svg)',
          backgroundRepeat: 'no-repeat',
          WebkitMaskImage: 'url(/mask.svg)',
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: `${maskPositionX}px ${maskPositionY}px`,
          WebkitMaskSize: `${maskSize}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      >
        <div className={styles.ak} />
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            maxWidth: '4xl',
            margin: '0 auto',
            textAlign: 'center',
            color: 'white',
            fontSize: '4xl',
            fontWeight: 'bold',
            position: 'relative',
            zIndex: 20,
          }}
        >
          {children}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 5 }}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        {revealText}
      </motion.div>
    </motion.div>
  );
};
