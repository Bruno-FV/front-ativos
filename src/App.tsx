import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import MainLayout from "./components/MainLayout";
import MachinesPage from "./pages/MachinesPage";
import RoutersPage from "./pages/RoutersPage";
import ExtensionsPage from "./pages/ExtensionsPage";
import ExtensionsPublic from "./pages/ExtensionsPublic";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * Componente para proteger rotas que requerem autenticação
 */
const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode; requireAdmin?: boolean }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  // Mostra loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Se não está autenticado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se requer admin e usuário não é admin, redireciona para extensions
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/extensionsPublic" replace />;
  }

  return <>{children}</>;
};

/**
 * Componente para rotas públicas (login/register) - só acessível se não autenticado
 */
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  // Mostra loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Se já está autenticado, redireciona para a página inicial apropriada
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

/**
 * Componente para rota de registro - acessível para não autenticados (auto-registro) e admins (criar usuários)
 */
const RegisterRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  // Mostra loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Se não está autenticado, permite auto-registro
  if (!isAuthenticated) {
    return <>{children}</>;
  }

  // Se está autenticado e é admin, permite criar usuários
  if (isAuthenticated && isAdmin) {
    return <>{children}</>;
  }

  // Se está autenticado mas não é admin, redireciona para página inicial
  return <Navigate to="/" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Rotas públicas - só acessíveis se não autenticado */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <RegisterRoute>
                  <RegisterPage />
                </RegisterRoute>
              }
            />

            {/* Rotas protegidas - requerem autenticação */}
            <Route
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              {/* Página inicial - redireciona baseado no role */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    {/* Usuários comuns vão para ramais, admins para máquinas */}
                    <ExtensionsPublic />
                  </ProtectedRoute>
                }
              />

              {/* Página de ramais - acessível para todos os usuários autenticados */}
              <Route path="/extensionsPublic" element={<ExtensionsPublic />} />

              {/* Páginas de admin - só para administradores */}
              <Route
                path="/machines"
                element={
                  <ProtectedRoute requireAdmin>
                    <MachinesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/routers"
                element={
                  <ProtectedRoute requireAdmin>
                    <RoutersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/extensions"
                element={
                  <ProtectedRoute requireAdmin>
                    <ExtensionsPage />
                  </ProtectedRoute>
                }
              />


            </Route>


            {/* Página 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
