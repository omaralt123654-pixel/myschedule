import DonutChart from './DonutChart';
import GoalBox from './GoalBox';
import WeeklyProgress from './WeeklyProgress';
import TopHabits from './TopHabits';
import { getOverallCompletion } from '@/data/mockData';

export default function RightPanel() {
  const overallCompletion = getOverallCompletion();

  return (
    <div className="w-[200px] border-l border-[#444444] bg-[#111111] flex flex-col gap-3 p-3 overflow-y-auto">
      <DonutChart percentage={overallCompletion} />
      <GoalBox />
      <WeeklyProgress />
      <TopHabits />
    </div>
  );
}
