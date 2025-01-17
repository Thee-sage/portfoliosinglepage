"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import Image from "next/image";
import { encode } from "qss";
import React from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import Link from "next/link";
import { cn } from '../a/utils';

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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

export const LinkPreview = ({
  children,
  url,
  className,
  width = 220,
  height = 220,
  quality = 50,
  layout = "fixed",
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  const isMobile = useIsMobile();

  const adjustedWidth = isMobile ? 150 : width;
  const adjustedHeight = isMobile ? 200 : height;

  let src;
  if (!isStatic) {
    const params = encode({
      url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": adjustedWidth * 3,
      "viewport.height": adjustedHeight * 3,
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }

  const [isOpen, setOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    if (isMobile) {
      setOpen(true); // Automatically open on mobile
    }
  }, [isMobile]);

  return (
    <>
      {isMounted ? (
        <div className="hidden">
          <Image
            src={src}
            width={adjustedWidth}
            height={adjustedHeight}
            quality={quality}
            layout={layout}
            priority={true}
            alt="hidden image"
          />
        </div>
      ) : null}

      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={100}
        open={isOpen || isMobile} // Always open on mobile
        onOpenChange={(open) => {
          if (!isMobile) {
            setOpen(open);
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
            {(isOpen || isMobile) && (
              <motion.div
                initial={{ opacity: 0, y: isMobile ? 300 : 265, x: -10, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: isMobile ? 305 : 285,
                  x: isMobile ? 90 : -120,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    duration: 0.1
                  },
                }}
                exit={{ opacity: 0, y: isMobile ? 320 : 100, x: -30, scale: 0.6}}
                className="shadow-xl rounded-xl"
              >
                <Link
                  href={url}
                  className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 "
                  style={{ fontSize: 0 }}
                >
                  <Image
                    src={isStatic ? imageSrc : src}
                    width={adjustedWidth}
                    height={adjustedHeight}
                    quality={quality}
                    layout={layout}
                    priority={true}
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
