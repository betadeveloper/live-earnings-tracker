import React from 'react'

const Contact: React.FC = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6'>Contact Us</h1>
      <div className='prose max-w-none'>
        <p className='text-lg mb-4'>
          Have questions about our salary data or want to contribute to our
          database? We'd love to hear from you. Contact us through any of the
          following channels.
        </p>

        <h2 className='text-2xl font-semibold mt-8 mb-4'>General Inquiries</h2>
        <p>
          For general questions about our platform, data sources, or features,
          please email us at
          <a
            href='mailto:info@earningstracker.vercel.app'
            className='text-blue-600 hover:underline'
          >
            info@earningstracker.vercel.app
          </a>
        </p>

        <h2 className='text-2xl font-semibold mt-8 mb-4'>Data Contributions</h2>
        <p>
          Interested in contributing salary data to our platform? We welcome
          verified salary information from professionals across all industries.
          Contact our data team at
          <a
            href='mailto:data@earningstracker.vercel.app'
            className='text-blue-600 hover:underline'
          >
            data@earningstracker.vercel.app
          </a>
        </p>

        <h2 className='text-2xl font-semibold mt-8 mb-4'>
          Partnership Opportunities
        </h2>
        <p>
          Looking to partner with us or integrate our salary data into your
          platform? Reach out to our partnerships team at
          <a
            href='mailto:partners@earningstracker.vercel.app'
            className='text-blue-600 hover:underline'
          >
            partners@earningstracker.vercel.app
          </a>
        </p>

        <h2 className='text-2xl font-semibold mt-8 mb-4'>Feedback</h2>
        <p>
          Your feedback helps us improve our platform. Share your suggestions
          and experiences at
          <a
            href='mailto:feedback@earningstracker.vercel.app'
            className='text-blue-600 hover:underline'
          >
            feedback@earningstracker.vercel.app
          </a>
        </p>
      </div>
    </div>
  )
}

export default Contact
