import { useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import HabitsPanel from '@/components/HabitsPanel';
import HabitGrid from '@/components/HabitGrid';
import RightPanel from '@/components/RightPanel';
import CalendarView from '@/components/CalendarView';
import StatsView from '@/components/StatsView';
import DailyProgressGraph from '@/components/DailyProgressGraph';
import type { ViewType } from '@/types';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('grid');
  const [selectedHabit, setSelectedHabit] = useState<string | null>(null);

  return (
    <div className="h-screen w-screen bg-[#000000] flex flex-col overflow-hidden">
      {/* Top Navigation */}
      <NavigationBar currentView={currentView} onViewChange={setCurrentView} />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {currentView === 'grid' && (
          <>
            {/* Left Panel - Habits List */}
            <HabitsPanel selectedHabit={selectedHabit} onSelectHabit={setSelectedHabit} />

            {/* Center - Habit Grid */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <HabitGrid selectedHabit={selectedHabit} />
              <DailyProgressGraph />
            </div>

            {/* Right Panel - Stats */}
            <RightPanel />
          </>
        )}

        {currentView === 'calendar' && (
          <>
            <HabitsPanel selectedHabit={selectedHabit} onSelectHabit={setSelectedHabit} />
            <CalendarView />
            <RightPanel />
          </>
        )}

        {currentView === 'stats' && <StatsView />}
      </div>
    </div>
  );
}
