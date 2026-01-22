import { cadLicense } from "@/types/cadLicense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar1,
  CalendarArrowDown,
  CalendarArrowUp,
  Edit,
  FileKey2,
  Server,
  Shield,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LicenseGridProps {
  licenses: cadLicense[];
  onEdit: (license: cadLicense) => void;
  onDelete: (license: cadLicense) => void;
}

const LicenseGrid = ({ licenses, onEdit, onDelete }: LicenseGridProps) => {
  const navigate = useNavigate();

  const handleViewMachines = (licenseId: string) => {
    navigate(`/license/${licenseId}/machines`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {licenses.map((license) => (
        <Card key={license.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-300">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-300">
                       {license.versionAntiVirus}
                    </h3>
                  </div>
                </div>
              </CardTitle>
              <Badge
                variant={license.status === "active" ? "default" : "secondary"}
              >
                {license.status === "active" ? "Ativo" : "Inativo"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center mb-1 gap-3 p-3 rounded-md bg-secondary/50 border border-border/30">
                <FileKey2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Chave</p>
                  <p className="text-sm text-foreground truncate">
                    {license.keyLisence}
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-1 gap-3 p-3 rounded-md bg-secondary/50 border border-border/30">
                <CalendarArrowUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Início</p>
                  <p className="text-sm text-foreground truncate">
                    {new Date(
                      license.dateStartLisence.split("/").reverse().join("-"),
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-1 gap-3 p-3 rounded-md bg-secondary/50 border border-border/30">
                <CalendarArrowDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Fim</p>
                  <p className="text-sm text-foreground truncate">
                    {new Date(
                      license.dateEndLisence.split("/").reverse().join("-"),
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center mb-1 gap-3 p-3 rounded-md bg-secondary/50 border border-border/30">
                <Calendar1 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Registro</p>
                  <p className="text-sm text-foreground truncate">
                    {new Date(
                      license.registrationDate.split("/").reverse().join("-"),
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleViewMachines(license.id)}
                >
                  <Server className="w-4 h-4 mr-2" />
                  Máquinas Por Licença
                </Button>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(license)}
                className="flex-1"
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(license)}
                className="flex-1 text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LicenseGrid;
