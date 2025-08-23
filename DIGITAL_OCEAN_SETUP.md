# 🔧 Digital Ocean - Configuração Correta

## ❌ PROBLEMA IDENTIFICADO:
O Digital Ocean está tentando tratar como dois componentes separados (frontend + backend), mas nossa aplicação é **FULL-STACK ÚNICA**.

## ✅ SOLUÇÃO:

### **No Digital Ocean App Platform:**

#### 1. **Tipo de Aplicação:**
- Escolha: **"Web Service"** (NÃO "Static Site")
- Framework: **Node.js**

#### 2. **Source Settings:**
```
Repository: bigjow56/Academiarm
Branch: main
Source Directory: / (deixe vazio ou "/")
```

#### 3. **Build & Run Commands:**
```
Build Command: npm run build
Run Command: npm start
```

#### 4. **App-Level Settings:**
```
Name: pesquisa-academia
Environment: Node.js 20.x
HTTP Port: 5000 (ou deixe automático)
```

#### 5. **Environment Variables:**
```
NODE_ENV=production

GOOGLE_SHEETS_SPREADSHEET_ID=1I3LXmmW5O80zcFXZaHSUC0LMra0QeVXaD5VCiqhlM1s

GOOGLE_SERVICE_ACCOUNT_EMAIL=n8n-406@sonic-shuttle-467918-g0.iam.gserviceaccount.com

GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC++AnmeC0iOPwb
eTktleuV72TR5+dCYdSesi36l++6EvrInGcXlYkEINSMCgHyZQuqzQM4YbKbUOLT
v+FAhcsQMiNPHRNBh6esfsDbX3xxhjU2yGMPWS0bWfo6ldJKvgcR74WluPQ2yhdG
sIFtdeP9ifBljpCufOv5lzxiEzI80FBwJYwIiWj8dLV3K4QqP8RbtWohITj6MhWM
cGuvow+cx/HyYkpMZcK4v+izDUrj7gYXbL8oOmJnTq/8puwoHAMG6GnQ2X4xKmBd
X5sOQwTq/SRFrPAdj3LtPsGfiXyI98lFiUjXCPJfZRqzStl06xe6PNfvUQ/mpDGH
6OfLY56/AgMBAAECggEADdaReRbqRlmUwzTklM4RVTsUtjU0x9OYKcCHG4zOKIZw
[... sua chave completa ...]
-----END PRIVATE KEY-----

DATABASE_URL=sua_url_neon_database
```

---

## 🚫 **NÃO USE o arquivo app.yaml**

O Digital Ocean está confuso com o app.yaml. **Delete ele** ou **ignore** durante o setup manual.

## ✅ **Configuração Manual Correta:**

1. **Create App** → **GitHub**
2. **Repository:** bigjow56/Academiarm
3. **Detect Framework:** Deixe o Digital Ocean detectar automaticamente
4. **Component Type:** Web Service
5. **Build Command:** npm run build
6. **Run Command:** npm start
7. **Add Environment Variables** (copie as variáveis acima)

---

## 🔍 **Por que estava falhando:**
- Digital Ocean tentou separar frontend/backend
- Tentou buscar `client/index.html` como entrada
- Nossa aplicação é EXPRESS que serve TUDO

## ✅ **Como funciona corretamente:**
- Express serve API em `/api/*`
- Express serve arquivos React em `/`
- Um único componente, um único build

**Faça o setup manual e ignore o app.yaml!**