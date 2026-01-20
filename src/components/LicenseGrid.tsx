import { cadLicense } from "@/types/cadLicense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit,Server, Trash2 } from "lucide-react";

interface LicenseGridProps {
  licenses: cadLicense[];
  onEdit: (license: cadLicense) => void;
  onDelete: (license: cadLicense) => void;
}

const LicenseGrid = ({ licenses, onEdit, onDelete }: LicenseGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {licenses.map((license) => (
        <Card key={license.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                {license.versionAntiVirus}
              </CardTitle>
              <Badge variant={license.status === "active" ? "default" : "secondary"}>
                {license.status === "active" ? "Ativo" : "Inativo"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm text-muted-foreground">
              <p><strong>Chave:</strong> {license.keyLisence}</p>
              <p><strong>Início:</strong> {new Date(license.dateStartLisence.split('/').reverse().join('-')).toLocaleDateString()}</p>
              <p><strong>Fim:</strong> {new Date(license.dateEndLisence.split('/').reverse().join('-')).toLocaleDateString()}</p>
              <p><strong>Registro:</strong> {new Date(license.registrationDate.split('/').reverse().join('-')).toLocaleDateString()}</p>
              <div className="flex gap-2 pt-2">
                <Button
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <Server className="w-4 h-4 mr-2" />
                Máquinas
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
