import type { MetadataRoute } from 'next'

const BASE = 'https://www.bestvaluepart.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: BASE,                       lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/parts`,            lastModified: now, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${BASE}/paints`,           lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/deals`,            lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${BASE}/delivery`,         lastModified: now, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${BASE}/faq`,              lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/returns`,          lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/careers`,          lastModified: now, changeFrequency: 'monthly', priority: 0.55 },
    { url: `${BASE}/careers/apply`,    lastModified: now, changeFrequency: 'monthly', priority: 0.50 },
    { url: `${BASE}/register`,         lastModified: now, changeFrequency: 'yearly',  priority: 0.50 },
  ]
}
