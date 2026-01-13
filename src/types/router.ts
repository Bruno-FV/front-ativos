export interface Router {
  id: string;
  ip: string;
  porta: string
  setor: string;
  ssid: string;
  senhaRedeWifi: string;
  loginConfiguracao: string;
  senhaConfiguracao: string;
  status?: 'online' | 'offline' | 'maintenance';
}
