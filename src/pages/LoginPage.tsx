import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Moon, Sun, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import logo from "/Logo.png";
import Footer from "@/components/Footer";
import { useTheme } from "next-themes";

const LoginPage = () => {
  // CONTROLE GLOBAL DE TEMA (CORRETO)
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!formData.email || !formData.password) {
      return;
    }

    try {
      // Faz login usando o contexto de autenticação
      await login(formData.email, formData.password);

      // Redireciona baseado no role do usuário
      // Usuários comuns vão para ramais, admins para máquinas
      navigate("/");
    } catch (error) {
      // Erro já tratado no contexto
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="flex items-end justify-end mt-4 mr-2 relative z-50 overflow-hidden">
        {/* Botão de alternância de tema */}
        <Button
          variant="ghost"
          size="lg"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="!h-8 !w-8" />
          ) : (
            <Moon className="!h-8 !w-8" />
          )}
        </Button>
      </div>
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Login Container */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-white/10 backdrop-blur-xl" />
              <img
                src={logo}
                alt="Hospital São Rafael"
                className="relative h-20 w-auto rounded-lg bg-white p-3 shadow-2xl"
              />
            </div>
          </div>

          {/* Login Card */}
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-8 shadow-2xl backdrop-blur-xl">
            {/* Glow effects */}
            <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-foreground">
                  Bem-vindo
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Faça login para acessar o sistema
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Digite seu email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="pl-10 bg-background/50 border-border/50 focus:border-primary transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-base transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Entrando...
                    </div>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </form>
              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate("/register")}
                  className="text-sm text-primary hover:underline"
                >
                  Não tem uma conta? Criar
                </button>
              </div>
              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground">
                  Hospital São Rafael © {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="z-50 relative flex">
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;
