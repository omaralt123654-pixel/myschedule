import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { DayStats } from '@/types';

interface AnalysisTableProps {
  dayStats: DayStats[];
}

export default function AnalysisTable({ dayStats }: AnalysisTableProps) {
  const [page, setPage] = useState(0);
  const itemsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(dayStats.length / itemsPerPage));
  const paginatedStats = dayStats.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  useEffect(() => {
    setPage(0);
  }, [dayStats]);

  const getProgressColor = (progress: number): string => {
    if (progress === 100) return 'text-[#2F80FF]';
    if (progress >= 80) return 'text-white';
    return 'text-[#444444]';
  };

  return (
    <div className="border-t border-[#444444] bg-[#111111] p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[10px] text-[#CFCFCF] uppercase tracking-wider">Daily Analysis</h3>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="w-5 h-5 flex items-center justify-center border border-[#444444] text-[#CFCFCF] hover:border-[#2F80FF] disabled:opacity-30 disabled:hover:border-[#444444] transition-colors"
          >
            <ChevronLeft className="w-3 h-3" />
          </button>
          <span className="text-[10px] text-[#CFCFCF] px-2">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page === totalPages - 1}
            className="w-5 h-5 flex items-center justify-center border border-[#444444] text-[#CFCFCF] hover:border-[#2F80FF] disabled:opacity-30 disabled:hover:border-[#444444] transition-colors"
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="border border-[#444444]">
        <div className="flex bg-[#1a1a1a] border-b border-[#444444]">
          <div className="w-16 px-3 py-2 text-[10px] text-[#CFCFCF] uppercase border-r border-[#444444]">Day</div>
          <div className="flex-1 px-3 py-2 text-[10px] text-[#CFCFCF] uppercase border-r border-[#444444]">Actual</div>
          <div className="flex-1 px-3 py-2 text-[10px] text-[#CFCFCF] uppercase border-r border-[#444444]">Goal</div>
          <div className="w-20 px-3 py-2 text-[10px] text-[#CFCFCF] uppercase">Progress %</div>
        </div>

        {paginatedStats.map((day) => (
          <div key={day.day} className="flex border-b border-[#444444] last:border-b-0 hover:bg-[#1a1a1a] transition-colors">
            <div className="w-16 px-3 py-2 text-xs text-white border-r border-[#444444]">{day.day}</div>
            <div className="flex-1 px-3 py-2 text-xs text-white border-r border-[#444444]">{day.actual}</div>
            <div className="flex-1 px-3 py-2 text-xs text-white border-r border-[#444444]">{day.goal}</div>
            <div className={`w-20 px-3 py-2 text-xs font-semibold ${getProgressColor(day.progress)}`}>
              {day.progress}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
