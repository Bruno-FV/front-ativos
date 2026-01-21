
export interface Machine {
    id: string;
    hostName: string;
    ip: string;
    sistemaOperacional: string | null;
    setor: string;
    processador: string;
    memoria: string;
    armazenamento: string;
    tipoArmazenamento: string;
    licensaOffice: string;
    antVirusLicense: cadLicense;
    status: string;
}

export interface cadLicense {
    id: string;
    keyLisence: string;
    dateStartLisence: string;
    dateEndLisence: string;
    registrationDate: string;
    versionAntiVirus: string;
    status?: 'active' | 'inactive';
    machine?: Machine[];
}
