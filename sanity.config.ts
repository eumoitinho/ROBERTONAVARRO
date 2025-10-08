import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
import { sanityConfig } from './sanity/env';

export default defineConfig({
  name: 'default',
  title: sanityConfig.studioTitle,
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
