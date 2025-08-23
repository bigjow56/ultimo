# Deploy para Digital Ocean

## Informações sobre o Node.js

### Versão Recomendada
- **Node.js 20.x** (atualmente usando 20.19.3)
- Compatível com versões 18.x ou superior
- Use preferencialmente Node.js 20 LTS para melhor performance e suporte

### Configuração no Digital Ocean

#### 1. App Platform (Recomendado)
```yaml
# .do/app.yaml (opcional)
name: gym-survey-app
services:
- name: api
  source_dir: /
  github:
    repo: seu-repositorio
    branch: main
  run_command: npm run start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  routes:
  - path: /
  envs:
  - key: NODE_ENV
    value: production
  - key: DATABASE_URL
    value: ${DATABASE_URL}
  - key: GOOGLE_SHEET_ID
    value: ${GOOGLE_SHEET_ID}
```

#### 2. Droplet (VPS Manual)
```bash
# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clonar repositório
git clone seu-repositorio
cd gym-survey-app

# Instalar dependências
npm install

# Build da aplicação
npm run build

# Executar em produção
npm run start
```

### Variáveis de Ambiente Necessárias
```
NODE_ENV=production
DATABASE_URL=sua_url_postgresql
GOOGLE_SHEET_ID=1I3LXmmW5O80zcFXZaHSUC0LMra0QeVXaD5VCiqhlM1s
PORT=5000
```

### Scripts de Deploy
- `npm run dev` - Desenvolvimento local
- `npm run build` - Build para produção
- `npm run start` - Executar em produção
- `npm run production` - Build + Start (em sequência)

### Porta do Servidor
- O servidor roda na porta 5000 por padrão
- Configure a variável PORT se necessário
- Digital Ocean App Platform detecta automaticamente

### Banco de Dados
- PostgreSQL compatível (Neon Database funcionando)
- Use `npm run db:push` para sincronizar schema

### Arquivos Importantes
- `server/index.ts` - Servidor principal
- `server/routes.ts` - Rotas da API
- `server/storage.ts` - Conexão com banco
- `dist/` - Arquivos buildados para produção

### Estrutura Final
- Frontend: React + Vite (build estático)
- Backend: Express + TypeScript
- Banco: PostgreSQL + Drizzle ORM
- Deploy: Digital Ocean App Platform ou Droplet