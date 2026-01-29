import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Printers } from "@/types/printers";
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

interface PrinterFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  printer: Printers | null;
  onSave: (data: Partial<Printers>) => void;
}

const PrinterFormDialog = ({
  open,
  onOpenChange,
  printer,
  onSave,
}: PrinterFormDialogProps) => {
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<Partial<Printers>>();

  useEffect(() => {
    if (printer) {
      reset(printer);
    } else {
      reset({
        id: "",
        model: "",
        connectionType: "",
        sector: "",
        status: "online",
      });
    }
  }, [printer, reset]);

  const onSubmit = (data: Partial<Printers>) => {
    onSave(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {printer ? "Editar Impressora" : "Nova Impressora"}
          </DialogTitle>
          <DialogDescription>
            Preencha os detalhes da impressora abaixo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="model">Modelo</Label>
            <Input
              id="model"
              {...register("model", { required: true })}
              className="bg-secondary/50 border-border/50"
              placeholder="Ex: HP LaserJet Pro"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="connectionType">Tipo de Conexão</Label>
            <Input
              id="connectionType"
              {...register("connectionType", { required: true })}
              className="bg-secondary/50 border-border/50"
              placeholder="Ex: USB, Rede"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sector">Setor</Label>
            <Input
              id="sector"
              {...register("sector", { required: true })}
              className="bg-secondary/50 border-border/50"
              placeholder="Ex: Produção"
            />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={watch("status") || "online"}
              onValueChange={(value) =>
                setValue("status", value as Printers["status"])
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
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">{printer ? "Salvar" : "Criar"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PrinterFormDialog;
