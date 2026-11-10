import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

type FieldProps = {
  id: string;
  label: string;
  error?: string | null;
  hint?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

/** Eingabefeld mit schwebendem Label und verständlicher Fehlermeldung. */
export function Field({ id, label, error, hint, className = "", ...input }: FieldProps) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label className="field" htmlFor={id}>
        <input
          id={id}
          placeholder=" "
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className="field-input"
          {...input}
        />
        <span className="field-label">
          {label}
          {input.required ? "" : <span className="text-ink-muted/70"> (optional)</span>}
        </span>
      </label>
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.78rem] text-ink-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[0.8rem] text-error">
          {error}
        </p>
      )}
    </div>
  );
}

type SelectProps = {
  id: string;
  label: string;
  options: { value: string; label: string }[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export function SelectField({ id, label, options, className = "", ...rest }: SelectProps) {
  return (
    <div className={className}>
      <label className="field" htmlFor={id}>
        <select id={id} className="field-input cursor-pointer pr-6" {...rest}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="field-label">{label}</span>
        <svg aria-hidden="true" viewBox="0 0 12 8" className="pointer-events-none absolute right-0 bottom-4 h-2 w-3 text-ink-muted" fill="none" stroke="currentColor">
          <path d="m1 1.5 5 5 5-5" />
        </svg>
      </label>
    </div>
  );
}
