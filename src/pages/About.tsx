import React from 'react'
import SEO from '../components/SEO'

const About: React.FC = () => {
  return (
    <>
      <SEO
        title='About Live Salary Tracker'
        description='Learn about Live Salary Tracker - your comprehensive resource for real-time salary data and compensation insights. Discover our mission, data sources, and commitment to privacy.'
        keywords={[
          'about salary tracker',
          'salary data platform',
          'compensation insights',
          'salary information',
          'data sources',
          'privacy policy',
          'salary platform',
          'career resources',
          'salary comparison',
          'compensation data',
        ]}
        url='/about'
      />
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6'>About Live Salary Tracker</h1>
        <div className='prose max-w-none'>
          <p className='text-lg mb-4'>
            Live Salary Tracker is your comprehensive resource for real-time
            salary data and compensation insights. We provide accurate,
            up-to-date information to help professionals make informed career
            decisions.
          </p>

          <h2 className='text-2xl font-semibold mt-8 mb-4'>Our Mission</h2>
          <p>
            Our mission is to provide transparent, accurate, and real-time
            salary data to help professionals understand their market value and
            make informed career decisions. We believe in empowering individuals
            with the information they need to negotiate fair compensation.
          </p>

          <h2 className='text-2xl font-semibold mt-8 mb-4'>Data Sources</h2>
          <p>
            We aggregate salary data from multiple reliable sources, including
            job postings, company reports, and verified user submissions. Our
            data is regularly updated to reflect current market trends and
            compensation packages.
          </p>

          <h2 className='text-2xl font-semibold mt-8 mb-4'>
            Privacy and Security
          </h2>
          <p>
            We take data privacy and security seriously. All salary data is
            anonymized and aggregated to protect individual privacy while
            providing valuable market insights.
          </p>
        </div>
      </div>
    </>
  )
}

export default About
