import { useState, useMemo, useEffect } from "react";
import { Extension } from "@/types/extension";
import { Search, Filter, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getAllExtensions } from "@/services/extensionsPublic.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ExtensionCard from "@/components/ExtensionsCardPublic";

const ExtensionsPage = () => {
  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  const [setFormDialogOpen] = useState(false);
  const [setDeleteDialogOpen] = useState(false);
  const [setSelectedExtension] = useState<Extension | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🔹 BUSCA DADOS DA API
  useEffect(() => {
    getAllExtensions().then(setExtensions).catch(console.error);
  }, []);

  const sectors = useMemo(() => {
    const uniqueSectors = [...new Set(extensions.map((e) => e.setor))];
    return uniqueSectors.sort();
  }, [extensions]);

  const filteredExtensions = useMemo(() => {
    return extensions.filter((ext) => {
      if (selectedSector !== "all" && ext.setor !== selectedSector) {
        return false;
      }

      if (!searchTerm) return true;

      const searchLower = searchTerm.toLowerCase();
      return (
        (ext.ramal ?? "").toLowerCase().includes(searchLower) ||
        (ext.setor ?? "").toLowerCase().includes(searchLower)
      );
    });
  }, [extensions, searchTerm, selectedSector]);

  //função para lista a quantidade de ramais atovos e inativos
  const stats = useMemo(() => {
    /*
    const active = extensions.filter((e) => e.status === "active").length;
    const inactive = extensions.filter((e) => e.status === "inactive").length;
    return { total: extensions.length, active, inactive };
    */
    return { total: extensions.length };
  }, [extensions]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Ramais
          </h2>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Gerencie todos os ramais telefônicos da empresa.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-card rounded-lg border border-border/50 p-4 flex items-center gap-3">
          <Phone className="w-8 h-8 text-primary" />
          <div>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
        </div>
        {/**
        <div className="bg-gradient-card rounded-lg border border-border/50 p-4">
          <p className="text-2xl font-bold text-emerald-500">{stats.active}</p>
          <p className="text-sm text-muted-foreground">Ativos</p>
        </div>
        <div className="bg-gradient-card rounded-lg border border-border/50 p-4">
          <p className="text-2xl font-bold text-red-500">{stats.inactive}</p>
          <p className="text-sm text-muted-foreground">Inativos</p>
        </div> */}
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar ramais..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50"
          />
        </div>
        <Select value={selectedSector} onValueChange={setSelectedSector}>
          <SelectTrigger className="w-full sm:w-[200px] bg-secondary/50 border-border/50">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Setor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os setores</SelectItem>
            {sectors.map((sector) => (
              <SelectItem key={sector} value={sector}>
                {sector}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredExtensions.map((extension, index) => (
          <ExtensionCard
            key={extension.id}
            extension={extension}
            index={index}
          />
        ))}
      </div>

      {filteredExtensions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
          <p className="text-lg text-muted-foreground">
            Nenhum ramal encontrado
          </p>
        </div>
      )}
    </div>
  );
};

export default ExtensionsPage;
