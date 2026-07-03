import DonutChart from './DonutChart';
import GoalBox from './GoalBox';
import WeeklyProgress from './WeeklyProgress';
import TopHabits from './TopHabits';
import DailyProgressGraph from './DailyProgressGraph';
import AnalysisTable from './AnalysisTable';
import { getOverallCompletion, getWeekStats, getHabitRankings, getGoalTotals } from '@/lib/stats';
import type { Habit, DayStats } from '@/types';

interface StatsViewProps {
  habits: Habit[];
  year: number;
  month: number;
  dayStats: DayStats[];
}

export default function StatsView({ habits, year, month, dayStats }: StatsViewProps) {
  const overallCompletion = getOverallCompletion(dayStats);
  const weekStats = getWeekStats(dayStats);
  const rankings = getHabitRankings(habits, year, month);
  const goalTotals = getGoalTotals(dayStats);

  return (
    <div className="flex-1 bg-[#000000] overflow-auto">
      <div className="flex h-full">
        {/* Main stats area */}
        <div className="flex-1 flex flex-col">
          <DailyProgressGraph dayStats={dayStats} />
          <AnalysisTable dayStats={dayStats} />
        </div>

        {/* Right sidebar with summary stats */}
        <div className="w-[200px] border-l border-[#444444] bg-[#111111] flex flex-col gap-3 p-3 overflow-y-auto">
          <DonutChart percentage={overallCompletion} />
          <GoalBox {...goalTotals} />
          <WeeklyProgress weekStats={weekStats} />
          <TopHabits rankings={rankings} />
        </div>
      </div>
    </div>
  );
}
