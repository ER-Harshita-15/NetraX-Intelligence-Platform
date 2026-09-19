import React, { useState, useRef } from 'react';
import { Search, X, Command, SlidersHorizontal } from 'lucide-react';

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
  onClear?: () => void;
  onFilterClick?: () => void;
  className?: string;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search cases, evidence, vehicles…',
  value: controlledValue,
  onChange,
  onClear,
  onFilterClick,
  className = '',
  autoFocus = false,
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newVal);
    }
    onChange?.(newVal);
  };

  const handleClear = () => {
    if (controlledValue === undefined) {
      setInternalValue('');
    }
    onClear?.();
    onChange?.('');
    inputRef.current?.focus();
  };

  return (
    <div
      className={`relative flex items-center h-10 w-full rounded-[6px] bg-[#0F151C] border transition-all duration-150 ${
        isFocused
          ? 'border-[#2DD4FF] ring-1 ring-[#2DD4FF]/30 bg-[#111820]'
          : 'border-[#26313D] hover:border-[#26313D]/90'
      } ${className}`}
    >
      {/* Search Icon */}
      <div className="pl-3.5 pr-2.5 text-[#64748B] flex items-center pointer-events-none">
        <Search className={`w-4 h-4 transition-colors ${isFocused ? 'text-[#2DD4FF]' : 'text-[#64748B]'}`} />
      </div>

      {/* Input Element */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        autoFocus={autoFocus}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="w-full bg-transparent text-[13px] text-[#F8FAFC] placeholder-[#64748B] focus:outline-none font-normal"
      />

      {/* Clear Button */}
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="p-1 mr-1 text-[#64748B] hover:text-[#F8FAFC] rounded transition-colors cursor-pointer"
          title="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Keyboard Shortcut Indicator */}
      {!value && (
        <div className="pr-3 hidden sm:flex items-center gap-0.5 text-[10px] font-mono text-[#64748B] pointer-events-none select-none">
          <span className="px-1.5 py-0.5 rounded bg-[#151D26] border border-[#26313D]">⌘K</span>
        </div>
      )}

      {/* Optional Filters Trigger */}
      {onFilterClick && (
        <button
          type="button"
          onClick={onFilterClick}
          className="mr-2 p-1.5 rounded-[4px] bg-[#151D26] hover:bg-[#1E293B] border border-[#26313D] text-[#94A3B8] hover:text-[#2DD4FF] transition-colors cursor-pointer"
          title="Filter Parameters"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
