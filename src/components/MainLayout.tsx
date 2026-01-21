import { Outlet } from "react-router-dom";
import { Sun, Moon, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useTheme } from "next-themes";
import Footer from "@/components/Footer";

export default function MainLayout() {
  // CONTROLE GLOBAL DE TEMA (CORRETO)
  const { theme, setTheme } = useTheme();
  // CONTROLE DE AUTENTICAÇÃO
  const { user, logout, isAdmin } = useAuth();

  // Função para obter as iniciais do email do usuário
  const getUserInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  // Função para formatar o role do usuário
  const formatRole = (role: string) => {
    switch (role) {
      case 'ROLE_ADMIN':
        return 'Administrador';
      case 'ROLE_USER':
        return 'Usuário';
      default:
        return role;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-dark">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="h-14 flex items-center justify-between border-b border-border/30 px-4 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
            {/* LADO ESQUERDO */}
            <div className="flex items-center gap-2">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            </div>

            {/* LADO DIREITO */}
            <div className="flex items-center gap-2">
              {/* Menu do usuário */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user ? getUserInitials(user.email) : <User className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.email}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user ? formatRole(user.role) : ''}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

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
          </header>

          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
