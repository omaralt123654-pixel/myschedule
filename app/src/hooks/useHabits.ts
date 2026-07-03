import { useCallback, useEffect, useState } from 'react';
import type { Habit } from '@/types';

const STORAGE_KEY = 'habit-tracker:habits';

const DEFAULT_HABITS: Habit[] = [
  { id: '1', name: 'Wake up at 05:00', color: '#2F80FF', completions: {} },
  { id: '2', name: 'Gym', color: '#2F80FF', completions: {} },
  { id: '3', name: 'Reading / Learning', color: '#2F80FF', completions: {} },
  { id: '4', name: 'Daily Planning', color: '#2F80FF', completions: {} },
  { id: '5', name: 'No Gaming', color: '#2F80FF', completions: {} },
  { id: '6', name: 'Project Work', color: '#2F80FF', completions: {} },
];

function loadHabits(): Habit[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore corrupt storage, fall back to defaults
  }
  return DEFAULT_HABITS;
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(loadHabits);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    } catch {
      // storage full/unavailable - fail silently, app still works in-memory
    }
  }, [habits]);

  // Clicking a cell cycles: empty -> half -> full -> empty
  const cycleCompletion = useCallback((habitId: string, date: string) => {
    setHabits(prev =>
      prev.map(habit => {
        if (habit.id !== habitId) return habit;
        const current = habit.completions[date] || 0;
        const next = current === 0 ? 0.5 : current === 0.5 ? 1 : 0;
        const completions = { ...habit.completions };
        if (next === 0) {
          delete completions[date];
        } else {
          completions[date] = next;
        }
        return { ...habit, completions };
      })
    );
  }, []);

  const setCompletion = useCallback((habitId: string, date: string, value: number) => {
    setHabits(prev =>
      prev.map(habit => {
        if (habit.id !== habitId) return habit;
        const completions = { ...habit.completions };
        if (value === 0) {
          delete completions[date];
        } else {
          completions[date] = value;
        }
        return { ...habit, completions };
      })
    );
  }, []);

  const addHabit = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setHabits(prev => [
      ...prev,
      { id: `${Date.now()}`, name: trimmed, color: '#2F80FF', completions: {} },
    ]);
  }, []);

  const deleteHabit = useCallback((habitId: string) => {
    setHabits(prev => prev.filter(h => h.id !== habitId));
  }, []);

  const renameHabit = useCallback((habitId: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setHabits(prev => prev.map(h => (h.id === habitId ? { ...h, name: trimmed } : h)));
  }, []);

  return { habits, cycleCompletion, setCompletion, addHabit, deleteHabit, renameHabit };
}
