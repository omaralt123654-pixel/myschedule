import type { Habit, DayStats, WeekStats } from '@/types';
import { dateKey, getDaysInMonth } from '@/lib/dateUtils';

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function getDayStats(habits: Habit[], year: number, month: number): DayStats[] {
  const daysInMonth = getDaysInMonth(year, month);
  const goal = habits.length;
  const stats: DayStats[] = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const key = dateKey(year, month, day);
    let actual = 0;
    habits.forEach(habit => {
      actual += habit.completions[key] || 0;
    });
    stats.push({
      day,
      actual: Math.round(actual * 10) / 10,
      goal,
      progress: goal > 0 ? Math.round((actual / goal) * 100) : 0,
    });
  }
  return stats;
}

export function getWeekStats(dayStats: DayStats[]): WeekStats[] {
  const weeks: WeekStats[] = [];
  const totalDays = dayStats.length;
  for (let week = 1; week <= Math.ceil(totalDays / 7); week++) {
    const startDay = (week - 1) * 7 + 1;
    const endDay = Math.min(week * 7, totalDays);
    let completed = 0;
    let total = 0;
    for (let day = startDay; day <= endDay; day++) {
      const stat = dayStats[day - 1];
      completed += stat.actual;
      total += stat.goal;
    }
    weeks.push({ week, completed: Math.round(completed), total });
  }
  return weeks;
}

export function getOverallCompletion(dayStats: DayStats[]): number {
  let total = 0;
  let completed = 0;
  dayStats.forEach(day => {
    total += day.goal;
    completed += day.actual;
  });
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

export function getGoalTotals(dayStats: DayStats[]) {
  const goalTotal = dayStats.reduce((sum, d) => sum + d.goal, 0);
  const completedTotal = Math.round(dayStats.reduce((sum, d) => sum + d.actual, 0));
  return {
    goalTotal,
    completedTotal,
    remaining: goalTotal - completedTotal,
  };
}

export function getHabitRankings(
  habits: Habit[],
  year: number,
  month: number
): { id: string; name: string; completion: number }[] {
  const daysInMonth = getDaysInMonth(year, month);
  return habits
    .map(habit => {
      let completed = 0;
      for (let day = 1; day <= daysInMonth; day++) {
        completed += habit.completions[dateKey(year, month, day)] || 0;
      }
      return {
        id: habit.id,
        name: habit.name,
        completion: daysInMonth > 0 ? Math.round((completed / daysInMonth) * 100) : 0,
      };
    })
    .sort((a, b) => b.completion - a.completion);
}
