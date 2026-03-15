import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'px-6 py-4 rounded-xl font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-zinc-100 text-zinc-900 hover:bg-white',
    secondary: 'bg-zinc-800 text-white hover:bg-zinc-700',
    danger: 'bg-mafia-red text-white hover:bg-red-400',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
