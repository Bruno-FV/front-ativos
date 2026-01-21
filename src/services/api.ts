import axios from "axios";
import { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth";

// URL base da API com fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Cria instância base do axios
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Instância separada para autenticação (sem interceptores)
export const authApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Interceptor para adicionar token JWT nas requisições autenticadas
api.interceptors.request.use(
  (config) => {
    // Busca o token do localStorage
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Adiciona o token no header Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se receber erro 401 (não autorizado), redireciona para login
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Endpoints de autenticação
 */
export const authEndpoints = {
  /**
   * Faz login do usuário
   * @param credentials Dados de login (email e senha)
   * @returns Promise com resposta de autenticação
   */
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await authApi.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  /**
   * Registra um novo usuário
   * @param userData Dados do novo usuário
   * @returns Promise com resposta de sucesso
   */
  register: async (userData: RegisterRequest): Promise<string> => {
    const response = await authApi.post<string>('/auth/register', userData);
    return response.data;
  },
};


