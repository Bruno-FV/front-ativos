import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cadLicense } from "@/types/cadLicense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Server, Network, Building2 } from "lucide-react";
import { getLicenseWithMachines } from "@/services/license.service";
import { useToast } from "@/hooks/use-toast";

const LicenseMachinesPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [license, setLicense] = useState<cadLicense | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLicense = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const data = await getLicenseWithMachines(id);
        setLicense(data);
      } catch (error) {
        console.error("Erro ao buscar licença com máquinas:", error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Falha ao carregar dados da licença",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLicense();
  }, [id, toast]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!license) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Licença não encontrada</h2>
          <Button onClick={() => navigate("/license")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Licenças
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Máquinas da Licença
          </h2>
          <Button onClick={() => navigate("/license")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Licenças
          </Button>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Licença: {license.versionAntiVirus} - {license.keyLisence}
        </p>
        <div className="mt-4">
          <Badge
            variant={license.status === "active" ? "default" : "secondary"}
          >
            {license.status === "active" ? "Ativo" : "Inativo"}
          </Badge>
        </div>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              Máquinas Vinculadas {license.machine?.length || 0}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {license.machine && license.machine.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {license.machine.map((machine) => (
                  <Card
                    key={machine.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                            <Server className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-300">
                              {machine.hostName}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Network className="w-3 h-3 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground font-mono">
                                {machine.ip}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 mb-4">
                        <Building2 className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">
                          {machine.setor}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Nenhuma máquina vinculada a esta licença.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LicenseMachinesPage;
