import type { SchemaTypeDefinition } from 'sanity';
import page from './page';
import siteSettings from './siteSettings';

export const schemaTypes: SchemaTypeDefinition[] = [
  // Configurações Globais
  siteSettings,

  // Páginas
  page,
];
