interface LogoIconProps {
  size?: number;
  className?: string;
}

export function LogoIcon({ size = 40, className }: LogoIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 56 56"
      fill="none"
      width={size}
      height={size}
      className={className}
      aria-label="SquareMind"
    >
      <rect x="2" y="2" width="52" height="52" rx="12" ry="12" fill="none" stroke="currentColor" strokeWidth={3.5}/>
      <path d="M14 14 L28 22 L22 28 Z" fill="#2A6F5A"/>
      <path d="M42 14 L34 28 L28 22 Z" fill="#2A6F5A" opacity="0.75"/>
      <path d="M42 42 L28 34 L34 28 Z" fill="#2A6F5A" opacity="0.55"/>
      <path d="M14 42 L22 28 L28 34 Z" fill="#2A6F5A" opacity="0.35"/>
      <circle cx="28" cy="28" r="3" fill="currentColor"/>
    </svg>
  );
}

interface LogoProps {
  variant?: "light" | "dark";
  showIcon?: boolean;
  iconSize?: number;
  className?: string;
}

export function Logo({ variant = "light", showIcon = true, iconSize = 36, className }: LogoProps) {
  const textColor = variant === "light" ? "#0D0D0D" : "#FAFAF7";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`} aria-label="SquareMind">
      {showIcon && (
        <LogoIcon size={iconSize} className={variant === "light" ? "text-ink" : "text-chalk"} />
      )}
      <span className="font-sans font-bold text-[22px] tracking-[-0.5px] leading-none">
        <span style={{ color: textColor }}>Square</span>
        <span className="text-sage">Mind</span>
      </span>
    </span>
  );
}
