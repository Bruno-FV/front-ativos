import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Router } from "@/types/router";
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

interface RouterFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  router: Router | null;
  onSave: (data: Partial<Router>) => void;
}

const RouterFormDialog = ({
  open,
  onOpenChange,
  router,
  onSave,
}: RouterFormDialogProps) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm<Partial<Router>>();

  useEffect(() => {
    if (router) {
      reset(router);
    } else {
      reset({
        ssid: "",
        ip: "",
        porta: "",
        senhaRedeWifi: "",
        setor: "",
        senhaConfiguracao: "",
        loginConfiguracao: "",
        status: "online",
      });
    }
  }, [router, reset]);

  const onSubmit = (data: Partial<Router>) => {
    onSave(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {router ? "Editar Roteador" : "Novo Roteador"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ip">Endereço IP</Label>
            <Input
              id="ip"
              {...register("ip", { required: true })}
              className="bg-secondary/50 border-border/50"
              placeholder="Ex: 192.168.1.1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="port">Porta</Label>
            <Input
              id="port"
              {...register("porta", { required: true })}
              className="bg-secondary/50 border-border/50"
              placeholder="Ex: 192.168.1.1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="networkName">Nome da Rede (SSID)</Label>
            <Input
              id="networkName"
              {...register("ssid", { required: true })}
              className="bg-secondary/50 border-border/50"
              placeholder="Ex: PROD-WIFI"
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
            <Label htmlFor="wifiPassword">Senha do WiFi</Label>
            <Input
              id="wifiPassword"
              type="password"
              {...register("senhaRedeWifi", { required: true })}
              className="bg-secondary/50 border-border/50"
              placeholder="Senha da rede WiFi"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="configLogin">Login de Configuração</Label>
              <Input
                id="configLogin"
                {...register("loginConfiguracao", { required: true })}
                className="bg-secondary/50 border-border/50"
                placeholder="Ex: admin"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="configPassword">Senha de Configuração</Label>
              <Input
                id="configPassword"
                type="password"
                {...register("senhaConfiguracao", { required: true })}
                className="bg-secondary/50 border-border/50"
                placeholder="Senha"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={watch("status") || "online"}
              onValueChange={(value) => setValue("status", value as Router["status"])}
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
            <Button type="submit">
              {router ? "Salvar" : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RouterFormDialog;
