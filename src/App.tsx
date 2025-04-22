import Header from './components/Header';
import EarningsTracker from './components/EarningsTracker';
import EarningsBreakdown from './components/EarningsBreakdown';
import WorkSchedule from './components/WorkSchedule';
import AffordCalculator from './components/AffordCalculator';
import { SalaryProvider } from './contexts/SalaryContext';
import { SpeedInsights } from "@vercel/speed-insights/react"

const AppContent = () => {
  return <SalaryProvider>
    <SpeedInsights />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Header />
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
        </div>
      </div>
    </SalaryProvider>;
};
export function App() {
  return <AppContent />
}