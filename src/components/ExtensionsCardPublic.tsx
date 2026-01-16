import { Extension } from "@/types/extension";
import { Phone, MapPin, Building2, Edit, Trash2 } from "lucide-react";

interface ExtensionCardProps {
  extension: Extension;
  index: number;
}

const ExtensionCard = ({ extension, index }: ExtensionCardProps) => {

  return (
    <div
      className="group relative bg-gradient-card rounded-lg border border-border/50 p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-primary/30 hover:scale-[1.02] animate-slide-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
          <Phone className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-300">
            {extension.ramal}
          </h3>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {extension.setor}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExtensionCard;
