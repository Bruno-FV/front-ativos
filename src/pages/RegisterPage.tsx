import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CircleUserRound, Eye, EyeOff, Lock, Mail, MapPin, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import logo from "/Logo.png";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading, isAdmin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    sector: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: UserRole.USER, // Padrão para usuário comum
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Erro na validação",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Verifica se as senhas coincidem
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro na validação",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    // Verifica se a senha tem pelo menos 6 caracteres
    if (formData.password.length < 6) {
      toast({
        title: "Erro na validação",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    // Verifica se o email é válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Erro na validação",
        description: "Digite um email válido.",
        variant: "destructive",
      });
      return;
    }

    // Só admin pode criar outros admins
    if (formData.role === UserRole.ADMIN && !isAdmin) {
      toast({
        title: "Acesso negado",
        description: "Apenas administradores podem criar usuários administradores.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Faz registro usando o contexto de autenticação
      await register({
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      // Redireciona para login após registro bem-sucedido
      navigate("/login");
    } catch (error) {
      // Erro já tratado no contexto
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Register Container */}
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

          {/* Register Card */}
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 p-8 shadow-2xl backdrop-blur-xl">
            {/* Glow effects */}
            <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-foreground">
                  Criar Conta
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Registre-se para acessar o sistema
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Nome *
                  </Label>
                  <div className="relative">
                    <CircleUserRound className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      type="name"
                      placeholder="Digite seu nome"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="pl-10 bg-background/50 border-border/50 focus:border-primary transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="sector" className="text-foreground">
                    Setor *
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="sector"
                      type="sector"
                      placeholder="Digite seu nome"
                      value={formData.sector}
                      onChange={(e) =>
                        setFormData({ ...formData, sector: e.target.value })
                      }
                      className="pl-10 bg-background/50 border-border/50 focus:border-primary transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Digite seu email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="pl-10 bg-background/50 border-border/50 focus:border-primary transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">
                    Senha *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha (mín. 6 caracteres)"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary transition-all duration-300"
                      required
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-foreground">
                    Confirmar Senha *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirme sua senha"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, confirmPassword: e.target.value })
                      }
                      className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Campo de role - só mostra se for admin */}
                {isAdmin && (
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-foreground">
                      Tipo de Usuário
                    </Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value: UserRole) =>
                        setFormData({ ...formData, role: value })
                      }
                    >
                      <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                        <SelectValue placeholder="Selecione o tipo de usuário" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={UserRole.USER}>Usuário Comum</SelectItem>
                        <SelectItem value={UserRole.ADMIN}>Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-base transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Criando conta...
                    </div>
                  ) : (
                    "Criar Conta"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm text-primary hover:underline"
                >
                  Já tem uma conta? Faça login
                </button>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                  Hospital São Rafael © {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
