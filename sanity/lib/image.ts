import createImageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { sanityConfig } from '../env';

const builder = createImageUrlBuilder({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
});

export const urlForImage = (source: Image | null | undefined): string | undefined => {
  if (!source) return undefined;

  return builder.image(source).auto('format').url();
};
