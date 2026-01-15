import { Monitor } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-header">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20 border border-primary/30">
            <Monitor className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Iventário<span className="text-primary">HSR</span>
            </h1>
            <p className="text-xs text-muted-foreground">
              Sistema de Monitoramento
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
