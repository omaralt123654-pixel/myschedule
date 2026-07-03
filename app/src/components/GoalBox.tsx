interface GoalBoxProps {
  goalTotal: number;
  completedTotal: number;
  remaining: number;
}

export default function GoalBox({ goalTotal, completedTotal, remaining }: GoalBoxProps) {
  return (
    <div className="border border-[#444444] bg-[#111111] p-3">
      <h3 className="text-[10px] text-[#CFCFCF] uppercase tracking-wider mb-2">Monthly Goal</h3>
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-[#CFCFCF]">Goal</span>
          <span className="text-sm text-white font-semibold">{goalTotal}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-[#CFCFCF]">Completed</span>
          <span className="text-sm text-white font-semibold">{completedTotal}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-[#CFCFCF]">Left</span>
          <span className="text-sm text-[#2F80FF] font-semibold">{remaining}</span>
        </div>
      </div>
    </div>
  );
}
