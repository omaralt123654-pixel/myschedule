import DonutChart from './DonutChart';
import GoalBox from './GoalBox';
import WeeklyProgress from './WeeklyProgress';
import TopHabits from './TopHabits';
import DailyProgressGraph from './DailyProgressGraph';
import AnalysisTable from './AnalysisTable';
import { getOverallCompletion } from '@/data/mockData';

export default function StatsView() {
  const overallCompletion = getOverallCompletion();

  return (
    <div className="flex-1 bg-[#000000] overflow-auto">
      <div className="flex h-full">
        {/* Main stats area */}
        <div className="flex-1 flex flex-col">
          {/* Daily progress graph at top */}
          <DailyProgressGraph />

          {/* Analysis table below */}
          <AnalysisTable />
        </div>

        {/* Right sidebar with summary stats */}
        <div className="w-[200px] border-l border-[#444444] bg-[#111111] flex flex-col gap-3 p-3 overflow-y-auto">
          <DonutChart percentage={overallCompletion} />
          <GoalBox />
          <WeeklyProgress />
          <TopHabits />
        </div>
      </div>
    </div>
  );
}
