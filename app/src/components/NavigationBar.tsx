import { useState } from 'react';
import { Calendar, ChevronDown, Grid3X3, BarChart3, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react';
import { MONTHS } from '@/lib/stats';
import type { ViewType } from '@/types';

interface NavigationBarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  year: number;
  month: number;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
}

export default function NavigationBar({
  currentView,
  onViewChange,
  year,
  month,
  onYearChange,
  onMonthChange,
}: NavigationBarProps) {
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 7 }, (_, i) => currentYear - 3 + i);

  const goToPrevMonth = () => {
    if (month === 0) {
      onMonthChange(11);
      onYearChange(year - 1);
    } else {
      onMonthChange(month - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 11) {
      onMonthChange(0);
      onYearChange(year + 1);
    } else {
      onMonthChange(month + 1);
    }
  };

  const goToToday = () => {
    const now = new Date();
    onYearChange(now.getFullYear());
    onMonthChange(now.getMonth());
  };

  return (
    <div className="h-12 flex items-center justify-between px-4 border-b border-[#444444] bg-[#111111]">
      {/* Left controls */}
      <div className="flex items-center gap-2">
        {/* Prev / next month */}
        <button
          onClick={goToPrevMonth}
          className="flex items-center justify-center w-7 h-7 border border-[#444444] bg-[#111111] text-[#CFCFCF] hover:border-[#2F80FF] hover:text-[#2F80FF] transition-colors duration-150"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Year selector */}
        <div className="relative">
          <button
            onClick={() => { setShowYearDropdown(!showYearDropdown); setShowMonthDropdown(false); }}
            className="flex items-center gap-1 px-3 py-1.5 border border-[#444444] bg-[#111111] text-white text-sm hover:border-[#2F80FF] transition-colors duration-150"
          >
            {year}
            <ChevronDown className="w-3 h-3 text-[#CFCFCF]" />
          </button>
          {showYearDropdown && (
            <div className="absolute top-full left-0 mt-1 border border-[#444444] bg-[#111111] z-50 animate-fade-in max-h-48 overflow-y-auto">
              {years.map(y => (
                <button
                  key={y}
                  onClick={() => { onYearChange(y); setShowYearDropdown(false); }}
                  className={`block w-full px-3 py-1.5 text-sm text-left hover:bg-[#2F80FF] hover:text-white transition-colors ${y === year ? 'text-[#2F80FF]' : 'text-white'}`}
                >
                  {y}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Month selector */}
        <div className="relative">
          <button
            onClick={() => { setShowMonthDropdown(!showMonthDropdown); setShowYearDropdown(false); }}
            className="flex items-center gap-1 px-3 py-1.5 border border-[#444444] bg-[#111111] text-white text-sm hover:border-[#2F80FF] transition-colors duration-150"
          >
            {MONTHS[month]}
            <ChevronDown className="w-3 h-3 text-[#CFCFCF]" />
          </button>
          {showMonthDropdown && (
            <div className="absolute top-full left-0 mt-1 border border-[#444444] bg-[#111111] z-50 animate-fade-in max-h-48 overflow-y-auto">
              {MONTHS.map((m, i) => (
                <button
                  key={m}
                  onClick={() => { onMonthChange(i); setShowMonthDropdown(false); }}
                  className={`block w-full px-3 py-1.5 text-sm text-left hover:bg-[#2F80FF] hover:text-white transition-colors ${i === month ? 'text-[#2F80FF]' : 'text-white'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={goToNextMonth}
          className="flex items-center justify-center w-7 h-7 border border-[#444444] bg-[#111111] text-[#CFCFCF] hover:border-[#2F80FF] hover:text-[#2F80FF] transition-colors duration-150"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Jump to today */}
        <button
          onClick={goToToday}
          title="Jump to current month"
          className="flex items-center justify-center w-8 h-8 border border-[#444444] bg-[#111111] text-[#CFCFCF] hover:border-[#2F80FF] hover:text-[#2F80FF] transition-colors duration-150"
        >
          <Calendar className="w-4 h-4" />
        </button>
      </div>

      {/* Right view toggles */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onViewChange('grid')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-sm border transition-colors duration-150 ${
            currentView === 'grid'
              ? 'bg-[#2F80FF] border-[#2F80FF] text-white'
              : 'border-[#444444] text-[#CFCFCF] hover:border-[#2F80FF]'
          }`}
        >
          <Grid3X3 className="w-3.5 h-3.5" />
          Grid
        </button>
        <button
          onClick={() => onViewChange('calendar')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-sm border transition-colors duration-150 ${
            currentView === 'calendar'
              ? 'bg-[#2F80FF] border-[#2F80FF] text-white'
              : 'border-[#444444] text-[#CFCFCF] hover:border-[#2F80FF]'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          Calendar
        </button>
        <button
          onClick={() => onViewChange('stats')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-sm border transition-colors duration-150 ${
            currentView === 'stats'
              ? 'bg-[#2F80FF] border-[#2F80FF] text-white'
              : 'border-[#444444] text-[#CFCFCF] hover:border-[#2F80FF]'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          Stats
        </button>
      </div>
    </div>
  );
}
