# 🚨 Digital Ocean - Comandos Corretos

## ❌ ERRO: "vite was not found"

### ✅ SOLUÇÃO 1: Use comandos completos no Digital Ocean

**Build Command:**
```
npm ci && npx vite build && npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
```

**Run Command:**
```
npm start
```

### ✅ SOLUÇÃO 2: Configure manualmente no Digital Ocean

**No campo "Build Command", cole EXATAMENTE:**
```
npm ci && npx vite build && npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
```

**No campo "Run Command", cole:**
```
npm start
```

### 🔧 Por que estava falhando:
- Digital Ocean não encontrou o comando `vite` 
- Precisa usar `npx vite` para garantir que funcione
- `npm ci` garante instalação das dependências

### 📋 Environment Variables (mantenha as mesmas):
```
NODE_ENV=production
GOOGLE_SHEETS_SPREADSHEET_ID=1I3LXmmW5O80zcFXZaHSUC0LMra0QeVXaD5VCiqhlM1s
GOOGLE_SERVICE_ACCOUNT_EMAIL=n8n-406@sonic-shuttle-467918-g0.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=[sua chave completa]
DATABASE_URL=[sua url neon]
```

### ⚙️ Outras configurações:
- Component Type: **Web Service**
- Environment: **Node.js 20.x**
- HTTP Port: **5000**
- Routes: **/**

**Use os comandos corretos acima e o deploy vai funcionar!**