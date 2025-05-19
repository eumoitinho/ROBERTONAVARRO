import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, User, Mail, Phone } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface TicketCardProps {
  ticketCode: string;
  name: string;
  email: string;
  phone?: string;
  eventName: string;
  eventDate?: string;
  eventLocation?: string;
  primaryColor?: string;
  secondaryColor?: string;
  logoUrl?: string;
  backgroundPattern?: string;
}

export function TicketCard({
  ticketCode,
  name,
  email,
  phone,
  eventName,
  eventDate,
  eventLocation,
  primaryColor = "#1e3a8a", // Azul escuro como cor primária
  secondaryColor = "#f97316", // Laranja vibrante como cor secundária
  logoUrl,
  backgroundPattern = "data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f97316' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3Cpath d='M20 20l10 10 10-10-10-10z'/%3E%3C/g%3E%3C/svg%3E", // Padrão sutil com triângulos
}: TicketCardProps) {
  // Formatar a data do evento
  const formattedDate = eventDate
    ? new Date(eventDate).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  // URL para verificação do ticket
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/verificar/${ticketCode}`;

  return (
    <Card
      className="w-full max-w-md overflow-hidden border-0 shadow-lg"
      style={{
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: backgroundPattern ? `url(${backgroundPattern})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <CardContent className="p-6 relative z-10">
        {/* Cabeçalho do Ticket */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white drop-shadow-md">{eventName}</h2>
            {logoUrl && (
              <div className="mt-2">
                <img src={logoUrl} alt={eventName} className="h-8 w-auto" />
              </div>
            )}
          </div>
          <div className="bg-white p-2 rounded-lg">
            <QRCodeSVG value={verificationUrl} size={80} />
          </div>
        </div>

        {/* Informações do Evento */}
        <div className="bg-gray-100 bg-opacity-90 rounded-lg p-4 mb-4">
          <div className="grid gap-3">
            {eventLocation && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-800">{eventLocation}</span>
              </div>
            )}
            {formattedDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-800">{formattedDate}</span>
              </div>
            )}
          </div>
        </div>

        {/* Informações do Participante */}
        <div className="bg-gray-100 bg-opacity-90 rounded-lg p-4">
          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-800">{name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-800">{email}</span>
            </div>
            {phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-800">{phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Código do Ticket */}
        <div className="mt-4 text-center">
          <div
            className="rounded-lg py-2 px-4 inline-block"
            style={{ backgroundColor: secondaryColor, opacity: 0.8 }}
          >
            <span className="text-black font-mono font-bold tracking-wider">{ticketCode}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
