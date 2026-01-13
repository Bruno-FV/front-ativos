import { Machine } from "@/types/machine";
import { Server, CheckCircle, XCircle, Wrench } from "lucide-react";


interface StatsBarProps {
  machines: Machine[];
  filteredCount: number;
}


const StatsBar = ({ machines, filteredCount }: StatsBarProps) => {
  const stats = {
    total: machines.length,
    online: machines.filter((m) => m.status === "online").length,
    offline: machines.filter((m) => m.status === "offline").length,
    maintenance: machines.filter((m) => m.status === "maintenance").length,
  };

  const statItems = [
    {
      label: "Total",
      value: stats.total,
      icon: Server,
      color: "text-foreground",
      bg: "bg-secondary",
    },
    {
      label: "Online",
      value: stats.online,
      icon: CheckCircle,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Offline",
      value: stats.offline,
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
    {
      label: "Manutenção",
      value: stats.maintenance,
      icon: Wrench,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statItems.map((stat) => (
          <div
            key={stat.label}
            className={`flex items-center gap-3 p-4 rounded-lg ${stat.bg} border border-border/30`}
          >
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Exibindo <span className="text-foreground font-medium">{filteredCount}</span> de{" "}
          <span className="text-foreground font-medium">{stats.total}</span> máquinas
        </p>
      </div>
    </div>
  );
};

export default StatsBar;
