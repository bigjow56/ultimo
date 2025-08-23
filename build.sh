#!/bin/bash
set -e

echo "🔧 Iniciando build para Digital Ocean..."

# Instalar dependências
echo "📦 Instalando dependências..."
npm ci

# Build do frontend
echo "🎨 Compilando frontend..."
npx vite build

# Build do backend
echo "🔧 Compilando backend..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "✅ Build concluído com sucesso!"
ls -la dist/