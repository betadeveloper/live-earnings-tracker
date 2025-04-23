import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Salaries from './pages/Salaries'
import Industries from './pages/Industries'
import Locations from './pages/Locations'
import About from './pages/About'
import Contact from './pages/Contact'
import Header from './components/Header'
import EarningsTracker from './components/EarningsTracker'
import EarningsBreakdown from './components/EarningsBreakdown'
import WorkSchedule from './components/WorkSchedule'
import AffordCalculator from './components/AffordCalculator'
import { SalaryProvider } from './contexts/SalaryContext'
import { SpeedInsights } from '@vercel/speed-insights/react'
import SEO from './components/SEO'

const AppContent = () => {
  return (
    <SalaryProvider>
      <SEO
        title='Live Salary Tracker - Real-time Salary Data & Compensation Insights'
        description='Track and compare real-time salary data across industries and locations. Get comprehensive compensation insights to make informed career decisions.'
        keywords={[
          'salary tracker',
          'compensation insights',
          'real-time salary data',
          'salary comparison',
          'career salary',
          'industry salaries',
          'location salaries',
          'salary trends',
          'compensation packages',
          'salary information',
        ]}
        url='/'
      />
      <SpeedInsights />
      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-7xl mx-auto px-4 py-6'>
          <Header />
          <div className='mt-6'>
            <EarningsTracker />
          </div>
          <div className='mt-6'>
            <EarningsBreakdown />
          </div>
          <div className='mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <WorkSchedule />
            <AffordCalculator />
          </div>
        </div>
      </div>
    </SalaryProvider>
  )
}

export const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path='/' element={<AppContent />} />
          <Route path='/salaries' element={<Salaries />} />
          <Route path='/industries' element={<Industries />} />
          <Route path='/locations' element={<Locations />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </Router>
    </HelmetProvider>
  )
}
