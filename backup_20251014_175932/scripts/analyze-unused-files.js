const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Analisando arquivos não utilizados...\n');

// Arquivos claramente não usados (backups, duplicados, etc)
const obviousUnused = [
  'app/page-static-backup.tsx',
  'app/page-sanity.tsx',
  'app/blog/page-static-backup.tsx',
  'app/blog/[slug]/page-static-backup.tsx',
  'app/eventos/crencas-da-riqueza/page copy.tsx',
  'app/eventos/crencas-da-riqueza/page-with-registration.tsx',
  'components/header.tsx.backup',
  'lib/blog-fallback.ts', // Duplicado de lib/blog/fallback-data.ts
];

// Múltiplas documentações similares
const duplicateDocs = [
  'BASEHUB_IMPORT_GUIDE.md',
  'BASEHUB_MIGRATION.md',
  'GUIA_BASEHUB.md',
  'SETUP_BASEHUB_COMPLETO.md',
  'DOCUMENTACAO.md',
  'SANITY_SETUP_GUIDE.md',
];

// Scripts de migração já executados
const migrationScripts = [
  'scripts/basehub-real-import.js',
  'scripts/complete-full-content.js',
  'scripts/delete-blog-clean.js',
  'scripts/delete-posts.js',
  'scripts/discover-basehub-schema.js',
  'scripts/discover-real-fields.js',
  'scripts/explore-blog-structure.js',
  'scripts/explore-posts-collection.js',
  'scripts/export-for-basehub.js',
  'scripts/final-blog-update.js',
  'scripts/fix-blog-keys.js',
  'scripts/import-posts-basehub.js',
  'scripts/import-to-basehub.js',
  'scripts/migrate-blog-data.js',
  'scripts/migrate-to-sanity.js',
  'scripts/populate-sanity.js',
  'scripts/test-basehub-connection.js',
  'scripts/test-real-basehub.js',
  'scripts/test-token-variants.js',
  'scripts/update-full-content.js',
  'scripts/update-remaining-posts.js',
];

// Exports de dados (podem ser arquivados)
const dataExports = [
  'exports/coragem.json',
  'exports/decisões-financeiras.json',
  'exports/inteligência-emocional.json',
  'exports/mentalidade.json',
  'exports/todos-os-posts.json',
  'SANITY_EXAMPLE_CONTENT.json',
];

// Arquivos basehub não usados (parece que não está sendo usado)
const basehubFiles = [
  'basehub.config.ts',
  'basehub-types.d.ts',
  'lib/basehub/client.ts',
  'lib/basehub/fallback-data.ts',
  'lib/basehub/queries.ts',
];

// Verificar uso de componentes
const componentFiles = [
  'components/event-popup.tsx',
  'components/lead-capture-popup.tsx',
  'components/universal-page.tsx',
  'components/verify-ticket.tsx',
];

console.log('📋 ANÁLISE DE ARQUIVOS NÃO UTILIZADOS\n');
console.log('=' .repeat(60));

console.log('\n1️⃣  BACKUPS E DUPLICADOS ÓBVIOS:');
console.log('-'.repeat(60));
obviousUnused.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`${exists ? '✓' : '✗'} ${file}`);
});

console.log('\n2️⃣  DOCUMENTAÇÕES DUPLICADAS:');
console.log('-'.repeat(60));
duplicateDocs.forEach(file => {
  const exists = fs.existsSync(file);
  if (exists) {
    const stats = fs.statSync(file);
    const kb = (stats.size / 1024).toFixed(1);
    console.log(`✓ ${file} (${kb} KB)`);
  }
});

console.log('\n3️⃣  SCRIPTS DE MIGRAÇÃO (já executados):');
console.log('-'.repeat(60));
let scriptsCount = 0;
migrationScripts.forEach(file => {
  if (fs.existsSync(file)) {
    scriptsCount++;
    console.log(`✓ ${file}`);
  }
});
console.log(`\nTotal: ${scriptsCount} scripts`);

console.log('\n4️⃣  EXPORTS DE DADOS (podem ser arquivados):');
console.log('-'.repeat(60));
dataExports.forEach(file => {
  if (fs.existsSync(file)) {
    const stats = fs.statSync(file);
    const kb = (stats.size / 1024).toFixed(1);
    console.log(`✓ ${file} (${kb} KB)`);
  }
});

console.log('\n5️⃣  ARQUIVOS BASEHUB (não sendo usado?):');
console.log('-'.repeat(60));
basehubFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`${exists ? '✓' : '✗'} ${file}`);
});

console.log('\n6️⃣  VERIFICANDO USO DE COMPONENTES ESPECÍFICOS:');
console.log('-'.repeat(60));
componentFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const componentName = path.basename(file, '.tsx');
    try {
      // Procurar imports deste componente
      const result = execSync(
        `grep -r "from.*${componentName}" --include="*.tsx" --include="*.ts" . 2>/dev/null | grep -v node_modules | grep -v .next | wc -l`,
        { encoding: 'utf-8' }
      );
      const usages = parseInt(result.trim());
      console.log(`${usages > 1 ? '✓' : '⚠'} ${file} - Usado ${usages - 1} vez(es)`);
    } catch (e) {
      console.log(`⚠ ${file} - Erro ao verificar`);
    }
  }
});

console.log('\n\n📊 RESUMO:');
console.log('='.repeat(60));
console.log(`
Arquivos identificados para remoção:
- Backups/duplicados: ${obviousUnused.length}
- Documentações: ${duplicateDocs.length}
- Scripts de migração: ${scriptsCount}
- Exports de dados: ${dataExports.filter(f => fs.existsSync(f)).length}
- Arquivos BaseHub: ${basehubFiles.filter(f => fs.existsSync(f)).length}
`);

console.log('\n💡 RECOMENDAÇÃO:');
console.log('='.repeat(60));
console.log(`
1. REMOVER IMEDIATAMENTE:
   - Backups (.backup, page-static-backup.tsx, page copy.tsx)
   - Scripts de migração já executados
   
2. CONSOLIDAR:
   - Manter apenas 1 arquivo de documentação principal
   - Arquivar exports de dados em uma pasta separada
   
3. VERIFICAR SE BASEHUB ESTÁ SENDO USADO:
   - Se não, remover todos os arquivos relacionados
`);

