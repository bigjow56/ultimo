# 🚀 Digital Ocean - Solução para Frontend + Backend

## Problema: Digital Ocean detectando apenas backend

### ✅ Solução 1: Configuração Manual no App Platform

#### 1. **No painel do Digital Ocean:**
- Vá em "App Platform" → Sua app
- Clique em "Settings" → "Components"

#### 2. **Configure o componente web:**
```yaml
Component Type: Web Service
Source: GitHub (seu repositório)
Branch: main
Build Command: npm run build
Run Command: npm start
Environment: Node.js 20.x
HTTP Port: 5000 (ou deixe automático)
```

#### 3. **Variáveis de ambiente:**
```
NODE_ENV=production
DATABASE_URL=sua_url_neon_database
GOOGLE_SHEET_ID=1I3LXmmW5O80zcFXZaHSUC0LMra0QeVXaD5VCiqhlM1s
```

### ✅ Solução 2: Upload do arquivo de credenciais

O arquivo `credentials_1755777560442.json` precisa estar na pasta `/attached_assets/` no servidor.

**Opções:**
1. **Fazer commit no repositório** (cuidado com segurança)
2. **Usar Docker Secrets** no Digital Ocean
3. **Variáveis de ambiente** (recomendado)

### ✅ Solução 3: Verificar arquivos obrigatórios

Certifique-se que estes arquivos estão no seu repositório:
- ✅ `package.json` (com scripts build e start)
- ✅ `.do/app.yaml` (criado agora)
- ✅ `Procfile` (criado agora)
- ✅ `attached_assets/credentials_1755777560442.json`

### 🔧 Comandos de teste local:

```bash
# Testar build local
npm run build

# Verificar se dist/ foi criado
ls -la dist/

# Testar produção local
NODE_ENV=production npm start
```

### 📝 Status atual:
- ✅ Backend funcionando (Express + API)
- ✅ Google Sheets salvando dados
- ✅ PostgreSQL funcionando
- 🔧 Frontend precisando ser servido pelo Express

### 💡 Se ainda não funcionar:

#### Opção A: Deploy como Web Service
- No Digital Ocean, escolha "Web Service" (não "Static Site")
- Use os comandos: Build=`npm run build`, Start=`npm start`

#### Opção B: Verificar logs do build
- Acesse os logs do Digital Ocean para ver se o `npm run build` está funcionando
- Verifique se os arquivos estão sendo criados em `dist/`

**O sistema está pronto para deploy. O problema é apenas de configuração no Digital Ocean.**