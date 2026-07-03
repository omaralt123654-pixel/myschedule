export interface Habit {
  id: string;
  name: string;
  color: string;
  completions: Record<string, number>; // date string -> 0, 0.5, 1
}

export interface DayStats {
  day: number;
  actual: number;
  goal: number;
  progress: number;
}

export interface WeekStats {
  week: number;
  completed: number;
  total: number;
}

export type ViewType = 'grid' | 'calendar' | 'stats';
