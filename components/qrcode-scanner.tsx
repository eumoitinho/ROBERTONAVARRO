"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle2, Camera, X, Ticket, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import jsQR from "jsqr"
import type { Event } from "@/lib/db"

interface QRCodeScannerProps {
  events?: Event[]
}

export function QRCodeScanner({ events = [] }: QRCodeScannerProps) {
  const { toast } = useToast()
  const [selectedEvent, setSelectedEvent] = useState<string>("")
  const [manualCode, setManualCode] = useState<string>("")
  const [scanning, setScanning] = useState<boolean>(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loadingEvents, setLoadingEvents] = useState<boolean>(events.length === 0)
  const [localEvents, setLocalEvents] = useState<Event[]>(events)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    if (events.length > 0) {
      setLocalEvents(events)
      setLoadingEvents(false)
    } else {
      fetchEvents()
    }

    return () => {
      // Limpar stream ao desmontar
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [events])

  const fetchEvents = async () => {
    setLoadingEvents(true)
    try {
      const response = await fetch("/api/events")
      if (!response.ok) {
        throw new Error("Falha ao carregar eventos")
      }
      const data = await response.json()
      setLocalEvents(data)
    } catch (error) {
      console.error("Erro ao buscar eventos:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar a lista de eventos",
        variant: "destructive",
      })
    } finally {
      setLoadingEvents(false)
    }
  }

  const startScanner = async () => {
    setError(null)
    setResult(null)

    try {
      if (!selectedEvent) {
        setError("Selecione um evento antes de iniciar o scanner")
        return
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setScanning(true)

        // Iniciar detecção de QR code
        requestAnimationFrame(scanQRCode)
      }
    } catch (err) {
      setError("Não foi possível acessar a câmera. Verifique as permissões.")
      console.error(err)
    }
  }

  const stopScanner = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }

    setScanning(false)
  }

  const scanQRCode = async () => {
    if (!scanning || !videoRef.current || !canvasRef.current) return

    if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        canvas.height = video.videoHeight
        canvas.width = video.videoWidth

        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        try {
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          })

          if (code) {
            console.log("QR Code detectado:", code.data)
            await checkTicket(code.data)
            return
          }
        } catch (err) {
          console.error("Erro ao processar QR code:", err)
        }
      }
    }

    if (scanning) {
      requestAnimationFrame(scanQRCode)
    }
  }

  const checkTicket = async (code: string) => {
    setError(null)

    try {
      if (!selectedEvent) {
        setError("Selecione um evento antes de verificar o ticket")
        return
      }

      const response = await fetch("/api/check-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketCode: code,
          eventId: Number.parseInt(selectedEvent),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erro ao verificar ticket")
      }

      setResult(data)
      stopScanner()

      // Notificar o usuário
      toast({
        title: data.success ? "Check-in realizado!" : "Erro no check-in",
        description: data.success ? `Check-in de ${data.registration.name} realizado com sucesso` : data.message,
        variant: data.success ? "default" : "destructive",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao verificar ticket")
      toast({
        title: "Erro",
        description: err instanceof Error ? err.message : "Erro ao verificar ticket",
        variant: "destructive",
      })
    }
  }

  const handleManualCheck = async () => {
    if (!manualCode.trim()) {
      setError("Digite um código de ticket válido")
      return
    }

    await checkTicket(manualCode.trim())
  }

  const resetScanner = () => {
    setResult(null)
    setError(null)
    setManualCode("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scanner de QR Code</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loadingEvents ? (
            <div className="h-10 bg-gray-100 animate-pulse rounded-md"></div>
          ) : (
            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um evento" />
              </SelectTrigger>
              <SelectContent>
                {localEvents.map((event) => (
                  <SelectItem key={event.id} value={event.id.toString()}>
                    {event.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <Alert
              variant={result.success ? "default" : "destructive"}
              className={result.success ? "bg-green-50 border-green-200" : ""}
            >
              {result.success ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertTitle>{result.success ? "Check-in realizado com sucesso!" : "Erro no check-in"}</AlertTitle>
              <AlertDescription>
                {result.success ? (
                  <div className="space-y-2">
                    <p>
                      <strong>Nome:</strong> {result.registration.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {result.registration.email}
                    </p>
                    <p>
                      <strong>Código:</strong> {result.registration.ticket_code}
                    </p>
                  </div>
                ) : (
                  result.message
                )}
              </AlertDescription>
            </Alert>
          )}

          {!scanning && !result ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={startScanner} disabled={!selectedEvent || loadingEvents}>
                  <Camera className="mr-2 h-4 w-4" />
                  Iniciar Scanner
                </Button>

                <div className="flex-1 flex gap-2">
                  <Input
                    type="text"
                    placeholder="Ou digite o código manualmente..."
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    onClick={handleManualCheck}
                    disabled={!selectedEvent || !manualCode.trim() || loadingEvents}
                  >
                    <Ticket className="mr-2 h-4 w-4" />
                    Verificar
                  </Button>
                </div>
              </div>
            </div>
          ) : scanning ? (
            <div className="space-y-4">
              <div className="relative aspect-video max-w-md mx-auto overflow-hidden rounded-lg border">
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  playsInline
                  muted
                />
                <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover opacity-0" />
              </div>

              <div className="flex justify-center">
                <Button variant="outline" onClick={stopScanner}>
                  <X className="mr-2 h-4 w-4" />
                  Cancelar Scanner
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <Button onClick={resetScanner}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Escanear Outro Ticket
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
