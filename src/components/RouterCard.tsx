import { Router } from "@/types/router";
import { Wifi, Network, Building2, Key, User, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface RouterCardProps {
  router: Router;
  index: number;
  onEdit: (router: Router) => void;
  onDelete: (router: Router) => void;
}

const RouterCard = ({ router, index, onEdit, onDelete }: RouterCardProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfigPassword, setShowConfigPassword] = useState(false);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "online":
        return "bg-emerald-500";
      case "offline":
        return "bg-red-500";
      case "maintenance":
        return "bg-amber-500";
      default:
        return "bg-muted";
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case "online":
        return "Online";
      case "offline":
        return "Offline";
      case "maintenance":
        return "Manutenção";
      default:
        return "Desconhecido";
    }
  };

  return (
    <div
      className="group relative bg-gradient-card rounded-lg border border-border/50 p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-primary/30 hover:scale-[1.02] animate-slide-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Status Indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className="text-xs text-muted-foreground">{getStatusText(router.status)}</span>
        <div className={`w-2 h-2 rounded-full ${getStatusColor(router.status)} animate-pulse`} />
      </div>

      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
          <Wifi className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-300">
            
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Network className="w-3 h-3 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-mono">{router.ip}</span>
          </div>
        </div>
      </div>

      {/* Sector Badge */}
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary">{router.setor}</span>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center gap-3 p-3 rounded-md bg-secondary/50 border border-border/30">
          <Wifi className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">Rede WiFi</p>
            <p className="text-sm text-foreground truncate">{router.ssid}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-md bg-secondary/50 border border-border/30">
          <Key className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">Senha WiFi</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-foreground font-mono">
                {showPassword ? router.senhaRedeWifi : "••••••••••"}
              </p>
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-md bg-secondary/50 border border-border/30">
          <User className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">Acesso Configuração</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-foreground font-mono">
                {router.loginConfiguracao} / {showConfigPassword ? router.senhaConfiguracao : "••••••"}
              </p>
              <button
                onClick={() => setShowConfigPassword(!showConfigPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfigPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-border/30">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-2"
          onClick={() => onEdit(router)}
        >
          <Edit className="w-3 h-3" />
          Editar
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-destructive hover:text-destructive"
          onClick={() => onDelete(router)}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default RouterCard;
