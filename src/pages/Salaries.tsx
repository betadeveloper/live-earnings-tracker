import React from 'react'
import SEO from '../components/SEO'

const Salaries: React.FC = () => {
  return (
    <>
      <SEO
        title='Salary Data & Compensation Insights'
        description='Explore comprehensive salary data across various industries, locations, and experience levels. Get real-time compensation insights to make informed career decisions.'
        keywords={[
          'salary comparison',
          'compensation data',
          'salary trends',
          'industry salaries',
          'location salaries',
          'experience level salaries',
          'career compensation',
          'salary insights',
          'salary tracker',
          'compensation packages',
        ]}
        url='/salaries'
      />
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6'>
          Salary Data & Compensation Insights
        </h1>
        <div className='prose max-w-none'>
          <p className='text-lg mb-4'>
            Explore comprehensive salary data across various industries,
            locations, and experience levels. Our real-time salary tracker
            provides up-to-date compensation insights to help you make informed
            career decisions.
          </p>

          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            Industry Salary Trends
          </h2>
          <p>
            Discover how salaries vary across different industries and sectors.
            Compare compensation packages and understand market trends in your
            field of interest.
          </p>

          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            Location-Based Compensation
          </h2>
          <p>
            Understand how geographical location impacts salary ranges. Compare
            compensation across different cities, states, and countries to make
            informed decisions about your career path.
          </p>

          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            Experience Level Analysis
          </h2>
          <p>
            Track how salaries progress with experience. From entry-level
            positions to senior roles, understand the compensation trajectory in
            your chosen field.
          </p>
        </div>
      </div>
    </>
  )
}

export default Salaries
