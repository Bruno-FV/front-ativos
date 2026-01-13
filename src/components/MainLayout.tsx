import { Outlet } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useTheme } from "next-themes";



export default function MainLayout() {
  // ✅ CONTROLE GLOBAL DE TEMA (CORRETO)
  const { theme, setTheme } = useTheme();
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
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
