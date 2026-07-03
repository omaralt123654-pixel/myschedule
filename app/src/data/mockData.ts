import type { Habit, DayStats, WeekStats } from '@/types';

export const HABITS: Habit[] = [
  { id: '1', name: 'Wake up at 05:00', color: '#2F80FF', completions: {} },
  { id: '2', name: 'Gym', color: '#2F80FF', completions: {} },
  { id: '3', name: 'Reading / Learning', color: '#2F80FF', completions: {} },
  { id: '4', name: 'Daily Planning', color: '#2F80FF', completions: {} },
  { id: '5', name: 'No Gaming', color: '#2F80FF', completions: {} },
  { id: '6', name: 'Project Work', color: '#2F80FF', completions: {} },
];

// Generate mock completion data for January 2026
const generateCompletions = (): Record<string, number> => {
  const completions: Record<string, number> = {};
  for (let day = 1; day <= 31; day++) {
    const dateStr = `2026-01-${day.toString().padStart(2, '0')}`;
    const rand = Math.random();
    if (rand > 0.3) {
      completions[dateStr] = rand > 0.7 ? 1 : 0.5;
    } else {
      completions[dateStr] = 0;
    }
  }
  return completions;
};

HABITS.forEach(habit => {
  habit.completions = generateCompletions();
});

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const GOAL_TOTAL = 373;
export const COMPLETED_TOTAL = 324;
export const REMAINING = GOAL_TOTAL - COMPLETED_TOTAL;

export const generateDayStats = (): DayStats[] => {
  const stats: DayStats[] = [];
  for (let day = 1; day <= 31; day++) {
    const dateStr = `2026-01-${day.toString().padStart(2, '0')}`;
    let actual = 0;
    let goal = HABITS.length;
    HABITS.forEach(habit => {
      actual += habit.completions[dateStr] || 0;
    });
    stats.push({
      day,
      actual: Math.round(actual * 10) / 10,
      goal,
      progress: Math.round((actual / goal) * 100),
    });
  }
  return stats;
};

export const DAY_STATS: DayStats[] = generateDayStats();

export const generateWeekStats = (): WeekStats[] => {
  const weeks: WeekStats[] = [];
  for (let week = 1; week <= 5; week++) {
    const startDay = (week - 1) * 7 + 1;
    const endDay = Math.min(week * 7, 31);
    let completed = 0;
    let total = 0;
    for (let day = startDay; day <= endDay; day++) {
      const dateStr = `2026-01-${day.toString().padStart(2, '0')}`;
      HABITS.forEach(habit => {
        completed += habit.completions[dateStr] || 0;
        total += 1;
      });
    }
    weeks.push({ week, completed: Math.round(completed), total });
  }
  return weeks;
};

export const WEEK_STATS: WeekStats[] = generateWeekStats();

export const getOverallCompletion = (): number => {
  let total = 0;
  let completed = 0;
  DAY_STATS.forEach(day => {
    total += day.goal;
    completed += day.actual;
  });
  return Math.round((completed / total) * 100);
};

export const getHabitRankings = (): { name: string; completion: number }[] => {
  return HABITS.map(habit => {
    let total = 0;
    let completed = 0;
    Object.values(habit.completions).forEach(v => {
      total += 1;
      completed += v;
    });
    return {
      name: habit.name,
      completion: Math.round((completed / 31) * 100),
    };
  }).sort((a, b) => b.completion - a.completion);
};
