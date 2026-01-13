import { Extension } from "@/types/extension";
import { Phone, MapPin, Building2, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExtensionCardProps {
  extension: Extension;
  index: number;
  onEdit: (extension: Extension) => void;
  onDelete: (extension: Extension) => void;
}

const ExtensionCard = ({ extension, index, onEdit, onDelete }: ExtensionCardProps) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500";
      case "inactive":
        return "bg-red-500";
      default:
        return "bg-muted";
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "inactive":
        return "Inativo";
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
        <span className="text-xs text-muted-foreground">{getStatusText(extension.status)}</span>
        <div className={`w-2 h-2 rounded-full ${getStatusColor(extension.status)} animate-pulse`} />
      </div>

      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
          <Phone className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-300">
            {extension.ramal}
          </h3>
          {/*<p className="text-sm text-foreground truncate">{extension.name}</p>*/}
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{extension.setor}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          {/*<span className="text-sm text-muted-foreground">{extension.location}</span>*/}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-border/30">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-2"
          onClick={() => onEdit(extension)}
        >
          <Edit className="w-3 h-3" />
          Editar
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 text-destructive hover:text-destructive"
          onClick={() => onDelete(extension)}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default ExtensionCard;
