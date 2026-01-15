'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { cn, getBrowserInfo, getUTMParameters } from '@/lib/utils'

interface FormField {
  name: string
  label: string
  type: string
  required?: boolean
  placeholder?: string
  options?: Array<{ label: string; value: string }>
  validation?: {
    minLength?: number
    maxLength?: number
    pattern?: string
  }
}

interface DynamicFormProps {
  formSlug: string
  accent?: 'red' | 'yellow' | 'blue'
  className?: string
  source?: string
  submitText?: string
}

export default function DynamicForm({
  formSlug,
  accent = 'red',
  className,
  source: sourceOverride,
  submitText,
}: DynamicFormProps) {
  const [form, setForm] = useState<any>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [loading, setLoading] = useState(true)

  const accentColors = {
    red: {
      button: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
      border: 'border-red-500/30',
      focus: 'focus:ring-red-500',
      text: 'text-red-400',
    },
    yellow: {
      button: 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700',
      border: 'border-yellow-500/30',
      focus: 'focus:ring-yellow-500',
      text: 'text-yellow-400',
    },
    blue: {
      button: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      border: 'border-blue-500/30',
      focus: 'focus:ring-blue-500',
      text: 'text-blue-400',
    },
  }

  const colors = accentColors[accent]

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await fetch(`/api/forms/${formSlug}`)
        if (!response.ok) {
          throw new Error('Formulário não encontrado')
        }
        const data = await response.json()
        setForm(data)
        
        // Inicializar formData com valores vazios
        const initialData: Record<string, any> = {}
        data.fields?.forEach((field: FormField) => {
          if (field.type === 'checkbox') {
            initialData[field.name] = false
          } else if (field.type === 'radio' || field.type === 'select') {
            initialData[field.name] = ''
          } else {
            initialData[field.name] = ''
          }
        })
        setFormData(initialData)
      } catch (error) {
        console.error('Erro ao carregar formulário:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchForm()
  }, [formSlug])

  const validateField = (field: FormField, value: any): string | null => {
    if (field.required && !value) {
      return `O campo "${field.label}" é obrigatório`
    }

    if (value && field.validation) {
      if (field.validation.minLength && value.length < field.validation.minLength) {
        return `O campo "${field.label}" deve ter no mínimo ${field.validation.minLength} caracteres`
      }
      if (field.validation.maxLength && value.length > field.validation.maxLength) {
        return `O campo "${field.label}" deve ter no máximo ${field.validation.maxLength} caracteres`
      }
      if (field.validation.pattern) {
        const regex = new RegExp(field.validation.pattern)
        if (!regex.test(value)) {
          return `O campo "${field.label}" não está no formato correto`
        }
      }
    }

    if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return `O campo "${field.label}" deve ser um email válido`
    }

    return null
  }

  const handleChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }))
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[fieldName]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar todos os campos
    const newErrors: Record<string, string> = {}
    form.fields?.forEach((field: FormField) => {
      const error = validateField(field, formData[field.name])
      if (error) {
        newErrors[field.name] = error
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const utmParams = getUTMParameters()
      const browserInfo = getBrowserInfo()
      const source = sourceOverride || form?.name || form?.slug || formSlug
      const response = await fetch(`/api/forms/${formSlug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source,
          ...utmParams,
          ...browserInfo,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao enviar formulário')
      }

      setIsSubmitted(true)
      setSubmitMessage(result.message || 'Formulário enviado com sucesso!')

      // Se houver URL de redirecionamento, redirecionar após 2 segundos
      if (result.redirect) {
        setTimeout(() => {
          window.location.href = result.redirect
        }, 2000)
      }
    } catch (error: any) {
      setErrors({ submit: error.message || 'Erro ao enviar formulário. Tente novamente.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderField = (field: FormField) => {
    const fieldError = errors[field.name]
    const value = formData[field.name] || ''

    switch (field.type) {
      case 'textarea':
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name} className="text-white">
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </Label>
            <Textarea
              id={field.name}
              name={field.name}
              value={value}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              className={cn(
                'bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-500',
                fieldError && 'border-red-500',
                colors.focus
              )}
              rows={4}
            />
            {fieldError && <p className="text-sm text-red-400">{fieldError}</p>}
          </div>
        )

      case 'select':
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name} className="text-white">
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </Label>
            <select
              id={field.name}
              name={field.name}
              value={value}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
              className={cn(
                'flex h-10 w-full rounded-md border bg-zinc-900/50 border-zinc-700 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950',
                fieldError && 'border-red-500',
                colors.focus
              )}
            >
              <option value="">Selecione...</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {fieldError && <p className="text-sm text-red-400">{fieldError}</p>}
          </div>
        )

      case 'radio':
        return (
          <div key={field.name} className="space-y-2">
            <Label className="text-white">
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </Label>
            <div className="space-y-2">
              {field.options?.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={value === option.value}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required={field.required}
                    className={cn('w-4 h-4', colors.focus)}
                  />
                  <span className="text-zinc-300">{option.label}</span>
                </label>
              ))}
            </div>
            {fieldError && <p className="text-sm text-red-400">{fieldError}</p>}
          </div>
        )

      case 'checkbox':
        return (
          <div key={field.name} className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name={field.name}
                checked={value}
                onChange={(e) => handleChange(field.name, e.target.checked)}
                required={field.required}
                className={cn('w-4 h-4', colors.focus)}
              />
              <span className="text-white">
                {field.label} {field.required && <span className="text-red-400">*</span>}
              </span>
            </label>
            {fieldError && <p className="text-sm text-red-400">{fieldError}</p>}
          </div>
        )

      case 'file':
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name} className="text-white">
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </Label>
            <Input
              id={field.name}
              name={field.name}
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0]
                handleChange(field.name, file)
              }}
              required={field.required}
              className={cn(
                'bg-zinc-900/50 border-zinc-700 text-white',
                fieldError && 'border-red-500',
                colors.focus
              )}
            />
            {fieldError && <p className="text-sm text-red-400">{fieldError}</p>}
          </div>
        )

      default:
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name} className="text-white">
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </Label>
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              value={value}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              className={cn(
                'bg-zinc-900/50 border-zinc-700 text-white placeholder:text-zinc-500',
                fieldError && 'border-red-500',
                colors.focus
              )}
            />
            {fieldError && <p className="text-sm text-red-400">{fieldError}</p>}
          </div>
        )
    }
  }

  if (loading) {
    return (
      <div className={cn('flex items-center justify-center p-8', className)}>
        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
      </div>
    )
  }

  if (!form) {
    return (
      <div className={cn('p-8 text-center text-zinc-400', className)}>
        Formulário não encontrado
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className={cn('p-8 text-center', className)}>
        <div className="flex flex-col items-center gap-4">
          <CheckCircle2 className="h-12 w-12 text-green-500" />
          <p className="text-lg text-white">{submitMessage}</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      {form.fields?.map((field: FormField) => renderField(field))}
      
      {errors.submit && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-sm text-red-400">{errors.submit}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          'w-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg',
          colors.button,
          isSubmitting && 'opacity-50 cursor-not-allowed'
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          submitText && submitText.trim() !== '' ? submitText : form.settings?.submitText || 'Enviar'
        )}
      </Button>
    </form>
  )
}
