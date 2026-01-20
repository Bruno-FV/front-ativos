import { cadLicense } from "@/types/cadLicense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, ShieldCheck, ShieldX } from "lucide-react";

interface LicenseStatsBarProps {
  licenses: cadLicense[];
  filteredCount: number;
  onStatusClick?: (status: string | null) => void;
  activeStatus?: string | null;
}

const LicenseStatsBar = ({
  licenses,
  filteredCount,
  onStatusClick,
  activeStatus,
}: LicenseStatsBarProps) => {
  const totalLicenses = licenses.length;
  const activeLicenses = licenses.filter((l) => l.status === "active").length;
  const expiredLicenses = licenses.filter((l) => new Date(l.dateEndLisence) < new Date()).length;

  const stats = [
    {
      title: "Total de Licenças",
      value: totalLicenses,
      icon: Shield,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      onClick: () => onStatusClick?.(null),
      isActive: activeStatus === null,
    },
    {
      title: "Licenças Ativas",
      value: activeLicenses,
      icon: ShieldCheck,
      color: "text-green-600",
      bgColor: "bg-green-100",
      onClick: () => onStatusClick?.("active"),
      isActive: activeStatus === "active",
    },
    {
      title: "Licenças Expiradas",
      value: expiredLicenses,
      icon: ShieldX,
      color: "text-red-600",
      bgColor: "bg-red-100",
      onClick: () => onStatusClick?.("expired"),
      isActive: activeStatus === "expired",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`cursor-pointer transition-all hover:shadow-md ${
            stat.isActive ? "ring-2 ring-primary" : ""
          }`}
          onClick={stat.onClick}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.isActive && filteredCount !== totalLicenses
                ? `${filteredCount} filtrados`
                : "Total"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LicenseStatsBar;
