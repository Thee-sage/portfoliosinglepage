"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import Image from "next/image";
import { encode } from "qss";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { cn } from "../a/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 130,
  quality = 50,
  layout = "fixed",
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  const isMobile = useIsMobile();

  let src: string;
  if (!isStatic) {
    const params = encode({
      url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }

  const [isOpen, setOpen] = React.useState(false);
  // Only start mounting the preview image when the user has hovered at least once
  const [hasHovered, setHasHovered] = React.useState(false);

  // On mobile: don't force-open; let user tap the link directly
  const showPreview = isOpen && !isMobile;

  return (
    <>
      {/* Lazy-mount the hidden pre-loader only AFTER first hover */}
      {hasHovered && !isMobile && (
        <div style={{ display: "none" }}>
          <Image
            src={src}
            width={width}
            height={height}
            quality={quality}
            alt="hidden preload"
          />
        </div>
      )}

      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={100}
        open={showPreview}
        onOpenChange={(open) => {
          if (!isMobile) {
            setOpen(open);
            if (open) setHasHovered(true);
          }
        }}
      >
        <HoverCardPrimitive.Trigger
          className={cn("text-black dark:text-white", className)}
          href={url}
        >
          {children}
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Content
          className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
          side="top"
          align="center"
          sideOffset={10}
        >
          <AnimatePresence>
            {showPreview && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.85 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 180,
                    damping: 22,
                    duration: 0.15,
                  },
                }}
                exit={{ opacity: 0, y: 8, scale: 0.85 }}
                className="shadow-xl rounded-xl"
                style={{ zIndex: 50 }}
              >
                <Link
                  href={url}
                  className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200"
                  style={{ fontSize: 0 }}
                >
                  <Image
                    src={src}
                    width={width}
                    height={height}
                    quality={quality}
                    priority={false}
                    className="rounded-lg"
                    alt="preview image"
                  />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    </>
  );
};