import { Printers } from "@/types/printers";
import PrinterCard from "./PrinterCard";
import { Printer } from "lucide-react";

interface PrinterGridProps {
  printers: Printers[];
  isLoading?: boolean;
  onEdit?: (printer: Printers) => void;
  onDelete?: (printer: Printers) => void;
}

const PrinterGrid = ({
  printers,
  isLoading,
  onEdit,
  onDelete,
}: PrinterGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-[280px] rounded-lg bg-card border border-border/50 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (printers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
          <Printer className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          Nenhuma impressora encontrada
        </h3>
        <p className="text-sm text-muted-foreground text-center max-w-md">
          Tente ajustar os filtros de pesquisa ou verifique se há impressoras
          cadastradas no sistema.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {printers.map((printer, index) => (
        <PrinterCard
          key={printer.id}
          printer={printer}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default PrinterGrid;
