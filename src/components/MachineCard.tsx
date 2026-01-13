import { Machine } from "@/types/machine";
import { 
  Cpu, 
  HardDrive, 
  MemoryStick, 
  Network, 
  Server,
  Building2,
  Edit,
  Trash2,
  Notebook,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface MachineCardProps {
  machine: Machine;
  index: number;
  onEdit?: (machine: Machine) => void;
  onDelete?: (machine: Machine) => void;
}

const MachineCard = ({ machine, index, onEdit, onDelete }: MachineCardProps) => {
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
        <span className="text-xs text-muted-foreground">{getStatusText(machine.status)}</span>
        <div className={`w-2 h-2 rounded-full ${getStatusColor(machine.status)} animate-pulse`} />
      </div>

      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
          <Server className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-300">
            {machine.hostName}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Network className="w-3 h-3 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-mono">{machine.ip}</span>
          </div>
        </div>
      </div>

      {/* Sector Badge */}
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary">{machine.setor}</span>
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center gap-3 p-3 rounded-md bg-secondary/50 border border-border/30">
          <Cpu className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Processador</p>
            <p className="text-sm text-foreground truncate">{machine.processador}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-md bg-secondary/50 border border-border/30">
          <MemoryStick className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Memória RAM</p>
            <p className="text-sm text-foreground">{machine.memoria}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-md bg-secondary/50 border border-border/30">
          <HardDrive className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Armazenamento</p>
            <p className="text-sm text-foreground">
              {machine.armazenamento} <span className="text-muted-foreground">({machine.tipoArmazenamento})</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-md bg-secondary/50 border border-border/30">
          <Notebook className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Pacote Office</p>
            <p className="text-sm text-foreground">{machine.licensaOffice}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-md bg-secondary/50 border border-border/30">
          <Shield className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Anti-Virus</p>
            <p className="text-sm text-foreground">{machine.antVirus}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      {(onEdit || onDelete) && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-border/30">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-2"
              onClick={() => onEdit(machine)}
            >
              <Edit className="w-3 h-3" />
              Editar
            </Button>
          )}
          {onDelete && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-destructive hover:text-destructive"
              onClick={() => onDelete(machine)}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          )}
        </div>
      )}

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-primary/5 to-transparent" />
      </div>
    </div>
  );
};

export default MachineCard;
