import { useState, useMemo, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import MachineGrid from "@/components/MachineGrid";
import StatsBar from "@/components/StatsBar";
import { Machine } from "@/types/machine";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MachineFormDialog from "@/components/MachineFormDialog";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { getAllMachines, saveMachine, updateMachine, deleteMachine } from "@/services/machines.service";
import { useToast } from "@/hooks/use-toast";
import { create } from "domain";


const MachinesPage = () => { 
  const { toast } = useToast();
  const [machines, setMachines] = useState<Machine[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedSector, setSelectedSector] = useState("all");
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
    if (selectedSector !== "all" && machine.setor !== selectedSector) {
      return false;
    }

    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();

    switch (filterType) {
      case "name":
        return (machine.hostName ?? "").toString().toLowerCase().includes(searchLower);
      case "ip":
        return (machine.ip ?? "").toString().toLowerCase().includes(searchLower);
      case "sector":
        return (machine.setor ?? "").toString().toLowerCase().includes(searchLower);
      case "typeArmazenamento":
        return (machine.tipoArmazenamento ?? "").toString().toLowerCase().includes(searchLower);
      case "processor":
        return (machine.processador ?? "").toString().toLowerCase().includes(searchLower);
      case "offline":
        return machine.status === "offline";
      case "online":
        return machine.status === "online";
      case "maintenance":
        return machine.status === "maintenance";
      default:
        return (
          (machine.hostName ?? "").toString().toLowerCase().includes(searchLower) ||
          (machine.ip ?? "").toString().toLowerCase().includes(searchLower) ||
          (machine.setor ?? "").toString().toLowerCase().includes(searchLower) ||
          (machine.tipoArmazenamento ?? "").toString().toLowerCase().includes(searchLower) ||
          (machine.status === "offline") ||
          (machine.status === "online") ||
          (machine.status === "maintenance") ||
          (machine.processador ?? "").toString().toLowerCase().includes(searchLower)
        );
    }
  });
}, [machines, searchTerm, filterType, selectedSector]);


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
        toast({ variant: "destructive", title: "Erro", description: "Falha ao recarregar lista" });
      } finally {
        setIsLoading(false);
      }
    };
      setIsLoading(true);
      if (selectedMachine) {
        // UPDATE
        const updated = await updateMachine(selectedMachine.id, data);
        setMachines((prev) =>
          prev.map((m) =>
            (m.id === updated.id ? updated : m)
          )
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

  const errorMessage =
    error.response?.status === 409
      ? error.response?.data?.error || "Já existe uma máquina com esse IP."
      : error.response?.data?.message || "Falha ao salvar máquina. Tente novamente.";
      toast({
    variant: "destructive",
    title: error.response?.status === 409 ? "IP já cadastrado" : "Erro",
    description: errorMessage,
    });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedMachine) return;

    try {
      setIsLoading(true);
      await deleteMachine(selectedMachine.id);
      setMachines((prev) =>
        prev.filter((m) => m.id !== selectedMachine.id)
      );
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
          Gerencie e monitore todas as máquinas da sua infraestrutura em um só lugar.
        </p>
      </div>

      <div className="mb-6">
        <StatsBar machines={machines} filteredCount={filteredMachines.length} />
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
