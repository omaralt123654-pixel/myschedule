import { useMemo, useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import HabitsPanel from '@/components/HabitsPanel';
import HabitGrid from '@/components/HabitGrid';
import RightPanel from '@/components/RightPanel';
import CalendarView from '@/components/CalendarView';
import StatsView from '@/components/StatsView';
import DailyProgressGraph from '@/components/DailyProgressGraph';
import { useHabits } from '@/hooks/useHabits';
import { getDayStats } from '@/lib/stats';
import type { ViewType } from '@/types';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('grid');
  const [selectedHabit, setSelectedHabit] = useState<string | null>(null);

  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const { habits, cycleCompletion, addHabit, deleteHabit } = useHabits();

  // Computed once per render and shared by grid/calendar/stats so everything
  // stays in sync with the same month + habit data.
  const dayStats = useMemo(() => getDayStats(habits, year, month), [habits, year, month]);

  return (
    <div className="h-screen w-screen bg-[#000000] flex flex-col overflow-hidden">
      {/* Top Navigation */}
      <NavigationBar
        currentView={currentView}
        onViewChange={setCurrentView}
        year={year}
        month={month}
        onYearChange={setYear}
        onMonthChange={setMonth}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {currentView === 'grid' && (
          <>
            {/* Left Panel - Habits List */}
            <HabitsPanel
              habits={habits}
              selectedHabit={selectedHabit}
              onSelectHabit={setSelectedHabit}
              onAddHabit={addHabit}
              onDeleteHabit={deleteHabit}
              onToggleToday={cycleCompletion}
            />

            {/* Center - Habit Grid */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <HabitGrid
                habits={habits}
                selectedHabit={selectedHabit}
                year={year}
                month={month}
                onCellClick={cycleCompletion}
              />
              <DailyProgressGraph dayStats={dayStats} />
            </div>

            {/* Right Panel - Stats */}
            <RightPanel habits={habits} year={year} month={month} dayStats={dayStats} />
          </>
        )}

        {currentView === 'calendar' && (
          <>
            <HabitsPanel
              habits={habits}
              selectedHabit={selectedHabit}
              onSelectHabit={setSelectedHabit}
              onAddHabit={addHabit}
              onDeleteHabit={deleteHabit}
              onToggleToday={cycleCompletion}
            />
            <CalendarView
              habits={habits}
              year={year}
              month={month}
              onCycleCompletion={cycleCompletion}
            />
            <RightPanel habits={habits} year={year} month={month} dayStats={dayStats} />
          </>
        )}

        {currentView === 'stats' && (
          <StatsView habits={habits} year={year} month={month} dayStats={dayStats} />
        )}
      </div>
    </div>
  );
}
