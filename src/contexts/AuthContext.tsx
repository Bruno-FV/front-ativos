import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthContextType, UserRole, RegisterRequest } from '@/types/auth';
import { AuthService } from "@/services/auth.service";
import { toast } from '@/hooks/use-toast';

// Cria o contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Props para o AuthProvider
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider do contexto de autenticação
 * Gerencia o estado global de autenticação da aplicação
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Estado do usuário autenticado
  const [user, setUser] = useState<User | null>(null);

  // Estado do token JWT
  const [token, setToken] = useState<string | null>(null);

  // Estado de carregamento
  const [loading, setLoading] = useState(true);

  // Verifica se está autenticado
  const isAuthenticated = !!user && !!token;

  // Verifica se é admin
  const isAdmin = user?.role === UserRole.ADMIN;

  /**
   * Função de login
   * @param email Email do usuário
   * @param password Senha do usuário
   */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);

      // Faz login através do serviço
      const loggedUser = await AuthService.login(email, password);

      // Atualiza estado
      setUser(loggedUser);
      setToken(AuthService.getToken());

      // Mostra mensagem de sucesso
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo, ${loggedUser.name}!`,
      });

    } catch (error) {
      // Mostra mensagem de erro
      toast({
        title: "Erro no login",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Função de registro
   * @param userData Dados do novo usuário
   */
  const register = async (userData: RegisterRequest): Promise<void> => {
    try {
      setLoading(true);

      // Faz registro através do serviço
      const message = await AuthService.register(userData);

      // Mostra mensagem de sucesso
      toast({
        title: "Registro realizado com sucesso!",
        description: message,
      });

    } catch (error) {
      // Mostra mensagem de erro
      toast({
        title: "Erro no registro",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Função de logout
   */
  const logout = (): void => {
    // Remove dados do serviço
    AuthService.logout();

    // Limpa estado
    setUser(null);
    setToken(null);

    // Mostra mensagem de sucesso
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  /**
   * Verifica se o usuário tem uma role específica
   * @param role Role a ser verificada
   * @returns true se tem a role, false caso contrário
   */
  const hasRole = (role: string): boolean => {
    return user ? user.role === role : false;
  };

  // Efeito para carregar dados de autenticação ao inicializar
  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Tenta obter dados armazenados
        const storedUser = AuthService.getUser();
        const storedToken = AuthService.getToken();

        if (storedUser && storedToken) {
          setUser(storedUser);
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Erro ao inicializar autenticação:', error);
        // Em caso de erro, limpa dados
        AuthService.logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Valor do contexto
  const value: AuthContextType = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    hasRole,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook para usar o contexto de autenticação
 * @returns Contexto de autenticação
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
