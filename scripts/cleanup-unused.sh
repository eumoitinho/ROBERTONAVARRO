#!/bin/bash

echo "🧹 Limpando arquivos não utilizados do projeto..."
echo ""

# Criar pasta de backup
BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "📦 Backup criado em: $BACKUP_DIR"
echo ""

# Função para mover arquivo
move_to_backup() {
    if [ -f "$1" ]; then
        mkdir -p "$BACKUP_DIR/$(dirname "$1")"
        mv "$1" "$BACKUP_DIR/$1"
        echo "✓ Movido: $1"
    fi
}

# Função para remover diretório vazio
remove_empty_dir() {
    if [ -d "$1" ] && [ -z "$(ls -A "$1")" ]; then
        rmdir "$1"
        echo "✓ Removido diretório vazio: $1"
    fi
}

echo "1️⃣  Removendo BACKUPS e DUPLICADOS..."
echo "----------------------------------------"
move_to_backup "app/page-static-backup.tsx"
move_to_backup "app/page-sanity.tsx"
move_to_backup "app/blog/page-static-backup.tsx"
move_to_backup "app/blog/[slug]/page-static-backup.tsx"
move_to_backup "app/eventos/crencas-da-riqueza/page copy.tsx"
move_to_backup "app/eventos/crencas-da-riqueza/page-with-registration.tsx"
move_to_backup "components/header.tsx.backup"
move_to_backup "lib/blog-fallback.ts"

echo ""
echo "2️⃣  Removendo arquivos BASEHUB (não usado)..."
echo "----------------------------------------"
move_to_backup "basehub.config.ts"
move_to_backup "basehub-types.d.ts"
rm -rf "lib/basehub" 2>/dev/null && echo "✓ Removido: lib/basehub/"
move_to_backup "BASEHUB_IMPORT_GUIDE.md"
move_to_backup "BASEHUB_MIGRATION.md"
move_to_backup "GUIA_BASEHUB.md"
move_to_backup "SETUP_BASEHUB_COMPLETO.md"

echo ""
echo "3️⃣  Removendo SCRIPTS de migração..."
echo "----------------------------------------"
move_to_backup "scripts/basehub-real-import.js"
move_to_backup "scripts/complete-full-content.js"
move_to_backup "scripts/delete-blog-clean.js"
move_to_backup "scripts/delete-posts.js"
move_to_backup "scripts/discover-basehub-schema.js"
move_to_backup "scripts/discover-real-fields.js"
move_to_backup "scripts/explore-blog-structure.js"
move_to_backup "scripts/explore-posts-collection.js"
move_to_backup "scripts/export-for-basehub.js"
move_to_backup "scripts/final-blog-update.js"
move_to_backup "scripts/fix-blog-keys.js"
move_to_backup "scripts/import-posts-basehub.js"
move_to_backup "scripts/import-to-basehub.js"
move_to_backup "scripts/migrate-blog-data.js"
move_to_backup "scripts/migrate-to-sanity.js"
move_to_backup "scripts/populate-sanity.js"
move_to_backup "scripts/test-basehub-connection.js"
move_to_backup "scripts/test-real-basehub.js"
move_to_backup "scripts/test-token-variants.js"
move_to_backup "scripts/update-full-content.js"
move_to_backup "scripts/update-remaining-posts.js"
move_to_backup "scripts/analyze-unused-files.js"

echo ""
echo "4️⃣  Movendo EXPORTS de dados para pasta archive..."
echo "----------------------------------------"
mkdir -p "archive/exports"
if [ -d "exports" ]; then
    mv exports/* archive/exports/ 2>/dev/null
    rmdir exports 2>/dev/null
    echo "✓ Exports movidos para: archive/exports/"
fi
move_to_backup "SANITY_EXAMPLE_CONTENT.json"

echo ""
echo "5️⃣  Consolidando DOCUMENTAÇÃO..."
echo "----------------------------------------"
mkdir -p "docs/archive"
move_to_backup "docs/sanity-content-inventory.md"
move_to_backup "docs/sanity-migration-plan.md"
echo "✓ Mantido: docs/utm-implementation.md"
echo "✓ Mantido: docs/utm-tracking-guide.md"
echo "✓ Mantido: DOCUMENTACAO.md (principal)"
echo "✓ Mantido: SANITY_SETUP_GUIDE.md"

echo ""
echo "6️⃣  Removendo COMPONENTES não utilizados..."
echo "----------------------------------------"
move_to_backup "components/lead-capture-popup.tsx"
move_to_backup "components/verify-ticket.tsx"
move_to_backup "components/universal-page.tsx"
move_to_backup "lib/utm-tracker.ts"

echo ""
echo "7️⃣  Limpando CONFIGURAÇÕES não usadas..."
echo "----------------------------------------"
move_to_backup "app/blog/.claude/settings.local.json"
move_to_backup "roberto-navarro-site"
move_to_backup "basehub-import"
move_to_backup ".sanity/runtime"

echo ""
echo "8️⃣  Removendo arquivos DOCX temporários..."
echo "----------------------------------------"
find lib -name "*.docx" -type f | while read file; do
    move_to_backup "$file"
done

echo ""
echo "✅ LIMPEZA CONCLUÍDA!"
echo ""
echo "📊 RESUMO:"
echo "  - Arquivos movidos para backup: $BACKUP_DIR"
echo "  - Para restaurar, copie de volta do backup"
echo "  - Para remover definitivamente: rm -rf $BACKUP_DIR"
echo ""
echo "⚠️  IMPORTANTE:"
echo "  - Teste o projeto: pnpm dev"
echo "  - Se tudo funcionar, pode remover o backup"
echo ""

