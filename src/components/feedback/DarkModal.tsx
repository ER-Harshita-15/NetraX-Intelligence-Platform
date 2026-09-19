import React, { useEffect } from 'react';
import { X, Shield } from 'lucide-react';
import { Button } from '../buttons/Button';

export interface DarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  isPrimaryLoading?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  showFooter?: boolean;
}

export const DarkModal: React.FC<DarkModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  primaryActionLabel = 'Confirm Action',
  onPrimaryAction,
  secondaryActionLabel = 'Cancel',
  onSecondaryAction,
  isPrimaryLoading = false,
  maxWidth = 'md',
  showFooter = true,
}) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }[maxWidth];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-[3px] animate-fadeIn"
      onClick={onClose}
    >
      {/* Modal Dialog Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full ${maxWidthClasses} rounded-[12px] bg-[#151D26] border border-[#26313D] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]`}
      >
        {/* Header */}
        <div className="h-14 px-5 border-b border-[#26313D] flex items-center justify-between bg-[#111820] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[6px] bg-[#151D26] border border-[#2DD4FF]/30 flex items-center justify-center text-[#2DD4FF]">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-[#F8FAFC] leading-none">
                {title}
              </h3>
              {subtitle && (
                <p className="text-[11px] text-[#64748B] font-mono mt-1 leading-none">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-[6px] text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#151D26] flex items-center justify-center transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-[13px] text-[#94A3B8]">
          {children}
        </div>

        {/* Footer */}
        {showFooter && (
          <div className="h-14 px-5 border-t border-[#26313D] flex items-center justify-end gap-2.5 bg-[#111820] shrink-0">
            <Button
              variant="secondary"
              size="sm"
              onClick={onSecondaryAction || onClose}
            >
              {secondaryActionLabel}
            </Button>
            {onPrimaryAction && (
              <Button
                variant="primary"
                size="sm"
                isLoading={isPrimaryLoading}
                onClick={onPrimaryAction}
              >
                {primaryActionLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
