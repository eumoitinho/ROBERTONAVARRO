#!/bin/bash

# Script para configurar e rodar MongoDB no Docker

# Detectar caminho do Docker
if command -v docker > /dev/null 2>&1; then
    DOCKER_CMD="docker"
    COMPOSE_CMD="docker compose"
elif [ -f "/Applications/Docker.app/Contents/Resources/bin/docker" ]; then
    DOCKER_CMD="/Applications/Docker.app/Contents/Resources/bin/docker"
    COMPOSE_CMD="/Applications/Docker.app/Contents/Resources/bin/docker compose"
else
    echo "❌ Docker não encontrado. Por favor, instale o Docker Desktop."
    exit 1
fi

echo "🐳 Configurando MongoDB no Docker..."
echo "📍 Usando: $DOCKER_CMD"

# Verificar se Docker está rodando
if ! $DOCKER_CMD info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Por favor, inicie o Docker Desktop."
    exit 1
fi

echo "✅ Docker está rodando"

# Rodar MongoDB
echo "📦 Iniciando MongoDB..."
$COMPOSE_CMD up -d mongodb

# Aguardar MongoDB iniciar
echo "⏳ Aguardando MongoDB iniciar..."
sleep 5

# Verificar se está rodando
if $COMPOSE_CMD ps | grep -q "roberto-navarro-mongodb.*Up"; then
    echo "✅ MongoDB está rodando!"
    echo ""
    echo "📝 Configuração:"
    echo "   Host: localhost"
    echo "   Porta: 27017"
    echo "   Usuário: admin"
    echo "   Senha: admin123"
    echo "   Database: roberto-navarro"
    echo ""
    echo "🔗 String de conexão:"
    echo "   mongodb://admin:admin123@localhost:27017/roberto-navarro?authSource=admin"
    echo ""
    echo "💡 Próximos passos:"
    echo "   1. Certifique-se de que o .env.local tem a string de conexão acima"
    echo "   2. Rode: pnpm dev"
    echo "   3. Rode: pnpm seed (para popular o banco)"
else
    echo "❌ Erro ao iniciar MongoDB. Verifique os logs:"
    echo "   $COMPOSE_CMD logs mongodb"
    echo ""
    echo "💡 Ou use: pnpm docker:logs"
fi

