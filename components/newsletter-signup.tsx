"use client"

import type React from "react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"

interface FormData {
  name: string
  email: string
  phone?: string
}

interface NewsletterSignupProps {
  onSubmitSuccess?: () => void
}

async function sendLeadToKommo(data: any) {
  const kommoApiUrl = process.env.NEXT_PUBLIC_KOMMO_API_URL
  const kommoApiKey = process.env.NEXT_PUBLIC_KOMMO_API_KEY

  if (!kommoApiUrl || !kommoApiKey) {
    console.warn("Kommo API URL or API Key not configured. Skipping Kommo integration.")
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
      console.error("Kommo API error:", response.status, response.statusText)
      try {
        const errorBody = await response.json()
        console.error("Kommo API error body:", errorBody)
      } catch (jsonError) {
        console.error("Error parsing Kommo error response:", jsonError)
      }
      throw new Error(`Kommo API request failed with status ${response.status}`)
    }

    const responseData = await response.json()
    console.log("Kommo API response:", responseData)
  } catch (error) {
    console.error("Error sending lead to Kommo:", error)
    throw error
  }
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", phone: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<"success" | "error" | null>(null)
  const searchParams = useSearchParams()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmissionResult(null)

    try {
      const response = await fetch("/api/submit-newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmissionResult("success")
        if (onSubmitSuccess) {
          onSubmitSuccess()
        }
        setFormData({ name: "", email: "", phone: "" }) // Clear the form
        console.log("Form submitted successfully!")

        try {
          // Enviar para Kommo
          await sendLeadToKommo({
            name: formData.name,
            email: formData.email,
            phone: formData.phone || "",
            source: "Newsletter Site",
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
        setSubmissionResult("error")
        console.error("Form submission failed.")
      }
    } catch (error) {
      setSubmissionResult("error")
      console.error("An error occurred:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="phone">Phone (Optional):</label>
        <input type="tel" id="phone" name="phone" value={formData.phone || ""} onChange={handleChange} />
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Subscribe"}
      </button>

      {submissionResult === "success" && <p>Thank you for subscribing!</p>}
      {submissionResult === "error" && <p>An error occurred. Please try again.</p>}
    </form>
  )
}

export default NewsletterSignup
