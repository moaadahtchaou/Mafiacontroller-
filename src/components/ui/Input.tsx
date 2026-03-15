import React, { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = true,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <div className={`flex flex-col gap-2 ${widthStyle} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-zinc-400">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`px-4 py-3 rounded-xl bg-zinc-900 border ${
          error ? 'border-mafia-red' : 'border-zinc-800'
        } focus:outline-none focus:ring-2 focus:ring-zinc-600 transition-all text-white placeholder:text-zinc-600`}
        {...props}
      />
      {error && <span className="text-sm text-mafia-red">{error}</span>}
    </div>
  );
};
