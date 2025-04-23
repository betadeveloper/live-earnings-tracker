import React from 'react'
import { useSalary } from '../contexts/SalaryContext'
import { DollarSign, Calendar, Clock, Briefcase, MapPin } from 'lucide-react'
import SEO from './SEO'

const AppContent: React.FC = () => {
  const { salary, setSalary } = useSalary()

  return (
    <div className='min-h-screen bg-gray-50'>
      <SEO
        title='Live Salary Tracker - Real-time Salary Data & Compensation Insights'
        description='Track and compare real-time salary data across industries and locations. Get comprehensive compensation insights to make informed career decisions.'
        keywords={[
          'salary tracker',
          'compensation insights',
          'real-time salary data',
          'salary comparison',
          'career earnings',
          'salary trends',
          'industry salaries',
          'location-based salaries',
          'salary calculator',
          'compensation analysis',
        ]}
        url='/'
      />
      <header className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Live Salary Tracker
          </h1>
          <p className='mt-2 text-lg text-gray-700'>
            Track and compare real-time salary data across industries and
            locations
          </p>
        </div>
      </header>

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-2xl font-bold mb-6 text-gray-900'>
              Salary Calculator
            </h2>
            <div className='space-y-4'>
              <div className='flex items-center space-x-2'>
                <DollarSign className='text-gray-700' aria-hidden='true' />
                <label htmlFor='salary' className='text-gray-900 font-medium'>
                  Annual Salary
                </label>
              </div>
              <div className='relative'>
                <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700'>
                  $
                </span>
                <input
                  id='salary'
                  type='number'
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className='w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600'
                  aria-label='Annual salary amount'
                  min='0'
                  step='1000'
                />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-2xl font-bold mb-6 text-gray-900'>
              Salary Insights
            </h2>
            <div className='grid grid-cols-2 gap-4'>
              <div className='bg-gray-50 p-4 rounded-lg'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  Hourly Rate
                </h3>
                <p className='text-2xl font-bold text-blue-700'>
                  ${(salary / 2080).toFixed(2)}
                </p>
              </div>
              <div className='bg-gray-50 p-4 rounded-lg'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  Daily Rate
                </h3>
                <p className='text-2xl font-bold text-blue-700'>
                  ${(salary / 260).toFixed(2)}
                </p>
              </div>
              <div className='bg-gray-50 p-4 rounded-lg'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  Weekly Rate
                </h3>
                <p className='text-2xl font-bold text-blue-700'>
                  ${(salary / 52).toFixed(2)}
                </p>
              </div>
              <div className='bg-gray-50 p-4 rounded-lg'>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  Monthly Rate
                </h3>
                <p className='text-2xl font-bold text-blue-700'>
                  ${(salary / 12).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AppContent
