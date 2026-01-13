import { Search, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterType: string;
  onFilterTypeChange: (value: string) => void;
  sectors: string[];
  selectedSector: string;
  onSectorChange: (value: string) => void;
}

const SearchBar = ({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterTypeChange,
  sectors,
  selectedSector,
  onSectorChange,
}: SearchBarProps) => {
  const clearSearch = () => {
    onSearchChange("");
    onSectorChange("all");
  };

  return (
    <div className="w-full space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Pesquisar máquinas..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 pr-10 h-12 bg-card border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 transition-all duration-200"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Type Select */}
        <Select value={filterType} onValueChange={onFilterTypeChange}>
          <SelectTrigger className="w-full sm:w-[180px] h-12 bg-card border-border/50 text-foreground focus:border-primary focus:ring-primary/20">
            <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Filtrar por" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all">Todos os campos</SelectItem>
            <SelectItem value="name">Nome</SelectItem>
            <SelectItem value="ip">IP</SelectItem>
            <SelectItem value="sector">Setor</SelectItem>
            <SelectItem value="typeArmazenamento">Tipo de Armazenamento</SelectItem>
            <SelectItem value="processor">Processador</SelectItem>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
            <SelectItem value="maintenance">Manutenção</SelectItem>
          </SelectContent>
        </Select>

        {/* Sector Filter */}
        <Select value={selectedSector} onValueChange={onSectorChange}>
          <SelectTrigger className="w-full sm:w-[200px] h-12 bg-card border-border/50 text-foreground focus:border-primary focus:ring-primary/20">
            <SelectValue placeholder="Selecionar setor" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all">Todos os setores</SelectItem>
            {sectors.map((sector) => (
              <SelectItem key={sector} value={sector}>
                {sector}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || selectedSector !== "all") && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Filtros ativos:</span>
          {searchTerm && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
              "{searchTerm}"
              <button onClick={() => onSearchChange("")} className="ml-1 hover:text-primary-foreground">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedSector !== "all" && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
              {selectedSector}
              <button onClick={() => onSectorChange("all")} className="ml-1 hover:text-foreground">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Limpar todos
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
