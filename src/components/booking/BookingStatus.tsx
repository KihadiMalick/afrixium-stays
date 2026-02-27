import { Badge } from "@/components/ui/Badge";
import type { BookingStatus as BookingStatusType } from "@/lib/constants";

interface BookingStatusProps {
  status: BookingStatusType;
}

const statusConfig: Record<BookingStatusType, { label: string; variant: "success" | "warning" | "danger" | "info" | "default" }> = {
  pending:   { label: "En attente",  variant: "warning" },
  confirmed: { label: "Confirmée",   variant: "success" },
  cancelled: { label: "Annulée",     variant: "danger"  },
  completed: { label: "Terminée",    variant: "info"    },
  refunded:  { label: "Remboursée",  variant: "default" },
};

export function BookingStatus({ status }: BookingStatusProps) {
  const config = statusConfig[status] ?? { label: status, variant: "default" as const };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
