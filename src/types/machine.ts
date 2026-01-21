export interface Machine {
  id: string;
  hostName: string;
  ip: string;
  sistemaOperacional: string;
  setor: string;
  processador: string;
  memoria: string;
  armazenamento: string;
  tipoArmazenamento: string;
  antVirus: string;
  licensaOffice: string;
  status?: 'online' | 'offline' | 'maintenance';
}
