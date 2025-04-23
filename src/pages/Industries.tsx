import React from 'react'
import SEO from '../components/SEO'

const Industries: React.FC = () => {
  return (
    <>
      <SEO
        title='Industry Salary Comparisons'
        description='Compare salary data across different industries and sectors. Get comprehensive industry analysis to understand compensation trends and make informed career decisions.'
        keywords={[
          'industry salaries',
          'sector compensation',
          'technology salaries',
          'healthcare salaries',
          'finance salaries',
          'manufacturing salaries',
          'engineering salaries',
          'industry comparison',
          'sector analysis',
          'compensation trends',
        ]}
        url='/industries'
      />
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6'>Industry Salary Comparisons</h1>
        <div className='prose max-w-none'>
          <p className='text-lg mb-4'>
            Compare salary data across different industries and sectors. Our
            comprehensive industry analysis helps you understand compensation
            trends and make informed career decisions.
          </p>

          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            Technology Sector
          </h2>
          <p>
            Explore salary ranges in software development, IT services, and
            emerging technologies. Understand compensation trends in one of the
            fastest-growing sectors.
          </p>

          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            Healthcare Industry
          </h2>
          <p>
            Discover compensation packages in healthcare, from medical
            professionals to administrative roles. Compare salaries across
            different healthcare specialties.
          </p>

          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            Finance and Banking
          </h2>
          <p>
            Analyze salary trends in finance, banking, and investment sectors.
            Understand compensation structures and career progression in
            financial services.
          </p>

          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            Manufacturing and Engineering
          </h2>
          <p>
            Compare salaries in manufacturing, engineering, and industrial
            sectors. Track compensation trends in traditional and emerging
            manufacturing fields.
          </p>
        </div>
      </div>
    </>
  )
}

export default Industries
