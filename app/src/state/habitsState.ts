import { HABITS as MOCK_HABITS } from '@/data/mockData';
import type { Habit } from '@/types';

type CompletionValue = 0 | 0.5 | 1;

export interface HabitState {
  habits: Habit[];
  activeHabitIds: string[]; // which habits appear in the grid
}

const pad2 = (n: number) => n.toString().padStart(2, '0');

const cloneHabits = (habits: Habit[]): Habit[] =>
  habits.map(h => ({
    ...h,
    completions: { ...h.completions },
  }));

const getInitialHabits = (): Habit[] => cloneHabits(MOCK_HABITS);

export const getInitialHabitState = (): HabitState => {
  const habits = getInitialHabits();
  return {
    habits,
    activeHabitIds: habits.map(h => h.id),
  };
};

export const getDateStrForJanuary2026 = (day: number) => `2026-01-${pad2(day)}`;

export const toggleCompletion = (
  current: CompletionValue | undefined
): CompletionValue => {
  const v = current ?? 0;
  if (v === 0) return 0.5;
  if (v === 0.5) return 1;
  return 0;
};

export const setCompletion = (
  current: CompletionValue | undefined,
  next: CompletionValue
): CompletionValue => {
  const _ = current;
  return next;
};

export const getActiveHabits = (state: HabitState): Habit[] => {
  const active = new Set(state.activeHabitIds);
  return state.habits.filter(h => active.has(h.id));
};

export const resetHabitState = (): HabitState => getInitialHabitState();

