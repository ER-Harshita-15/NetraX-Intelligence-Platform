import React from 'react';
import { Loader2 } from 'lucide-react';
import { ButtonVariant, ButtonSize } from '../../types';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  ...props
}) => {
  // Base structural styles: 8px rhythm, single line labels, no wrap
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-150 select-none whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#2DD4FF]/40 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98] cursor-pointer';

  // Variant classes according to NETRAX specs
  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      'bg-[#2DD4FF] text-[#0B0F14] font-semibold hover:bg-[#2DD4FF]/90 border border-transparent shadow-[0_1px_4px_rgba(45,212,255,0.2)]',
    secondary:
      'bg-[#151D26] text-[#F8FAFC] border border-[#26313D] hover:bg-[#1E293B] hover:border-[#2DD4FF]/40',
    ghost:
      'bg-transparent text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#151D26] border border-transparent',
    danger:
      'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30 hover:bg-[#EF4444]/25 hover:border-[#EF4444]/50',
  };

  // Size classes matching radius-sm (6px) and 2:1 horizontal to vertical padding ratio
  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'text-[12px] h-8 px-3 gap-1.5 rounded-[6px]',
    md: 'text-[13px] h-9 px-4 gap-2 rounded-[6px]',
    lg: 'text-[14px] h-11 px-5 gap-2.5 rounded-[8px]',
  };

  const iconSizes: Record<ButtonSize, string> = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-4.5 h-4.5',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className={`${iconSizes[size]} animate-spin shrink-0`} />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
