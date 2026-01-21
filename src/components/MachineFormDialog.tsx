import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Machine } from "@/types/machine";
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

interface MachineFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  machine: Machine | null;
  onSave: (data: Partial<Machine>) => void;
}

const MachineFormDialog = ({
  open,
  onOpenChange,
  machine,
  onSave,
}: MachineFormDialogProps) => {
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<Partial<Machine>>();

  useEffect(() => {
    if (machine) {
      reset(machine);
    } else {
      reset({
        id: "",
        hostName: "",
        ip: "",
        setor: "",
        processador: "",
        memoria: "",
        armazenamento: "",
        tipoArmazenamento: "",
        status: "online",
      });
    }
  }, [machine, reset]);

  const onSubmit = (data: Partial<Machine>) => {
    onSave(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {machine ? "Editar Máquina" : "Nova Máquina"}
            <DialogDescription>
              Preencha os detalhes da máquina abaixo.
            </DialogDescription>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              {...register("hostName", { required: true })}
              className="bg-secondary/50 border-border/50"
              placeholder="Ex: SRV-PROD-01"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ip">Endereço IP</Label>
            <Input
              id="ip"
              {...register("ip", { required: true })}
              className="bg-secondary/50 border-border/50"
              placeholder="Ex: 192.168.1.10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sector">Setor</Label>
            <Input
              id="sector"
              {...register("setor", { required: true })}
              className="bg-secondary/50 border-border/50"
              placeholder="Ex: Produção"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="processor">Processador</Label>
            <Input
              id="processor"
              {...register("processador", { required: true })}
              className="bg-secondary/50 border-border/50"
              placeholder="Ex: Intel Xeon E5-2680"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="memory">Memória</Label>
              <Input
                id="memory"
                {...register("memoria", { required: true })}
                className="bg-secondary/50 border-border/50"
                placeholder="Ex: 64 GB DDR4"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storage">Armazenamento</Label>
              <Input
                id="storage"
                {...register("armazenamento", { required: true })}
                className="bg-secondary/50 border-border/50"
                placeholder="Ex: 2 TB"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="storageType">Tipo de Armazenamento</Label>
              <Input
                id="storageType"
                {...register("tipoArmazenamento", { required: true })}
                className="bg-secondary/50 border-border/50"
                placeholder="Ex: NVMe SSD"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storageType">Pacote Office</Label>
              <Input
                id="storageType"
                {...register("licensaOffice", { required: true })}
                className="bg-secondary/50 border-border/50"
                placeholder="Ex: Ativo/Inativo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storageType">Anti-Vírus</Label>
              <Input
                id="storageType"
                {...register("antVirus", { required: true })}
                className="bg-secondary/50 border-border/50"
                placeholder="Ex: Ativo/Inativo"
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={watch("status") || "online"}
                onValueChange={(value) =>
                  setValue("status", value as Machine["status"])
                }
              >
                <SelectTrigger className="bg-secondary/50 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="maintenance">Manutenção</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">{machine ? "Salvar" : "Criar"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MachineFormDialog;
