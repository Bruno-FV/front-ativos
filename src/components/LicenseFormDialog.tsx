import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { cadLicense } from "@/types/cadLicense";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LicenseFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  license: cadLicense | null;
  onSave: (data: Partial<cadLicense>) => void;
}

const LicenseFormDialog = ({
  open,
  onOpenChange,
  license,
  onSave,
}: LicenseFormDialogProps) => {
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<Partial<cadLicense>>();

  useEffect(() => {
    if (license) {
      reset(license);
    } else {
      reset({
        id: "",
        keyLisence: "",
        dateStartLisence: new Date().toISOString().split('T')[0],
        dateEndLisence: new Date().toISOString().split('T')[0],
        registrationDate: new Date().toISOString().split('T')[0],
        versionAntiVirus: "",
        status: "active",
      });
    }
  }, [license, reset]);

  const onSubmit = (data: Partial<cadLicense>) => {
    onSave(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {license ? "Editar Licença" : "Nova Licença"}
            <DialogDescription>
              Preencha os detalhes da licença abaixo.
            </DialogDescription>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="version">Versão do Anti-Vírus</Label>
            <Input
              id="version"
              {...register("versionAntiVirus", { required: true })}
              className="bg-secondary/50 border-border/50"
              placeholder="Ex: Norton 360"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="key">Chave da Licença</Label>
            <Input
              id="key"
              {...register("keyLisence", { required: true })}
              className="bg-secondary/50 border-border/50"
              placeholder="Ex: XXXX-XXXX-XXXX-XXXX"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Data de Início</Label>
              <Input
                id="startDate"
                type="date"
                {...register("dateStartLisence", { required: true })}
                className="bg-secondary/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Data de Fim</Label>
              <Input
                id="endDate"
                type="date"
                {...register("dateEndLisence", { required: true })}
                className="bg-secondary/50 border-border/50"
              />
            </div>
          </div>
           <div className="space-y-2">
            <Label htmlFor="registrationDate">Data do Registro</Label>
            <Input
              id="registrationDate"
              {...register("registrationDate", { required: true })}
              className="bg-secondary/50 border-border/50"
              placeholder="Ex: XX/XX/XXXX"
            />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={watch("status") || "active"}
              onValueChange={(value) =>
                setValue("status", value as cadLicense["status"])
              }
            >
              <SelectTrigger className="bg-secondary/50 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">{license ? "Salvar" : "Criar"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LicenseFormDialog;
