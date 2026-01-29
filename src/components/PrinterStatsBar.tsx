import { Printers } from "@/types/printers";
import { Printer, CheckCircle, XCircle, Wrench } from "lucide-react";

interface PrinterStatsBarProps {
  printers: Printers[];
  filteredCount: number;
  onStatusClick: (status: string | null) => void;
  activeStatus: string | null;
}

const PrinterStatsBar = ({
  printers,
  filteredCount,
  onStatusClick,
  activeStatus,
}: PrinterStatsBarProps) => {
  const stats = {
    total: printers.length,
    online: printers.filter((p) => p.status === "online").length,
    offline: printers.filter((p) => p.status === "offline").length,
    maintenance: printers.filter((p) => p.status === "maintenance").length,
  };

  const statItems = [
    {
      label: "Total",
      value: stats.total,
      icon: Printer,
      color: "text-foreground",
      bg: "bg-secondary",
      status: null,
    },
    {
      label: "Online",
      value: stats.online,
      icon: CheckCircle,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      status: "online",
    },
    {
      label: "Offline",
      value: stats.offline,
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-500/10",
      status: "offline",
    },
    {
      label: "Manutenção",
      value: stats.maintenance,
      icon: Wrench,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      status: "maintenance",
    },
  ];

  return (
    <div className="flex flex-col gap-4 mb-6 animate-fade-in">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statItems.map((stat) => {
          const isActive = activeStatus === stat.status;

          return (
            <div
              key={stat.label}
              onClick={() => onStatusClick(stat.status)}
              className={`
                flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition
                ${stat.bg}
                ${isActive ? "border-primary bg-primary/10" : "border-border"}
              `}
            >
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-sm text-muted-foreground">
        Exibindo{" "}
        <span className="font-medium text-foreground">{filteredCount}</span> de{" "}
        <span className="font-medium text-foreground">{stats.total}</span>{" "}
        impressoras
      </p>
    </div>
  );
};

export default PrinterStatsBar;
