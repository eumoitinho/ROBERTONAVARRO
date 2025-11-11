#!/bin/bash

# Script para adicionar Docker ao PATH
# Execute: bash fix-docker-path.sh

set -e

echo "🔧 Configurando Docker no PATH..."
echo ""

# Verificar se .zshrc existe
if [ ! -f ~/.zshrc ]; then
    echo "📝 Criando .zshrc..."
    touch ~/.zshrc
    chmod 644 ~/.zshrc
fi

# Verificar propriedade
OWNER=$(stat -f "%Su" ~/.zshrc 2>/dev/null || stat -c "%U" ~/.zshrc 2>/dev/null)
CURRENT_USER=$(whoami)

if [ "$OWNER" != "$CURRENT_USER" ] && [ "$OWNER" = "root" ]; then
    echo "⚠️  .zshrc pertence ao root. Precisa mudar propriedade."
    echo "📝 Execute: sudo chown $(whoami) ~/.zshrc"
    echo ""
    read -p "Deseja executar agora? (s/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        sudo chown $(whoami) ~/.zshrc
        echo "✅ Propriedade alterada"
    else
        echo "❌ Cancelado. Execute manualmente: sudo chown $(whoami) ~/.zshrc"
        exit 1
    fi
fi

# Verificar se já está adicionado
if grep -q "Docker.app/Contents/Resources/bin" ~/.zshrc; then
    echo "✅ Docker já está no PATH"
else
    echo "➕ Adicionando Docker ao PATH..."
    echo '' >> ~/.zshrc
    echo '# Docker Desktop' >> ~/.zshrc
    echo 'export PATH="/Applications/Docker.app/Contents/Resources/bin:$PATH"' >> ~/.zshrc
    echo "✅ Adicionado ao .zshrc"
fi

# Aplicar na sessão atual
export PATH="/Applications/Docker.app/Contents/Resources/bin:$PATH"

echo ""
echo "✅ Configuração concluída!"
echo ""
echo "🧪 Testando..."
if docker --version > /dev/null 2>&1; then
    echo "✅ Docker funciona!"
    docker --version
    docker compose version
else
    echo "❌ Docker não encontrado. Verifique se o Docker Desktop está rodando."
    exit 1
fi

echo ""
echo "📝 Para aplicar em novos terminais, execute:"
echo "   source ~/.zshrc"
echo ""
echo "🔍 Ou feche e abra um novo terminal"
echo ""
echo "🚀 Próximos passos:"
echo "   cd /Users/eumoitinho/Work/Clientes/ROBERTONAVARRO"
echo "   docker compose up -d mongodb"
echo "   pnpm seed"
echo "   pnpm dev"
