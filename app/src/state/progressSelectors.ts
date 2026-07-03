import type { Habit } from '@/types';
import type { HabitState } from './habitsState';
import { getDateStrForJanuary2026 } from './habitsState';

export const DAYS_IN_MONTH = 31;

export const computeOverallCompletion = (state: HabitState): number => {
  const total = state.activeHabitIds.length * DAYS_IN_MONTH;
  if (total === 0) return 0;

  let completedUnits = 0;
  for (let day = 1; day <= DAYS_IN_MONTH; day++) {
    const dateStr = getDateStrForJanuary2026(day);
    for (const habitId of state.activeHabitIds) {
      const habit = state.habits.find(h => h.id === habitId);
      if (!habit) continue;
      completedUnits += (habit.completions[dateStr] ?? 0);
    }
  }

  // units are 0, 0.5, 1 where 1 = full completion
  // Each habit per day contributes max 1 unit, so overall = completed/max
  return Math.round((completedUnits / total) * 100);
};

export const computeDayStats = (state: HabitState) => {
  const dayStats: { day: number; actual: number; goal: number; progress: number }[] = [];
  const activeCount = state.activeHabitIds.length;

  for (let day = 1; day <= DAYS_IN_MONTH; day++) {
    const dateStr = getDateStrForJanuary2026(day);
    let actual = 0;
    for (const habitId of state.activeHabitIds) {
      const habit = state.habits.find(h => h.id === habitId);
      if (!habit) continue;
      actual += habit.completions[dateStr] ?? 0;
    }
    const goal = activeCount;
    const progress = goal > 0 ? Math.round((actual / goal) * 100) : 0;

    dayStats.push({
      day,
      actual: Math.round(actual * 10) / 10,
      goal,
      progress,
    });
  }

  return dayStats;
};

export const computeWeekStats = (state: HabitState) => {
  // January 2026 has 31 days. We'll do 5 weeks of 1..31 like the mock.
  const weeks: { week: number; completed: number; total: number }[] = [];
  const activeCount = state.activeHabitIds.length;

  for (let week = 1; week <= 5; week++) {
    const startDay = (week - 1) * 7 + 1;
    const endDay = Math.min(week * 7, DAYS_IN_MONTH);

    let completed = 0;
    let total = 0;

    for (let day = startDay; day <= endDay; day++) {
      const dateStr = getDateStrForJanuary2026(day);
      for (const habitId of state.activeHabitIds) {
        const habit = state.habits.find(h => h.id === habitId);
        if (!habit) continue;
        completed += habit.completions[dateStr] ?? 0;
        total += 1;
      }
    }

    // completed is 0..total in units of 0/0.5/1
    weeks.push({ week, completed: Math.round(completed), total: total > 0 ? total : activeCount * (endDay - startDay + 1) });
  }

  return weeks;
};

export const computeHabitRankings = (state: HabitState) => {
  const active = new Set(state.activeHabitIds);
  const activeHabits = state.habits.filter(h => active.has(h.id));

  return activeHabits
    .map(habit => {
      let completed = 0;
      for (let day = 1; day <= DAYS_IN_MONTH; day++) {
        const dateStr = getDateStrForJanuary2026(day);
        completed += habit.completions[dateStr] ?? 0;
      }
      // Each habit has 31 days max completion 1 per day => max = 31 units.
      const completion = Math.round((completed / DAYS_IN_MONTH) * 100);
      return { name: habit.name, completion };
    })
    .sort((a, b) => b.completion - a.completion);
};

export const updateHabitName = (habits: Habit[], habitId: string, name: string): Habit[] => {
  return habits.map(h => (h.id === habitId ? { ...h, name } : h));
};

