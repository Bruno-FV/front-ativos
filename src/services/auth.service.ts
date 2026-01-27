import { User, AuthResponse, RegisterRequest } from '@/types/auth';
import { authEndpoints } from './api';

/**
 * Chaves para armazenamento no localStorage
 */
const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'auth_user',
};

/**
 * Serviço de autenticação
 * Gerencia operações de login, registro, logout e persistência de dados
 */
export class AuthService {
  /**
   * Faz login do usuário
   * @param email Email do usuário
   * @param password Senha do usuário
   * @returns Promise com dados do usuário autenticado
   */
  static async login(email: string, password: string): Promise<User> {
    try {
      // Faz requisição de login
      const response: AuthResponse = await authEndpoints.login({ email, password });

      // Cria objeto User a partir da resposta
      const user: User = {
        id: '', // O backend pode não retornar o ID na resposta de login
        name: response.name || '', // Fallback para string vazia se name não existir
        sector: "",
        email: response.email,
        role: response.role as 'ROLE_ADMIN' | 'ROLE_USER',
      };

      // Armazena dados no localStorage
      this.setToken(response.token);
      this.setUser(user);

      return user;
    } catch (error) {
      // Trata erros específicos do backend
      if (error instanceof Error) {
        throw new Error(error.message || 'Erro ao fazer login');
      }
      throw new Error('Erro desconhecido ao fazer login');
    }
  }

  /**
   * Registra um novo usuário
   * @param userData Dados do novo usuário
   * @returns Promise com mensagem de sucesso
   */
  static async register(userData: RegisterRequest): Promise<string> {
    try {
      // Faz requisição de registro
      const message: string = await authEndpoints.register(userData);

      return message;
    } catch (error) {
      // Trata erros específicos do backend
      if (error instanceof Error) {
        throw new Error(error.message || 'Erro ao registrar usuário');
      }
      throw new Error('Erro desconhecido ao registrar usuário');
    }
  }

  /**
   * Faz logout do usuário
   * Remove todos os dados de autenticação do localStorage
   */
  static logout(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  /**
   * Obtém o token JWT armazenado
   * @returns Token JWT ou null se não existir
   */
  static getToken(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('Erro ao obter token:', error);
      return null;
    }
  }

  /**
   * Armazena o token JWT
   * @param token Token JWT a ser armazenado
   */
  static setToken(token: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } catch (error) {
      console.error('Erro ao armazenar token:', error);
    }
  }

  /**
   * Obtém os dados do usuário armazenados
   * @returns Dados do usuário ou null se não existir
   */
  static getUser(): User | null {
    try {
      const userJson = localStorage.getItem(STORAGE_KEYS.USER);
      if (!userJson) {
        return null;
      }

      const userData = JSON.parse(userJson);
      return userData as User;
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
      // Em caso de erro, remove dados corrompidos
      this.logout();
      return null;
    }
  }

  /**
   * Armazena os dados do usuário
   * @param user Dados do usuário a serem armazenados
   */
  static setUser(user: User): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Erro ao armazenar dados do usuário:', error);
    }
  }

  /**
   * Verifica se o usuário está autenticado
   * @returns true se há token e usuário válidos, false caso contrário
   */
  static isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getUser();

    return !!(token && user);
  }

  /**
   * Verifica se o usuário atual é administrador
   * @returns true se o usuário é admin, false caso contrário
   */
  static isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'ROLE_ADMIN';
  }
}
function toast(arg0: { variant: string; title: string; description: string; }) {
  throw new Error('Function not implemented.');
}

