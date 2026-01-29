import { useState, useMemo, useEffect } from "react";
import { Printers } from "@/types/printers";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  getAllPrinters,
  updatePrinters,
  savePrinters,
  deletePrinters,
} from "@/services/printers.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PrinterFormDialog from "@/components/PrinterFormDialog";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import PrinterStatsBar from "@/components/PrinterStatsBar";
import { useToast } from "@/hooks/use-toast";
import PrinterCard from "@/components/PrinterCard";
import PrinterGrid from "@/components/PrinterGrid";
import MainLayout from "@/components/MainLayout";

const PrintersPage = () => {
  const { toast } = useToast();
  const [printers, setPrinters] = useState<Printers[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState<Printers | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPrinters = async () => {
    setIsLoading(true);
    try {
      const data = await getAllPrinters();
      setPrinters(data);
    } catch (error) {
      console.error("Erro ao buscar impressoras:", error);
      toast({
        title: "Erro",
        description: "Falha ao carregar as impressoras.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrinters();
  }, []);

  const sectors = useMemo(() => {
    const uniqueSectors = [...new Set(printers.map((p) => p.sector))];
    return uniqueSectors.sort();
  }, [printers]);

  const filteredPrinters = useMemo(() => {
    return printers.filter((printer) => {
      if (statusFilter && printer.status !== statusFilter) {
        return false;
      }
      if (selectedSector !== "all" && printer.sector !== selectedSector) {
        return false;
      }
      if (!searchTerm) return true;

      const searchLower = searchTerm.toLowerCase();
      return (
        printer.model.toLowerCase().includes(searchLower) ||
        printer.sector.toLowerCase().includes(searchLower) ||
        printer.connectionType.toLowerCase().includes(searchLower)
      );
    });
  }, [printers, searchTerm, selectedSector, statusFilter]);

  const stats = useMemo(() => {
    const online = printers.filter((p) => p.status === "online").length;
    const offline = printers.filter((p) => p.status === "offline").length;
    const maintenance = printers.filter(
      (p) => p.status === "maintenance",
    ).length;
    return { total: printers.length, online, offline, maintenance };
  }, [printers]);

  const handleStatusClick = (status: string | null) => {
    setStatusFilter((prev) => (prev === status ? null : status));
  };

  const handleCreate = () => {
    setSelectedPrinter(null);
    setFormDialogOpen(true);
  };

  const handleEdit = (printer: Printers) => {
    setSelectedPrinter(printer);
    setFormDialogOpen(true);
  };

  const handleDelete = (printer: Printers) => {
    setSelectedPrinter(printer);
    setDeleteDialogOpen(true);
  };

  const handleSave = async (data: Partial<Printers>) => {
    setIsLoading(true);
    try {
      if (selectedPrinter) {
        const updatedPrinter = await updatePrinters(selectedPrinter.id, data);
        setPrinters((prev) =>
          prev.map((p) => (p.id === updatedPrinter.id ? updatedPrinter : p)),
        );
        toast({
          title: "Sucesso",
          description: "Impressora atualizada com sucesso!",
        });
      } else {
        const newPrinter = await savePrinters(data);
        setPrinters((prev) => [...prev, newPrinter]);
        toast({
          title: "Sucesso",
          description: "Impressora criada com sucesso!",
        });
      }
      await fetchPrinters();
    } catch (error) {
      const message =
        error.response?.data?.error || "Erro desconhecido ao salvar.";
      toast({
        title: "Erro",
        description: message,
      });
    } finally {
      setIsLoading(false);
      setFormDialogOpen(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedPrinter) {
      try {
        await deletePrinters(selectedPrinter.id);
        setPrinters((prev) => prev.filter((p) => p.id !== selectedPrinter.id));
        toast({
          title: "Sucesso",
          description: "Impressora deletada com sucesso!",
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Erro ao deletar a impressora.",
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
            Impressoras
          </h2>
          <Button onClick={handleCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            Nova Impressora
          </Button>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Gerencie todas as impressoras da sua infraestrutura.
        </p>
      </div>

      <PrinterStatsBar
        printers={printers}
        filteredCount={filteredPrinters.length}
        onStatusClick={handleStatusClick}
        activeStatus={statusFilter}
      />

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar impressoras..."
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

      <PrinterGrid
        printers={filteredPrinters}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PrinterFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        printer={selectedPrinter}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Excluir Impressora"
        description={`Tem certeza que deseja excluir a impressora "${selectedPrinter?.model}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default PrintersPage;
