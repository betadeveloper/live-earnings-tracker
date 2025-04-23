import React, { useEffect, useState } from 'react'
import {
  DollarSignIcon,
  ClockIcon,
  CalendarIcon,
  BarChartIcon,
} from 'lucide-react'
import { useSalary } from '../contexts/SalaryContext'

const liveFlashingStyle = `
  @keyframes flashingLive {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  .live-indicator {
    animation: flashingLive ease 2.5s infinite;
    background-color: #dc2626;
  }
`

const EarningsTracker: React.FC = () => {
  const {
    currentEarnings,
    workProgress,
    isWorkingHours,
    currentView,
    setCurrentView,
    updateEarningsTick,
    currency,
    dailyEarnings,
    earningsHistory,
    salary,
    setSalary,
  } = useSalary()

  const [hoursPerWeek, setHoursPerWeek] = useState(40)
  const [weeksPerYear, setWeeksPerYear] = useState(52)

  const calculateWorkdays = (startDate: Date, endDate: Date): number => {
    let count = 0
    const current = new Date(startDate)

    while (current <= endDate) {
      const day = current.getDay()
      if (day !== 0 && day !== 6) {
        // Exclude Sundays (0) and Saturdays (6)
        count++
      }
      current.setDate(current.getDate() + 1)
    }

    return count
  }

  const calculateMonthlyEarnings = () => {
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    )
    const today = new Date()
    const workdays = calculateWorkdays(startOfMonth, today)
    const baseEarnings = workdays * dailyEarnings

    // Add today's earnings dynamically if still working
    const todayEarnings = isWorkingHours ? currentEarnings : 0
    return baseEarnings + todayEarnings
  }

  const calculateYearlyEarnings = () => {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1)
    const today = new Date()
    const workdays = calculateWorkdays(startOfYear, today)
    const baseEarnings = workdays * dailyEarnings

    // Add today's earnings dynamically if still working
    const todayEarnings = isWorkingHours ? currentEarnings : 0
    return baseEarnings + todayEarnings
  }

  const accumulatedMonthlyEarnings = calculateMonthlyEarnings()
  const accumulatedYearlyEarnings = calculateYearlyEarnings()

  const calculateHourlyRate = () => {
    return salary / (hoursPerWeek * weeksPerYear)
  }

  const calculateDailyRate = () => {
    return calculateHourlyRate() * 8
  }

  const calculateWeeklyRate = () => {
    return calculateHourlyRate() * hoursPerWeek
  }

  const calculateMonthlyRate = () => {
    return salary / 12
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateEarningsTick()
    }, 1000)
    return () => clearInterval(interval)
  }, [updateEarningsTick])

  const getDisplayAmount = () => {
    switch (currentView) {
      case 'day':
        return currentEarnings.toFixed(2)
      case 'month':
        return accumulatedMonthlyEarnings.toFixed(2)
      case 'year':
        return accumulatedYearlyEarnings.toFixed(2)
      default:
        return currentEarnings.toFixed(2)
    }
  }

  const getStatusLabel = () => {
    if (currentView !== 'day') {
      return `Accumulated ${currentView} earnings`
    }
    return isWorkingHours ? 'Currently working' : '0 h 0 m tracked'
  }

  return (
    <>
      <style>{liveFlashingStyle}</style>
      <div className='bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-800 text-white rounded-lg p-4 sm:p-6 w-full mx-auto'>
        <div className='flex flex-wrap justify-between items-center mb-4'>
          <div className='flex items-center mb-2 sm:mb-0'>
            <DollarSignIcon className='mr-2' size={20} aria-hidden='true' />
            <h2 className='text-lg sm:text-xl font-semibold'>
              Live Earnings Tracker
            </h2>
          </div>
          <div
            className='flex flex-wrap gap-2 justify-center'
            role='tablist'
            aria-label='Earnings view options'
          >
            <button
              className={`flex items-center ${
                currentView === 'day' ? 'bg-white bg-opacity-20' : ''
              } px-3 py-1 rounded`}
              onClick={() => setCurrentView('day')}
              role='tab'
              aria-selected={currentView === 'day'}
              aria-controls='day-view'
            >
              <ClockIcon size={16} className='mr-1' aria-hidden='true' />
              Today
            </button>
            <button
              className={`flex items-center ${
                currentView === 'month' ? 'bg-white bg-opacity-20' : ''
              } px-3 py-1 rounded`}
              onClick={() => setCurrentView('month')}
              role='tab'
              aria-selected={currentView === 'month'}
              aria-controls='month-view'
            >
              <CalendarIcon size={16} className='mr-1' aria-hidden='true' />
              Month
            </button>
            <button
              className={`flex items-center ${
                currentView === 'year' ? 'bg-white bg-opacity-20' : ''
              } px-3 py-1 rounded`}
              onClick={() => setCurrentView('year')}
              role='tab'
              aria-selected={currentView === 'year'}
              aria-controls='year-view'
            >
              <BarChartIcon size={16} className='mr-1' aria-hidden='true' />
              Year
            </button>
          </div>
        </div>
        <div className='flex flex-wrap items-center space-x-2 mb-4 text-center sm:text-left'>
          <div
            className={`${
              isWorkingHours && currentView === 'day'
                ? 'live-indicator'
                : 'bg-green-600'
            } text-white text-xs px-2 py-1 rounded-full flex items-center`}
            role='status'
            aria-live='polite'
          >
            <span
              className='w-2 h-2 bg-white rounded-full mr-1'
              aria-hidden='true'
            ></span>
            {currentView === 'day'
              ? isWorkingHours
                ? 'Live'
                : 'Day Complete'
              : `${
                  currentView.charAt(0).toUpperCase() + currentView.slice(1)
                } View`}
          </div>
          <div className='text-sm text-white text-opacity-90'>
            {getStatusLabel()}
          </div>
        </div>
        <div
          className='text-3xl sm:text-4xl font-bold mb-2 text-center sm:text-left'
          role='status'
          aria-live='polite'
        >
          {currency.match(/\((.*?)\)/)?.[1]}
          {getDisplayAmount()}
        </div>
        {currentView === 'day' && (
          <div>
            <div className='flex justify-between text-sm mb-1'>
              <span>Work progress</span>
              <span>{workProgress.toFixed(0)}%</span>
            </div>
            <div
              className='h-2 bg-blue-900 rounded-full overflow-hidden'
              role='progressbar'
              aria-valuenow={workProgress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className='h-full bg-blue-400 transition-all duration-500'
                style={{
                  width: `${workProgress}%`,
                }}
              ></div>
            </div>
          </div>
        )}
        {currentView !== 'day' && (
          <div className='text-sm mt-2 text-center sm:text-left'>
            Total earned this {currentView}: {currency.match(/\((.*?)\)/)?.[1]}
            {getDisplayAmount()}
          </div>
        )}
      </div>
    </>
  )
}

export default EarningsTracker
