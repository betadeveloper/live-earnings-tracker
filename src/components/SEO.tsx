import React from 'react'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = [],
  image = 'https://earningstracker.vercel.app/og-image.jpg',
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
}) => {
  const fullTitle = `${title} | Live Salary Tracker`
  const fullUrl = `https://earningstracker.vercel.app${url}`
  const defaultKeywords = [
    'salary data',
    'compensation insights',
    'salary tracker',
    'career salary',
    'industry salaries',
    'location salaries',
    'salary comparison',
    'salary trends',
    'compensation packages',
    'salary information',
    ...keywords,
  ]

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={defaultKeywords.join(', ')} />
      <meta name='robots' content='index, follow' />
      <meta name='language' content='English' />
      <meta name='revisit-after' content='7 days' />
      <meta name='author' content='Live Salary Tracker' />

      {/* Open Graph / Facebook */}
      <meta property='og:type' content={type} />
      <meta property='og:url' content={fullUrl} />
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:site_name' content='Live Salary Tracker' />
      <meta property='og:locale' content='en_US' />

      {/* Twitter */}
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={fullUrl} />
      <meta property='twitter:title' content={fullTitle} />
      <meta property='twitter:description' content={description} />
      <meta property='twitter:image' content={image} />

      {/* Article Specific */}
      {type === 'article' && (
        <>
          <meta property='article:published_time' content={publishedTime} />
          <meta property='article:modified_time' content={modifiedTime} />
          <meta property='article:author' content={author} />
          <meta property='article:section' content={section} />
          {tags.map((tag) => (
            <meta key={tag} property='article:tag' content={tag} />
          ))}
        </>
      )}

      {/* Canonical URL */}
      <link rel='canonical' href={fullUrl} />

      {/* Structured Data */}
      <script type='application/ld+json'>
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type === 'article' ? 'Article' : 'WebPage',
          headline: fullTitle,
          description: description,
          image: image,
          url: fullUrl,
          publisher: {
            '@type': 'Organization',
            name: 'Live Salary Tracker',
            logo: {
              '@type': 'ImageObject',
              url: 'https://earningstracker.vercel.app/logo.png',
            },
          },
          ...(type === 'article' && {
            datePublished: publishedTime,
            dateModified: modifiedTime,
            author: {
              '@type': 'Person',
              name: author,
            },
            articleSection: section,
            keywords: defaultKeywords.join(', '),
          }),
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': fullUrl,
          },
        })}
      </script>
    </Helmet>
  )
}

export default SEO
