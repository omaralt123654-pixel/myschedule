import DonutChart from './DonutChart';
import GoalBox from './GoalBox';
import WeeklyProgress from './WeeklyProgress';
import TopHabits from './TopHabits';
import { getOverallCompletion, getWeekStats, getHabitRankings, getGoalTotals } from '@/lib/stats';
import type { Habit, DayStats } from '@/types';

interface RightPanelProps {
  habits: Habit[];
  year: number;
  month: number;
  dayStats: DayStats[];
}

export default function RightPanel({ habits, year, month, dayStats }: RightPanelProps) {
  const overallCompletion = getOverallCompletion(dayStats);
  const weekStats = getWeekStats(dayStats);
  const rankings = getHabitRankings(habits, year, month);
  const goalTotals = getGoalTotals(dayStats);

  return (
    <div className="w-[200px] border-l border-[#444444] bg-[#111111] flex flex-col gap-3 p-3 overflow-y-auto">
      <DonutChart percentage={overallCompletion} />
      <GoalBox {...goalTotals} />
      <WeeklyProgress weekStats={weekStats} />
      <TopHabits rankings={rankings} />
    </div>
  );
}
