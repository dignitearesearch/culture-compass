import { useRef, useCallback, useState, useEffect } from "react";
import type { ScaleData } from "@/data/cultureScales";

interface CultureScaleProps {
  scale: ScaleData;
  value: number | null;
  onChange: (value: number) => void;
  index: number;
}

const CultureScale = ({ scale, value, onChange, index }: CultureScaleProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showCountries, setShowCountries] = useState(false);

  const updateValue = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      onChange(Math.round(pct));
    },
    [onChange]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateValue(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateValue(e.touches[0].clientX);
  };

  useEffect(() => {
    if (!isDragging) return;
    const handleMove = (e: MouseEvent) => updateValue(e.clientX);
    const handleTouchMove = (e: TouchEvent) => updateValue(e.touches[0].clientX);
    const handleUp = () => setIsDragging(false);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [isDragging, updateValue]);

  return (
    <div
      className="animate-fade-in mb-10"
      style={{ animationDelay: `${index * 80}ms`, opacity: 0 }}
    >
      <div className="flex items-baseline justify-between mb-1">
        <h3 className="font-display text-xl font-semibold text-foreground">
          {scale.name}
        </h3>
        <button
          onClick={() => setShowCountries(!showCountries)}
          className="text-xs font-body text-muted-foreground hover:text-secondary transition-colors"
        >
          {showCountries ? "Hide countries" : "Show countries"}
        </button>
      </div>

      <p className="text-sm text-muted-foreground font-body mb-4 leading-relaxed">
        {scale.description}
      </p>

      {/* Labels */}
      <div className="flex justify-between mb-2">
        <span className="text-xs font-body font-semibold text-primary max-w-[40%]">
          ← {scale.leftLabel}
        </span>
        <span className="text-xs font-body font-semibold text-secondary max-w-[40%] text-right">
          {scale.rightLabel} →
        </span>
      </div>

      {/* Country names above track */}
      {showCountries && (
        <div className="relative h-4 mb-1">
          {scale.countries.map((c) => (
            <span
              key={c.country}
              className="absolute text-[9px] font-body text-muted-foreground whitespace-nowrap"
              style={{
                left: `${c.position}%`,
                transform: "translateX(-50%)",
              }}
            >
              {c.country}
            </span>
          ))}
        </div>
      )}

      {/* Track */}
      <div
        ref={trackRef}
        className="scale-track select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Country dots */}
        {showCountries &&
          scale.countries.map((c) => (
            <div key={c.country} className="group">
              <div className="country-dot" style={{ left: `${c.position}%` }} />
              <span
                className="absolute text-[10px] font-body text-muted-foreground whitespace-nowrap pointer-events-none"
                style={{
                  left: `${c.position}%`,
                  top: "-18px",
                  transform: "translateX(-50%)",
                }}
              >
                {c.country}
              </span>
            </div>
          ))}

        {/* User marker */}
        {value !== null && (
          <div className="scale-marker" style={{ left: `${value}%` }} />
        )}
      </div>

      {/* Endpoint descriptions */}
      <div className="grid grid-cols-2 gap-6 mt-3">
        <p className="text-[11px] text-muted-foreground font-body leading-snug">
          {scale.leftDescription}
        </p>
        <p className="text-[11px] text-muted-foreground font-body leading-snug text-right">
          {scale.rightDescription}
        </p>
      </div>

      {value === null && (
        <p className="text-xs text-secondary font-body mt-2 italic">
          Click on the scale to place yourself
        </p>
      )}
    </div>
  );
};

export default CultureScale;
