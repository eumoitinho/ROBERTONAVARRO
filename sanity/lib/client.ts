import { createClient, type ClientConfig } from 'next-sanity';
import { sanityConfig } from '../env';

const config: ClientConfig = {
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: sanityConfig.useCdn,
  perspective: sanityConfig.perspective,
};

export const sanityClient = createClient(config);

export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: sanityConfig.readToken || sanityConfig.writeToken,
  perspective: sanityConfig.readToken || sanityConfig.writeToken ? 'previewDrafts' : sanityConfig.perspective,
});

export const getClient = (usePreview = false) => (usePreview ? previewClient : sanityClient);
