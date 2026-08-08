import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://profitable-azure.vercel.app';
  
  // Detect if this is a production environment.
  const isProduction = 
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' || 
    process.env.NODE_ENV === 'production';

  // If this is a preview or local development site, disallow all crawling
  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',       // Exclude backend APIs
          '/private/',   // Exclude private folder
          '/_next/',     // Exclude Next.js build outputs/chunks
          '/*?*',        // Exclude query parameters to prevent infinite URL crawling
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
