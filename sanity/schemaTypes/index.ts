import type { SchemaTypeDefinition } from 'sanity';
import page from './page';
import siteSettings from './siteSettings';
import homepage from './homepage';
import formationPage from './formationPage';
import blogPost from './blogPost';
import eventPage from './eventPage';
import bookPage from './bookPage';
import integrations from './integrations';

export const schemaTypes: SchemaTypeDefinition[] = [
  // Configurações Globais
  siteSettings,
  integrations,

  // Páginas
  page,
  homepage,
  formationPage,
  eventPage,
  bookPage,
  
  // Blog
  blogPost,
];
