import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LicenseSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterType: string;
  onFilterTypeChange: (value: string) => void;
}

const LicenseSearchBar = ({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterTypeChange,
}: LicenseSearchBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar licenças..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <Select value={filterType} onValueChange={onFilterTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="version">Versão</SelectItem>
            <SelectItem value="key">Chave</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LicenseSearchBar;
