import Header from './components/Header';
import EarningsTracker from './components/EarningsTracker';
import EarningsBreakdown from './components/EarningsBreakdown';
import WorkSchedule from './components/WorkSchedule';
import AffordCalculator from './components/AffordCalculator';
import Achievements from './components/Achievements';
import { SalaryProvider } from './contexts/SalaryContext';

const AppContent = () => {
  return <SalaryProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Header logout={function(): void {
                  throw new Error('Function not implemented.');
              } } />
          <div className="mt-6">
            <EarningsTracker />
          </div>
          <div className="mt-6">
            <EarningsBreakdown />
          </div>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WorkSchedule />
            <AffordCalculator />
          </div>
          <div className="mt-6">
            <Achievements />
          </div>
        </div>
      </div>
    </SalaryProvider>;
};
export function App() {
  return <AppContent />
}