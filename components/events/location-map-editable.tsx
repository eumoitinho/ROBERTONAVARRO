"use client"

import { MapPin, Phone, Mail } from "lucide-react"

interface LocationMapEditableProps {
  data: {
    show: boolean
    address?: string
    phone?: string
    email?: string
    mapEmbedUrl?: string
  }
}

export default function LocationMapEditable({ data }: LocationMapEditableProps) {
  if (!data.show) return null

  // Fallback values
  const address = data.address || "Av. Contorno, 8395 - sala 403, Lourdes, Belo Horizonte - MG, 30110-130"
  const phone = data.phone || "+55 (31) 3515-3920"
  const email = data.email || "contato@robertonavarro.com.br"
  const mapUrl = data.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.733889379698!2d-43.95082732447524!3d-19.939468681437743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa699f5d3d0a00d%3A0x7dcfd6e5ed69c5e6!2sAv.%20do%20Contorno%2C%208395%20-%20Santo%20Agostinho%2C%20Belo%20Horizonte%20-%20MG%2C%2030110-130!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"

  return (
    <section id="localizacao" className="py-12 xs:py-12 sm:py-16 md:py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/95 to-zinc-900/90"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Onde <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">Estamos</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-zinc-800 rounded-full p-3 flex-shrink-0">
                  <MapPin className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Endereço</h3>
                  <p className="text-zinc-300">{address}</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-zinc-800 rounded-full p-3 flex-shrink-0">
                  <Phone className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Telefone</h3>
                  <p className="text-zinc-300">{phone}</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="bg-zinc-800 rounded-full p-3 flex-shrink-0">
                  <Mail className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">E-mail</h3>
                  <p className="text-zinc-300">{email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-full min-h-[400px] rounded-xl overflow-hidden border border-zinc-800/50">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

