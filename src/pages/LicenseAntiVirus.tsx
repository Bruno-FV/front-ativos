import { useState, useMemo, useEffect } from "react";
import LicenseSearchBar from "@/components/LicenseSearchBar";
import LicenseGrid from "@/components/LicenseGrid";
import LicenseStatsBar from "@/components/LicenseStatsBar";
import { cadLicense } from "@/types/cadLicense";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import LicenseFormDialog from "@/components/LicenseFormDialog";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import {
  getAllLicenses,
  saveLicense,
  updateLicense,
  deleteLicense,
} from "@/services/license.service";
import { useToast } from "@/hooks/use-toast";

const LicenseAntiVirus = () => {
  const { toast } = useToast();
  const [licenses, setLicenses] = useState<cadLicense[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // NOVO ESTADO → controla o filtro por status (active/expired)
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<cadLicense | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 🔹 BUSCA DADOS DA API
  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        setIsLoading(true);
        const data = await getAllLicenses();
        setLicenses(data);
      } catch (error) {
        console.error("Erro ao buscar licenças:", error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Falha ao carregar licenças",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLicenses();
  }, [toast]);

  const filteredLicenses = useMemo(() => {
    return licenses.filter((license) => {
      // 👉 filtro por status (NOVO)
      if (statusFilter === "expired" && new Date(license.dateEndLisence) >= new Date()) {
        return false;
      }
      if (statusFilter === "active" && license.status !== "active") {
        return false;
      }

      if (!searchTerm) return true;

      const searchLower = searchTerm.toLowerCase();

      switch (filterType) {
        case "version":
          return (license.versionAntiVirus ?? "")
            .toString()
            .toLowerCase()
            .includes(searchLower);
        case "key":
          return (license.keyLisence ?? "")
            .toString()
            .toLowerCase()
            .includes(searchLower);

        default:
          return (
            (license.versionAntiVirus ?? "")
              .toString()
              .toLowerCase()
              .includes(searchLower) ||
            (license.keyLisence ?? "")
              .toString()
              .toLowerCase()
              .includes(searchLower)
          );
      }
    });
  }, [licenses, statusFilter, searchTerm, filterType]);

  // CALLBACK → recebido da LicenseStatsBar ao clicar em um card
  const handleStatusClick = (status: string | null) => {
    // alterna o filtro (clicar de novo remove)
    setStatusFilter((prev) => (prev === status ? null : status));
  };

  const handleCreate = () => {
    setSelectedLicense(null);
    setFormDialogOpen(true);
  };

  const handleEdit = (license: cadLicense) => {
    setSelectedLicense(license);
    setFormDialogOpen(true);
  };

  const handleDelete = (license: cadLicense) => {
    setSelectedLicense(license);
    setDeleteDialogOpen(true);
  };

  // INTEGRAÇÃO COM API - CRUD
  const handleSave = async (data: Partial<cadLicense>) => {
    try {
      // função reload /all
      const refreshLicenses = async () => {
        try {
          setIsLoading(true);
          const data = await getAllLicenses();
          setLicenses(data);
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
      if (selectedLicense) {
        // UPDATE
        const updated = await updateLicense(selectedLicense.id, data);
        setLicenses((prev) =>
          prev.map((l) => (l.id === updated.id ? updated : l))
        );
        toast({
          title: "Sucesso",
          description: "Licença atualizada com sucesso!",
        });
      } else {
        try {
          // CREATE
          const newLicense = await saveLicense(data);
          toast({
            title: "Sucesso",
            description: "Licença criada com sucesso!",
          });
        } catch (error) {
          console.error("Erro ao salvar licença:", error);
          const message = error.response?.data?.error || "Erro desconhecido";
          toast({
            title: "Erro",
            description: message,
          });
        }
      }
      await refreshLicenses();
      setFormDialogOpen(false);
      setSelectedLicense(null);
    } catch (error) {
      console.error("Erro ao salvar licença:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha ao salvar licença. Tente novamente.",
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedLicense) return;

    try {
      setIsLoading(true);
      await deleteLicense(selectedLicense.id);
      setLicenses((prev) => prev.filter((l) => l.id !== selectedLicense.id));
      toast({
        title: "Sucesso",
        description: "Licença excluída com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao excluir licença:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha ao excluir licença",
      });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedLicense(null);
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Licenças de Anti-Vírus
          </h2>
          <Button onClick={handleCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            Nova Licença
          </Button>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Gerencie e monitore todas as licenças de anti-vírus da sua infraestrutura em um só lugar.
        </p>
      </div>

      <div className="mb-6">
        <LicenseStatsBar
          licenses={licenses}
          filteredCount={filteredLicenses.length}
          onStatusClick={handleStatusClick} // ← NOVO
          activeStatus={statusFilter}
        />
      </div>

      <div className="mb-8">
        <LicenseSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterType={filterType}
          onFilterTypeChange={setFilterType}
        />
      </div>

      <LicenseGrid
        licenses={filteredLicenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <LicenseFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        license={selectedLicense}
        onSave={handleSave}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Excluir Licença"
        description={`Tem certeza que deseja excluir a licença "${selectedLicense?.versionAntiVirus}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default LicenseAntiVirus;
