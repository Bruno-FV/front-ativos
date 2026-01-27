/**
 * Tipos TypeScript para autenticação, baseados nos DTOs do backend Java
 */

/**
 * Interface para requisição de login
 * Corresponde ao LoginRequest.java do backend
 */
export interface LoginRequest {
  /** Email do usuário para autenticação */
  email: string;
  /** Senha do usuário para autenticação */
  password: string;
}

/**
 * Interface para resposta de autenticação
 * Corresponde ao AuthResponse.java do backend
 */
export interface AuthResponse {
  /** Token JWT gerado para o usuário autenticado */
  token: string;
  /** Email do usuário autenticado */
  email: string;
  /** Role do usuário autenticado (ROLE_ADMIN, ROLE_USER) */
  role: string;
  /**Nome do Usuário autenticado */
  name: string;
}

/**
 * Interface para dados do usuário
 * Corresponde ao modelo Users.java do backend
 */
export interface User {
  /** ID único do usuário (UUID) */
  id: string;
  /** Email único do usuário */
  email: string;
  /** Senha criptografada (não usada no frontend) */
  password?: string;
  /** Role do usuário (ROLE_ADMIN, ROLE_USER) */
  role: 'ROLE_ADMIN' | 'ROLE_USER';
  /** Nome do usuário */
  name: string;
  /** Setor do Usuário */
  sector: string;
}

/**
 * Interface para requisição de registro
 * Usada para criar novos usuários no frontend
 */
export interface RegisterRequest {
  /** Email do novo usuário */
  email: string;
  /** Senha do novo usuário */
  password: string;
  /** Role do novo usuário (só admin pode definir ROLE_ADMIN) */
  role: 'ROLE_ADMIN' | 'ROLE_USER';
  /** Nome do usuário */
  name: string;
  /** Setor do Usuário */
  sector: string;
}

/**
 * Enum para roles do sistema
 * Corresponde ao Role.java do backend
 */
export enum UserRole {
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER'
}

/**
 * Interface para o contexto de autenticação
 */
export interface AuthContextType {
  /** Usuário atualmente logado */
  user: User | null;
  /** Token JWT atual */
  token: string | null;
  /** Indica se está carregando dados de autenticação */
  loading: boolean;
  /** Indica se o usuário está autenticado */
  isAuthenticated: boolean;
  /** Faz login do usuário */
  login: (email: string, password: string) => Promise<void>;
  /** Registra um novo usuário */
  register: (userData: RegisterRequest) => Promise<void>;
  /** Faz logout do usuário */
  logout: () => void;
  /** Verifica se o usuário tem uma role específica */
  hasRole: (role: string) => boolean;
  /** Verifica se o usuário é admin */
  isAdmin: boolean;
}
