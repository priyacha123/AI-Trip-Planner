import { useState, useCallback, useEffect, forwardRef, useImperativeHandle } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Only render the active card and a few neighbours; farther cards become
// empty (invisible) placeholders so a long list doesn't pile up ghost cards.
const MAX_RENDER_OFFSET = 2;

const Carousel = forwardRef(({ children, className, activeIndex, onChange }, ref) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [internalIndex, setInternalIndex] = useState(0);
  const items = Array.isArray(children) ? children : [children];

  const currentIndex = activeIndex ?? internalIndex;

  const goTo = useCallback((index) => {
    const clamped = ((index % items.length) + items.length) % items.length;
    setInternalIndex(clamped);
    if (typeof onChange === "function") {
      onChange(clamped);
    }
  }, [items.length, onChange]);

  useImperativeHandle(ref, () => ({
    scroll: (direction) => {
      const next = direction === "left" ? currentIndex - 1 : currentIndex + 1;
      goTo(next);
    },
  }), [currentIndex, goTo]);

  const prevIndex = (currentIndex - 1 + items.length) % items.length;
  const nextIndex = (currentIndex + 1) % items.length;

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") goTo(prevIndex);
      if (e.key === "ArrowRight") goTo(nextIndex);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goTo, prevIndex, nextIndex]);

  const handleStart = (x) => {
    setIsDragging(true);
    setStartX(x);
    setDragOffset(0);
  };

  const handleMove = (x) => {
    if (!isDragging) return;
    setDragOffset(x - startX);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(dragOffset) > 50) {
      if (dragOffset > 0) goTo(prevIndex);
      else goTo(nextIndex);
    } else {
      setDragOffset(0);
    }
  };

  return (
    <div
      className={`relative h-full select-none ${className || ""}`}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      <div className="relative mx-auto h-full w-full overflow-hidden" style={{ perspective: "1400px" }}>
        {items.map((child, index) => {
          const offset = index - currentIndex;
          const absOffset = Math.abs(offset);
          const isActive = offset === 0;
          const isFar = absOffset > MAX_RENDER_OFFSET;

          let scale = 1 - absOffset * 0.12;
          let translateX = offset * 68;
          let translateZ = isActive ? 0 : -120;
          let rotateY = offset * -4;
          let opacity = 1 - absOffset * 0.35;
          let blur = absOffset > 0 ? absOffset * 1.5 : 0;
          let zIndex = 100 - absOffset;
          let pointerEvents = isActive ? "auto" : "none";

          if (isDragging) {
            translateX += dragOffset * 0.15;
          }

          return (
            <div
              key={index}
              className="absolute inset-x-0 top-0 mx-auto h-full w-full transition-all duration-500 ease-out"
              style={{
                transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity: isFar ? 0 : Math.max(opacity, 0.15),
                filter: isFar ? "none" : `blur(${blur}px)`,
                zIndex,
                pointerEvents,
              }}
            >
              {isFar ? null : child}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => goTo(prevIndex)}
        className="absolute -left-14 top-1/2 z-50 hidden -translate-y-1/2 sm:flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={() => goTo(nextIndex)}
        className="absolute -right-14 top-1/2 z-50 hidden -translate-y-1/2 sm:flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
});

Carousel.displayName = "Carousel";

export { Carousel };
