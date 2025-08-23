# 📁 Estrutura Organizada do Projeto RM GYM

## 🎨 **FRONTEND** (Interface do usuário)
```
client/                          # 👥 INTERFACE DO USUÁRIO
├── index.html                   # Página principal HTML
├── public/                      # Arquivos públicos (favicon, imagens)
├── src/                         # Código React + TypeScript
│   ├── components/              # Componentes React reutilizáveis
│   │   ├── ui/                  # Componentes shadcn/ui (Button, Form, etc)
│   │   └── survey-form.tsx      # Formulário principal da pesquisa
│   ├── pages/                   # Páginas da aplicação
│   ├── lib/                     # Utilitários e configurações
│   │   ├── api.ts              # Cliente para chamadas da API
│   │   └── queryClient.ts      # Configuração TanStack Query
│   ├── hooks/                   # Hooks personalizados React
│   ├── App.tsx                 # Componente raiz da aplicação
│   ├── main.tsx                # Ponto de entrada do React
│   └── index.css               # Estilos globais Tailwind CSS
└── vite.config.ts              # Configuração do Vite (build frontend)
```

## 🔧 **BACKEND** (Servidor e API)
```
server/                          # 🔧 SERVIDOR E API
├── index.ts                     # Servidor Express principal
├── routes.ts                    # Rotas da API (/api/surveys, etc)
├── storage.ts                   # Interface banco de dados + Google Sheets
└── vite.ts                      # Servir arquivos estáticos em produção
```

## 🔄 **COMPARTILHADO** (Usado por ambos)
```
shared/                          # 🔄 TIPOS E VALIDAÇÕES
└── schema.ts                    # Schemas Zod + tipos TypeScript
```

## 📂 **ASSETS E CONFIGURAÇÕES**
```
attached_assets/                 # 📎 ARQUIVOS ANEXOS
├── credentials_xxx.json         # Credenciais Google Sheets
└── images/                      # Imagens do projeto (logo, etc)

dist/                           # 📦 ARQUIVOS COMPILADOS (PRODUÇÃO)
├── index.js                    # Backend compilado
└── public/                     # Frontend compilado
    ├── index.html              # HTML otimizado
    └── assets/                 # CSS e JS minificados

node_modules/                   # 📚 DEPENDÊNCIAS
```

## ⚙️ **ARQUIVOS DE CONFIGURAÇÃO**
```
📋 RAIZ DO PROJETO:
├── package.json                # Dependências e scripts
├── tsconfig.json              # Configuração TypeScript
├── tailwind.config.ts         # Configuração Tailwind CSS
├── drizzle.config.ts          # Configuração banco de dados
├── app.yaml                   # Configuração Digital Ocean
├── Procfile                   # Comando de start para deploy
└── .env                       # Variáveis de ambiente locais
```

---

## 🚀 **Como cada parte funciona:**

### **Desenvolvimento (Replit):**
- `npm run dev` → Roda frontend (`client/`) e backend (`server/`) juntos
- Frontend acessível via Vite dev server
- Backend API disponível em `/api/*`

### **Produção (Digital Ocean):**
- `npm run build` → Compila tudo para `dist/`
- Express serve frontend estático + API
- Duas opções de deploy no `app.yaml`

### **Fluxo de dados:**
1. **Usuario** → Frontend (`client/`)
2. **Frontend** → API Backend (`server/routes.ts`)
3. **Backend** → Google Sheets + PostgreSQL (`server/storage.ts`)
4. **Validação** → Schemas compartilhados (`shared/schema.ts`)

**✅ Estrutura agora está clara e organizada para fácil identificação!**