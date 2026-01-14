import { useState, useMemo, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import MachineGrid from "@/components/MachineGrid";
import StatsBar from "@/components/StatsBar";
import { Machine } from "@/types/machine";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MachineFormDialog from "@/components/MachineFormDialog";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import {
  getAllMachines,
  saveMachine,
  updateMachine,
  deleteMachine,
} from "@/services/machines.service";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";


const MachinesPage = () => {
  const { toast } = useToast();
  const [machines, setMachines] = useState<Machine[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedSector, setSelectedSector] = useState("all");

  // 🔹 NOVO ESTADO → controla o filtro por status (online/offline/maintenance)
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🔹 BUSCA DADOS DA API
  useEffect(() => {
    const fetchMachines = async () => {
      try {
        setIsLoading(true);
        const data = await getAllMachines();
        setMachines(data);
      } catch (error) {
        console.error("Erro ao buscar máquinas:", error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Falha ao carregar máquinas",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMachines();
  }, [toast]);

  const sectors = useMemo(() => {
    const uniqueSectors = [...new Set(machines.map((m) => m.setor))];
    return uniqueSectors.sort();
  }, [machines]);

  const filteredMachines = useMemo(() => {
    return machines.filter((machine) => {
      // 👉 filtro por status (NOVO)
      if (statusFilter && machine.status !== statusFilter) {
        return false;
      }
      if (selectedSector !== "all" && machine.setor !== selectedSector) {
        return false;
      }

      if (!searchTerm) return true;

      const searchLower = searchTerm.toLowerCase();

      switch (filterType) {
        case "name":
          return (machine.hostName ?? "")
            .toString()
            .toLowerCase()
            .includes(searchLower);
        case "ip":
          return (machine.ip ?? "")
            .toString()
            .toLowerCase()
            .includes(searchLower);
        case "sector":
          return (machine.setor ?? "")
            .toString()
            .toLowerCase()
            .includes(searchLower);
        case "typeArmazenamento":
          return (machine.tipoArmazenamento ?? "")
            .toString()
            .toLowerCase()
            .includes(searchLower);
        case "processor":
          return (machine.processador ?? "")
            .toString()
            .toLowerCase()
            .includes(searchLower);

        default:
          return (
            (machine.hostName ?? "")
              .toString()
              .toLowerCase()
              .includes(searchLower) ||
            (machine.ip ?? "").toString().toLowerCase().includes(searchLower) ||
            (machine.setor ?? "")
              .toString()
              .toLowerCase()
              .includes(searchLower) ||
            (machine.tipoArmazenamento ?? "")
              .toString()
              .toLowerCase()
              .includes(searchLower) ||
            (machine.processador ?? "")
              .toString()
              .toLowerCase()
              .includes(searchLower)
          );
      }
    });
  }, [machines, statusFilter, selectedSector, searchTerm, filterType]);

  // 🔹 CALLBACK → recebido da StatsBar ao clicar em um card
  const handleStatusClick = (status: string | null) => {
    // alterna o filtro (clicar de novo remove)
    setStatusFilter((prev) => (prev === status ? null : status));
  };
  const handleCreate = () => {
    setSelectedMachine(null);
    setFormDialogOpen(true);
  };

  const handleEdit = (machine: Machine) => {
    setSelectedMachine(machine);
    setFormDialogOpen(true);
  };

  const handleDelete = (machine: Machine) => {
    setSelectedMachine(machine);
    setDeleteDialogOpen(true);
  };

  // 🔹 INTEGRAÇÃO COM API - CRUD
  const handleSave = async (data: Partial<Machine>) => {
    try {
      // função reutilizável
      const refreshMachines = async () => {
        try {
          setIsLoading(true);
          const data = await getAllMachines();
          setMachines(data);
        } catch (error) {
          console.error(error);
          toast({
            variant: "destructive",
            title: "Erro",
            description: "Falha ao recarregar lista",
          });
        } finally {
          setIsLoading(false);
        }
      };
      setIsLoading(true);
      if (selectedMachine) {
        // UPDATE
        const updated = await updateMachine(selectedMachine.id, data);
        setMachines((prev) =>
          prev.map((m) => (m.id === updated.id ? updated : m))
        );
        toast({
          title: "Sucesso",
          description: "Máquina atualizada com sucesso!",
        });
      } else {  
        // CREATE
        const newMachine = await saveMachine(data);
        toast({
          title: "Sucesso",
          description: "Máquina criada com sucesso!",
        });
      }
      await refreshMachines();
      setFormDialogOpen(false);
      setSelectedMachine(null);
    } catch (error) {
      console.error("Erro ao salvar máquina:", error);

      let errorMessage = "Falha ao salvar máquina. Tente novamente.";
      let title = "Erro";

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          title = "IP já cadastrado";
          errorMessage =
            error.response.data?.error || "Já existe uma máquina com esse IP.";
        } else {
          errorMessage = error.response.data?.message || errorMessage;
        }
      }
      toast({
        variant: "destructive",
        title,
        description: errorMessage,
      });
    }  
  };

  const handleConfirmDelete = async () => {
    if (!selectedMachine) return;

    try {
      setIsLoading(true);
      await deleteMachine(selectedMachine.id);
      setMachines((prev) => prev.filter((m) => m.id !== selectedMachine.id));
      toast({
        title: "Sucesso",
        description: "Máquina excluída com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao excluir máquina:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha ao excluir máquina",
      });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedMachine(null);
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Inventário de Máquinas
          </h2>
          <Button onClick={handleCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            Nova Máquina
          </Button>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Gerencie e monitore todas as máquinas da sua infraestrutura em um só
          lugar.
        </p>
      </div>

      <div className="mb-6">
        <StatsBar
          machines={machines}
          filteredCount={filteredMachines.length}
          onStatusClick={handleStatusClick} // ← NOVO
          activeStatus={statusFilter}
        />
      </div>

      <div className="mb-8">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterType={filterType}
          onFilterTypeChange={setFilterType}
          sectors={sectors}
          selectedSector={selectedSector}
          onSectorChange={setSelectedSector}
        />
      </div>

      <MachineGrid
        machines={filteredMachines}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <MachineFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        machine={selectedMachine}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Excluir Máquina"
        description={`Tem certeza que deseja excluir a máquina "${selectedMachine?.hostName}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default MachinesPage;
