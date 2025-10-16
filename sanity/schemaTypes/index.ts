import type { SchemaTypeDefinition } from 'sanity';
import page from './page';
import siteSettings from './siteSettings';
import homepage from './homepage';
import formationPage from './formationPage';
import blogPost from './blogPost';

export const schemaTypes: SchemaTypeDefinition[] = [
  // Configurações Globais
  siteSettings,

  // Páginas
  page,
  homepage,
  formationPage,
  
  // Blog
  blogPost,
];
