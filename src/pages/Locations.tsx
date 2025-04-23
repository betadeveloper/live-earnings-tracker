import React from 'react'
import SEO from '../components/SEO'

const Locations: React.FC = () => {
  return (
    <>
      <SEO
        title='Location-Based Salary Data'
        description='Compare salaries across different locations and understand how geographical factors impact compensation. Make informed decisions about your career path with location-specific salary data.'
        keywords={[
          'location salaries',
          'city salaries',
          'regional salaries',
          'international salaries',
          'remote work salaries',
          'cost of living',
          'geographical compensation',
          'location comparison',
          'salary by location',
          'compensation trends',
        ]}
        url='/locations'
      />
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6'>Location-Based Salary Data</h1>
        <div className='prose max-w-none'>
          <p className='text-lg mb-4'>
            Compare salaries across different locations and understand how
            geographical factors impact compensation. Make informed decisions
            about your career path with location-specific salary data.
          </p>

          <h2 className='text-2xl font-semibold mt-8 mb-4'>Major Cities</h2>
          <p>
            Explore salary ranges in major metropolitan areas. Compare
            compensation packages across different cities and understand cost of
            living adjustments.
          </p>

          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            Regional Comparisons
          </h2>
          <p>
            Analyze salary trends across different regions and states.
            Understand how regional economic factors influence compensation
            packages.
          </p>

          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            International Markets
          </h2>
          <p>
            Compare salaries across different countries and understand global
            compensation trends. Make informed decisions about international
            career opportunities.
          </p>

          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            Remote Work Impact
          </h2>
          <p>
            Understand how remote work policies affect salary structures.
            Compare compensation packages for remote, hybrid, and in-office
            positions.
          </p>
        </div>
      </div>
    </>
  )
}

export default Locations
