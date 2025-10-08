const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  process.env.SANITY_DATASET;

if (!projectId) {
  throw new Error(
    'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID. Please add it to your .env.local file.'
  );
}

if (!dataset) {
  throw new Error(
    'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET. Please add it to your .env.local file.'
  );
}

export const sanityConfig = {
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-10-01',
  studioTitle: process.env.NEXT_PUBLIC_SANITY_STUDIO_TITLE || 'Roberto Navarro CMS',
  useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN !== 'false',
  perspective: (process.env.NEXT_PUBLIC_SANITY_PERSPECTIVE as 'published' | 'previewDrafts') || 'published',
  readToken: process.env.SANITY_API_READ_TOKEN,
  writeToken: process.env.SANITY_API_WRITE_TOKEN,
};
