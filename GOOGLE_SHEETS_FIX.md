# Correção do Problema do Google Sheets

## Problema Identificado
O erro `ERR_OSSL_UNSUPPORTED` indica que a chave privada do Google não está no formato correto nas variáveis de ambiente.

## Solução 

### Passo 1: Verificar a Chave Privada
A chave privada deve estar neste formato exato no Netlify:

```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
[várias linhas de código]
...final da chave aqui
-----END PRIVATE KEY-----
```

### Passo 2: Configurar no Netlify
1. Acesse seu site no Netlify
2. Vá em **Site settings** → **Environment variables**
3. Para `GOOGLE_PRIVATE_KEY`:
   - Cole a chave COMPLETA incluindo `-----BEGIN PRIVATE KEY-----` e `-----END PRIVATE KEY-----`
   - Não remova as quebras de linha
   - Se necessário, copie diretamente do arquivo JSON original

### Passo 3: Testar
Após configurar corretamente:
1. Faça um novo deploy no Netlify
2. Teste o envio de uma pesquisa
3. Verifique se os dados aparecem na sua planilha

## Alternativa: Desabilitar Google Sheets Temporariamente
Se o problema persistir, você pode desabilitar temporariamente o Google Sheets removendo as variáveis de ambiente. O sistema continuará salvando no banco de dados PostgreSQL normalmente.

## Status Atual
- ✅ Sistema funcionando localmente
- ✅ Dados salvos no banco PostgreSQL
- ❌ Integração com Google Sheets com problema na chave
- ✅ Interface funcionando perfeitamente