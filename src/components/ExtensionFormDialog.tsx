import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Extension } from "@/types/extension";
import {
  Dialog,
  DialogContent,
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

interface ExtensionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  extension: Extension | null;
  onSave: (data: Partial<Extension>) => void;
}

const ExtensionFormDialog = ({
  open,
  onOpenChange,
  extension,
  onSave,
}: ExtensionFormDialogProps) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm<Partial<Extension>>();

  useEffect(() => {
    if (extension) {
      reset(extension);
    } else {
      reset({
        ramal: "",
        setor: "",
        status: "active",
      });
    }
  }, [extension, reset]);

  const onSubmit = (data: Partial<Extension>) => {
    onSave(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {extension ? "Editar Ramal" : "Novo Ramal"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="number">Número do Ramal</Label>
            <Input
              id="number"
              {...register("ramal", { required: true })}
              className="bg-secondary/50 border-border/50"
              placeholder="Ex: 1001"
            />
          </div>
         {/* <div className="space-y-2">
            <Label htmlFor="name">Nome / Descrição</Label>
            <Input
              id="name"
              {...register("name", { required: true })}
              className="bg-secondary/50 border-border/50"
              placeholder="Ex: João Silva"
            />
          </div>*/}
          <div className="space-y-2">
            <Label htmlFor="sector">Setor</Label>
            <Input
              id="sector"
              {...register("setor", { required: true })}
              className="bg-secondary/50 border-border/50"
              placeholder="Ex: Desenvolvimento"
            />
          </div>
          {/*
          <div className="space-y-2">
            <Label htmlFor="location">Localização</Label>
            <Input
              id="location"
              {...register("location", { required: true })}
              className="bg-secondary/50 border-border/50"
              placeholder="Ex: 2º Andar - Sala 201"
            />
          </div>  */}
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={watch("status") || "active"}
              onValueChange={(value) => setValue("status", value as Extension["status"])}
            >
              <SelectTrigger className="bg-secondary/50 border-border/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
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
            <Button type="submit">
              {extension ? "Salvar" : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExtensionFormDialog;
