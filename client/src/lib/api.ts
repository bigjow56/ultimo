import { apiRequest } from "./queryClient";
import type { InsertSurvey } from "../../../shared/schema";

// API configuration for Digital Ocean and other standard deployments
// Always use standard /api prefix since we have a normal Express server
const API_BASE = '/api';

export const surveyApi = {
  submit: async (data: InsertSurvey) => {
    const endpoint = `${API_BASE}/surveys`;
    console.log('Enviando para:', endpoint);
    console.log('Ambiente:', import.meta.env.MODE === 'production' ? 'Produção' : 'Desenvolvimento');
    console.log('Hostname:', typeof window !== 'undefined' ? window.location.hostname : 'SSR');
    
    try {
      const response = await apiRequest("POST", endpoint, data);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Resposta de erro:', response.status, errorText);
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }
      return response.json();
    } catch (error) {
      console.error('❌ Erro na API:', error);
      throw error;
    }
  },
  
  getAll: async () => {
    const response = await apiRequest("GET", `${API_BASE}/surveys`);
    return response.json();
  },

  health: async () => {
    const response = await apiRequest("GET", `${API_BASE}/health`);
    return response.json();
  }
};
