import type { SchemaTypeDefinition } from 'sanity';
import page from './page';
import siteSettings from './siteSettings';
import homepage from './homepage';
import eventPage from './eventPage';
import formationPage from './formationPage';

export const schemaTypes: SchemaTypeDefinition[] = [
  // Configurações Globais
  siteSettings,

  // Homepage
  homepage,

  // Páginas
  page,

  // Eventos
  eventPage,

  // Formações
  formationPage,
];
