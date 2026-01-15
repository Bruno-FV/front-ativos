import { useState, useMemo, useEffect } from "react";
import { Router } from "@/types/router";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  getAllRouters,
  updateRouter,
  saveRouter,
  deleteRouter,
} from "@/services/routers.services";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RouterCard from "@/components/RouterCard";
import RouterFormDialog from "@/components/RouterFormDialog";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import RouterStatsBar from "@/components/RouterStatsBar";
import { useToast } from "@/hooks/use-toast";

const RoutersPage = () => {
  const { toast } = useToast();
  const [routers, setRouters] = useState<Router[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  // 🔹 NOVO ESTADO → controla o filtro por status (online/offline/maintenance)
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRouter, setSelectedRouter] = useState<Router | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  //buscar dados da api
  useEffect(() => {
    getAllRouters().then(setRouters).catch(console.error);
  }, []);

  const sectors = useMemo(() => {
    const uniqueSectors = [...new Set(routers.map((r) => r.setor))];
    return uniqueSectors.sort();
  }, [routers]);

  const filteredRouters = useMemo(() => {
    return routers.filter((router) => {
      // 👉 filtro por status (NOVO)
      if (statusFilter && router.status !== statusFilter) {
        return false;
      }
      if (selectedSector !== "all" && router.setor !== selectedSector) {
        return false;
      }

      if (!searchTerm) return true;

      const searchLower = searchTerm.toLowerCase();
      return (
        (router.ssid ?? "").toLowerCase().includes(searchLower) ||
        (router.ip ?? "").toLowerCase().includes(searchLower) ||
        (router.senhaRedeWifi ?? "").toLowerCase().includes(searchLower) ||
        (router.setor ?? "").toLowerCase().includes(searchLower)
      );
    });
  }, [routers, searchTerm, selectedSector, statusFilter]);

  // 🔹 CALLBACK → recebido da StatsBar ao clicar em um card
  const handleStatusClick = (status: string | null) => {
    // alterna o filtro (clicar de novo remove)
    setStatusFilter((prev) => (prev === status ? null : status));
  };

  const stats = useMemo(() => {
    const online = routers.filter((r) => r.status === "online").length;
    const offline = routers.filter((r) => r.status === "offline").length;
    const maintenance = routers.filter(
      (r) => r.status === "maintenance"
    ).length;
    return { total: routers.length, online, offline, maintenance };
  }, [routers]);

  const handleCreate = () => {
    setSelectedRouter(null);
    setFormDialogOpen(true);
  };

  const handleEdit = (router: Router) => {
    setSelectedRouter(router);
    setFormDialogOpen(true);
  };

  const handleDelete = (router: Router) => {
    setSelectedRouter(router);
    setDeleteDialogOpen(true);
  };

  const handleSave = async (data: Partial<Router>) => {
    try {
      // função reutilizável
      const refreshRouters = async () => {
        const data = await getAllRouters();
        console.log("Dados atualizados:", data);
        setRouters(data);
      };
      setIsLoading(true);
      if (selectedRouter) {
        //update
        const updateRouters = await updateRouter(selectedRouter.id, data);

        setRouters((prev) =>
          prev.map((r) => (r.id === updateRouters.id ? updateRouters : r))
        );
        toast({
          title: "Sucesso",
          description: "Máquina criada com sucesso!",
        });
      } else {
        //create
        try {
          const newRouter = await saveRouter(data);
          toast({
            title: "Sucesso",
            description: "Máquina criada com sucesso!",
          });
        } catch (error) {
          console.error("Erro ao salvar máquina:", error);
          const message = error.response?.data?.error || "Erro desconhecido";
          toast({
            title: "Erro",
            description: message,
          });
        }
      }
      await refreshRouters();
    } catch (error) {
      console.error("Erro ao salvar roteador:", error);
    }
    setFormDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedRouter) {
      try {
        await deleteRouter(selectedRouter.id);
        setRouters((prev) => prev.filter((r) => r.id !== selectedRouter.id));
        toast({
          title: "Sucesso",
          description: "Roteador deletado com sucesso!",
        });
      } catch (error) {
        console.error("Erro ao deletar roteador:", error);
        toast({
          title: "Erro",
          description: "Erro ao deletar roteador",
        });
      }
    }
    setDeleteDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Roteadores
          </h2>
          <Button onClick={handleCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            Novo Roteador
          </Button>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Gerencie todos os roteadores e redes da sua infraestrutura.
        </p>
      </div>
      {/* Stats */}
      <RouterStatsBar
        routers={routers}
        filteredCount={filteredRouters.length}
        onStatusClick={handleStatusClick}
        activeStatus={statusFilter}
      />

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar roteadores..."
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRouters.map((router, index) => (
          <RouterCard
            key={router.id}
            router={router}
            index={index}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredRouters.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
          <p className="text-lg text-muted-foreground">
            Nenhum roteador encontrado
          </p>
        </div>
      )}

      <RouterFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        router={selectedRouter}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Excluir Roteador"
        description={`Tem certeza que deseja excluir o roteador "${selectedRouter?.ssid}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default RoutersPage;
