import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSurveySchema } from "@shared/schema";
import { z } from "zod";
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { GoogleAuth } from 'google-auth-library';
// Standard Express server for Digital Ocean deployment

export async function registerRoutes(app: Express): Promise<Server> {
  // Survey routes
  app.post("/api/surveys", async (req, res) => {
    try {
      const validatedData = insertSurveySchema.parse(req.body);
      
      // Save to database
      const survey = await storage.insertSurvey(validatedData);
      
      // Save to Google Sheets if credentials are available
      console.log('Verificando credenciais do Google Sheets...');
      // Enable Google Sheets with corrected credentials
      const enableGoogleSheets = true;
      const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || process.env.GOOGLE_SHEET_ID;
      
      if (spreadsheetId && enableGoogleSheets) {
        console.log('Tentando salvar no Google Sheets...');
        try {
          let auth;
          
          // Tentar primeiro com variáveis de ambiente (produção/Digital Ocean)
          if (process.env.NODE_ENV === 'production' && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
            console.log('Usando credenciais das variáveis de ambiente (produção)...');
            const credentials = {
              client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
              private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            };
            
            auth = new GoogleAuth({
              credentials,
              scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });
            console.log('✅ Autenticação criada com variáveis de ambiente');
          } else {
            // Fallback para arquivo credentials.json (desenvolvimento local)
            console.log('Carregando credenciais do arquivo JSON (desenvolvimento)...');
            const fs = await import('fs');
            const path = await import('path');
            
            const credentialsPath = path.join(process.cwd(), 'credentials.json');
            console.log('Caminho do arquivo de credenciais:', credentialsPath);
            
            if (!fs.existsSync(credentialsPath)) {
              throw new Error('Arquivo credentials.json não encontrado e variáveis de ambiente não configuradas');
            }
            
            const credentialsText = fs.readFileSync(credentialsPath, 'utf8');
            const credentials = JSON.parse(credentialsText);
            console.log('✅ Arquivo de credenciais carregado');
            
            auth = new GoogleAuth({
              credentials,
              scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });
          }
          
          console.log('Conectando à planilha...');
          const doc = new GoogleSpreadsheet(spreadsheetId, auth);
          console.log('✅ Conexão com planilha criada');
          
          console.log('Carregando informações da planilha...');
          await doc.loadInfo();
          const sheet = doc.sheetsByIndex[0];
          
          console.log('Título da planilha:', doc.title);
          console.log('Nome da aba:', sheet.title);
          console.log('Número de linhas:', sheet.rowCount);
          console.log('Número de colunas:', sheet.columnCount);
          
          // Load a range of cells to check permissions
          console.log('Carregando células para verificar permissões...');
          await sheet.loadCells('A1:L10');
          
          console.log('✅ Planilha carregada com sucesso!');
          console.log('Próxima linha disponível:', sheet.rowCount + 1);
          
          // Add data directly by column position
          const rowData = [
            new Date().toLocaleString('pt-BR'), // A - Timestamp
            validatedData.name || '',            // B - Nome
            validatedData.email || '',           // C - Email
            validatedData.trainingSchedule,      // D - Horário
            validatedData.experienceLevel,       // E - Experiência
            validatedData.academyTime,           // F - Tempo na academia
            validatedData.receptionService,      // G - Recepção
            validatedData.instructorSupport,     // H - Instrutores
            validatedData.trainingGuidance,      // I - Orientação
            validatedData.equipmentAvailability, // J - Equipamentos
            validatedData.overallSatisfaction,   // K - Satisfação
            validatedData.suggestions || ''      // L - Comentários
          ];
          
          console.log('📝 Dados a serem adicionados:', rowData);
          await sheet.addRow(rowData);
          console.log('✅ Dados salvos no Google Sheets com sucesso!');
        } catch (sheetsError: any) {
          console.error('❌ Erro ao salvar no Google Sheets:', sheetsError?.message || 'Erro desconhecido');
          console.error('💡 SOLUÇÃO: Compartilhe a planilha Google Sheets com a conta de serviço');
          console.error('💡 Email: n8n-406@sonic-shuttle-467918-g0.iam.gserviceaccount.com');
          console.error('💡 Permissão: Editor');
          console.error('💡 Consulte GOOGLE_SHEETS_STATUS.md para instruções detalhadas');
          // Continue execution - database save was successful
        }
      } else {
        console.log('Google Sheets não configurado - dados salvos apenas no PostgreSQL');
        console.log('GOOGLE_SHEETS_SPREADSHEET_ID presente:', !!process.env.GOOGLE_SHEETS_SPREADSHEET_ID);
        console.log('GOOGLE_SHEET_ID presente:', !!process.env.GOOGLE_SHEET_ID);
        console.log('GOOGLE_SERVICE_ACCOUNT_EMAIL presente:', !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
        console.log('GOOGLE_PRIVATE_KEY presente:', !!process.env.GOOGLE_PRIVATE_KEY);
        console.log('credentials.json existe:', require('fs').existsSync(require('path').join(process.cwd(), 'credentials.json')));
        console.log('enableGoogleSheets:', enableGoogleSheets);
      }
      
      res.json({ 
        success: true, 
        message: 'Pesquisa enviada com sucesso!',
        data: survey 
      });
    } catch (error) {
      console.error('Survey API error:', error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          error: 'Dados inválidos', 
          details: error.errors 
        });
        return;
      }
      
      res.status(500).json({ 
        error: 'Erro interno do servidor. Tente novamente mais tarde.' 
      });
    }
  });

  app.get("/api/surveys", async (req, res) => {
    try {
      const surveys = await storage.getAllSurveys();
      res.json({ surveys });
    } catch (error) {
      console.error('Get surveys error:', error);
      res.status(500).json({ error: 'Erro ao buscar pesquisas' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
