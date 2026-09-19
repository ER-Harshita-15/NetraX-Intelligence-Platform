import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  FileText,
  User,
  Phone,
  Car,
  Cctv,
  MapPin,
  Briefcase,
  ArrowRight,
  Sparkles,
  Command
} from 'lucide-react';
import { SearchService, SearchResultItem } from '../../services/searchService';

export interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (result: SearchResultItem) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setResults(SearchService.search(query));
    }
  }, [isOpen]);

  useEffect(() => {
    setResults(SearchService.search(query));
  }, [query]);

  if (!isOpen) return null;

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'case':
        return <Briefcase className="w-4 h-4 text-[#2DD4FF]" />;
      case 'fir':
        return <FileText className="w-4 h-4 text-[#F59E0B]" />;
      case 'person':
        return <User className="w-4 h-4 text-[#EF4444]" />;
      case 'vehicle':
        return <Car className="w-4 h-4 text-[#22C55E]" />;
      case 'phone':
        return <Phone className="w-4 h-4 text-[#A855F7]" />;
      case 'cctv':
        return <Cctv className="w-4 h-4 text-[#06B6D4]" />;
      case 'location':
        return <MapPin className="w-4 h-4 text-[#EC4899]" />;
      default:
        return <Search className="w-4 h-4 text-[#94A3B8]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-[#0B0F14]/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-[#0F151C] border border-[#26313D] rounded-[10px] shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#26313D] bg-[#151D26] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#2DD4FF] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search FIR #, Person, Phone (+91...), Plate (CG 10...), Case..."
            className="flex-1 bg-transparent text-[15px] text-[#F8FAFC] placeholder-[#64748B] outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#94A3B8] hover:text-[#F8FAFC] p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#0F151C] border border-[#26313D] text-[10px] font-mono text-[#64748B]">
            <Command className="w-3 h-3" />
            <span>ESC to close</span>
          </div>
          <button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#F8FAFC] p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results / Suggestion List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {results.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <Search className="w-8 h-8 text-[#26313D] mx-auto" />
              <p className="text-[13px] text-[#64748B]">
                No matching records found for "{query}".
              </p>
              <p className="text-[11px] font-mono text-[#475569]">
                Try searching: "102/2026", "Rahul", "98271", "White SUV", or "Kotwali"
              </p>
            </div>
          ) : (
            results.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectResult(item);
                  onClose();
                }}
                className="w-full text-left p-3 rounded-[6px] hover:bg-[#151D26] border border-transparent hover:border-[#26313D] transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-[6px] bg-[#0F151C] border border-[#26313D] group-hover:border-[#2DD4FF]/40 transition-colors">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-[#F8FAFC] group-hover:text-[#2DD4FF] transition-colors">
                        {item.title}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-[#1C2633] text-[#94A3B8]">
                        {item.badge}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#94A3B8] block">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-[#2DD4FF] group-hover:translate-x-0.5 transition-all" />
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#151D26] border-t border-[#26313D] text-[11px] font-mono text-[#64748B] flex items-center justify-between">
          <span>Multi-source index across FIRs, CDR, Surveillance & Criminal Intelligence</span>
          <span>{results.length} record{results.length === 1 ? '' : 's'} indexed</span>
        </div>
      </div>
    </div>
  );
};
