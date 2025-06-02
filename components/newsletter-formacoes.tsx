"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

interface FormData {
  name: string
  email: string
  phone?: string
  interest: string
}

interface NewsletterFormProps {
  interest: string
}

async function sendToGoogleSheets(data: FormData) {
  const scriptURL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL
  if (!scriptURL) {
    console.error("Google Sheet URL not found in environment variables.")
    return false
  }

  try {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("email", data.email)
    formData.append("phone", data.phone || "") // Send empty string if phone is undefined
    formData.append("interest", data.interest)

    const response = await fetch(scriptURL, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      console.error("Error sending data to Google Sheets:", response.status, response.statusText)
      return false
    }

    return true
  } catch (error) {
    console.error("Error sending data to Google Sheets:", error)
    return false
  }
}

async function sendLeadToKommo(data: {
  name: string
  email: string
  phone: string
  source: string
  utmData: {
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
    utm_content?: string
    utm_term?: string
    referrer?: string
    gclid?: string
    fbclid?: string
  }
}) {
  const kommoApiUrl = process.env.NEXT_PUBLIC_KOMMO_API_URL
  const kommoApiKey = process.env.NEXT_PUBLIC_KOMMO_API_KEY

  if (!kommoApiUrl || !kommoApiKey) {
    console.error("Kommo API URL or API Key not found in environment variables.")
    return
  }

  try {
    const response = await fetch(kommoApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": kommoApiKey,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      console.error("Error sending data to Kommo:", response.status, response.statusText)
      throw new Error(`Kommo API Error: ${response.status} ${response.statusText}`)
    }

    const responseData = await response.json()
    console.log("Kommo API Response:", responseData)
  } catch (error) {
    console.error("Error sending data to Kommo:", error)
    throw error // Re-throw to be caught by the caller
  }
}

const NewsletterForm = ({ interest }: NewsletterFormProps) => {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", interest: interest })
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.name || !formData.email) {
      setError("Por favor, preencha todos os campos.")
      return
    }

    try {
      const googleSheetsSuccess = await sendToGoogleSheets(formData)

      if (googleSheetsSuccess) {
        setSuccess(true)
        setFormData({ name: "", email: "", interest: interest }) // Clear the form
        // Optionally redirect or show a success message
        console.log("Dados enviados para o Google Sheets com sucesso!")

        try {
          // Enviar para Kommo
          await sendLeadToKommo({
            name: formData.name,
            email: formData.email,
            phone: formData.phone || "",
            source: `Formação ${formData.interest}`,
            utmData: {
              utm_source: searchParams.get("utm_source") || undefined,
              utm_medium: searchParams.get("utm_medium") || undefined,
              utm_campaign: searchParams.get("utm_campaign") || undefined,
              utm_content: searchParams.get("utm_content") || undefined,
              utm_term: searchParams.get("utm_term") || undefined,
              referrer: document.referrer || undefined,
              gclid: searchParams.get("gclid") || undefined,
              fbclid: searchParams.get("fbclid") || undefined,
            },
          })
          console.log("Lead enviado para Kommo com sucesso!")
        } catch (kommoError) {
          console.error("Erro ao enviar para Kommo:", kommoError)
          // Não falha o processo se o Kommo der erro
        }
      } else {
        setError("Ocorreu um erro ao enviar os dados. Por favor, tente novamente.")
      }
    } catch (err) {
      console.error("Erro ao enviar dados:", err)
      setError("Ocorreu um erro ao enviar os dados. Por favor, tente novamente.")
    }
  }

  return (
    <div>
      {success ? (
        <p>Obrigado! Sua inscrição foi recebida.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div>
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="phone">Telefone (opcional):</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <button type="submit">Inscrever-se</button>
        </form>
      )}
    </div>
  )
}

export default NewsletterForm
