"use client"

import { useEffect } from "react"

export default function RaVerifiedSeals() {
  useEffect(() => {
    // Função para carregar o script do RA
    const loadRaScript = () => {
      // Remove scripts existentes para evitar duplicação
      const existingScripts = document.querySelectorAll("#ra-embed-verified-seal")
      existingScripts.forEach(script => script.remove())

      // Selo 1
      const script1 = document.createElement("script")
      script1.type = "text/javascript"
      script1.id = "ra-embed-verified-seal"
      script1.src = "https://s3.amazonaws.com/raichu-beta/ra-verified/bundle.js"
      script1.setAttribute("data-id", "c1R2WXBhVGpfMGJUeDJZMjpjaWVuY2lhLWRhLXJpcXVlemEtY3Vyc29z")
      script1.setAttribute("data-target", "ra-verified-seal-1")
      script1.setAttribute("data-model", "1")

      const seal1Container = document.getElementById("ra-verified-seal-1")
      if (seal1Container) {
        seal1Container.appendChild(script1)
      }

      // Selo 2
      const script2 = document.createElement("script")
      script2.type = "text/javascript"
      script2.id = "ra-embed-verified-seal-2"
      script2.src = "https://s3.amazonaws.com/raichu-beta/ra-verified/bundle.js"
      script2.setAttribute("data-id", "c1R2WXBhVGpfMGJUeDJZMjpjaWVuY2lhLWRhLXJpcXVlemEtY3Vyc29z")
      script2.setAttribute("data-target", "ra-verified-seal-2")
      script2.setAttribute("data-model", "2")

      const seal2Container = document.getElementById("ra-verified-seal-2")
      if (seal2Container) {
        seal2Container.appendChild(script2)
      }
    }

    // Carrega os scripts após o componente ser montado
    loadRaScript()

    // Cleanup function
    return () => {
      const scripts = document.querySelectorAll("#ra-embed-verified-seal, #ra-embed-verified-seal-2")
      scripts.forEach(script => script.remove())
    }
  }, [])

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      <div id="ra-verified-seal-1"></div>
      <div id="ra-verified-seal-2"></div>
    </div>
  )
}