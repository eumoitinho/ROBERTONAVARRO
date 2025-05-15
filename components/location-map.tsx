"use client"

import { useEffect, useRef } from "react"

export default function LocationMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize the map only on client side
    if (typeof window !== "undefined" && mapRef.current) {
      const iframe = document.createElement("iframe")
      iframe.src =
        "https://www.google.com/maps/embed?pb=!4v1746647410285!6m8!1m7!1sCmXGf52YxQcnwTU-1MsNlQ!2m2!1d-23.49787817078243!2d-46.85401716676614!3f173.40748254106288!4f0.31314005196917094!5f0.7034732728947808" // <-- Substitua por um novo link se necessário
      iframe.width = "100%"
      iframe.height = "450"
      iframe.style.border = "0"
      iframe.allowFullscreen = true
      iframe.loading = "lazy"
      iframe.referrerPolicy = "no-referrer-when-downgrade"

      // Clear previous content and append the iframe
      if (mapRef.current) {
        mapRef.current.innerHTML = ""
        mapRef.current.appendChild(iframe)
      }
    }
  }, [])

  return (
    <div className="w-full h-[450px] rounded-xl overflow-hidden border-2 border-yellow-400" ref={mapRef}>
      <div className="w-full h-full flex items-center justify-center bg-zinc-800">
        <p>Carregando mapa...</p>
      </div>
    </div>
  )
}
