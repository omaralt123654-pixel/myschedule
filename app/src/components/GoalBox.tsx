import { GOAL_TOTAL, COMPLETED_TOTAL, REMAINING } from '@/data/mockData';

export default function GoalBox() {
  return (
    <div className="border border-[#444444] bg-[#111111] p-3">
      <h3 className="text-[10px] text-[#CFCFCF] uppercase tracking-wider mb-2">Monthly Goal</h3>
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-[#CFCFCF]">Goal</span>
          <span className="text-sm text-white font-semibold">{GOAL_TOTAL}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-[#CFCFCF]">Completed</span>
          <span className="text-sm text-white font-semibold">{COMPLETED_TOTAL}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-[#CFCFCF]">Left</span>
          <span className="text-sm text-[#2F80FF] font-semibold">{REMAINING}</span>
        </div>
      </div>
    </div>
  );
}
