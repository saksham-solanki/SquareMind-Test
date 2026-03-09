"use client";

export interface CalcFieldOption {
  value: string;
  label: string;
}

interface CalcFieldProps {
  label: string;
  value: number | string;
  onChange: (v: number | string) => void;
  hint?: string;
  min?: number;
  max?: number;
  step?: number;
  type?: "number" | "select";
  options?: CalcFieldOption[];
}

export default function CalcField({
  label,
  value,
  onChange,
  hint,
  min,
  max,
  step,
  type = "number",
  options,
}: CalcFieldProps) {
  const inputClasses =
    "w-full px-[18px] py-3.5 border-[1.5px] border-gray-300 rounded-[12px] text-[15px] bg-white text-ink focus:outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(13,13,13,0.06)] transition-all tracking-[-0.01em]";

  return (
    <div>
      <label className="block text-[13px] font-semibold text-gray-600 mb-1.5 tracking-[-0.01em]">
        {label}
      </label>
      {type === "select" && options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClasses}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(+e.target.value)}
          min={min}
          max={max}
          step={step}
          className={inputClasses}
        />
      )}
      {hint && (
        <div className="text-[12px] text-gray-400 mt-1">{hint}</div>
      )}
    </div>
  );
}
