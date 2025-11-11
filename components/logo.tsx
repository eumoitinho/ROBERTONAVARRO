import Image from "next/image"

export default function Logo({
  className = "",
  width,
  height,
  variant = "white",
}: {
  className?: string
  width?: number
  height?: number
  variant?: "white" | "yellow"
}) {
  // Se width e height forem fornecidos explicitamente, use width/height diretamente
  // Caso contrário, use fill com container que tem aspect-ratio
  const hasExplicitDimensions = width && height

  if (hasExplicitDimensions) {
    return (
      <div className={`relative ${className}`} style={{ width, height }}>
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_1-VTfVPh3t1DtDdS9lNmHAVfulKK5lOf.png"
          alt="Roberto Navarro Logo"
          fill
          className="object-contain"
          sizes={`${width}px`}
          style={{
            filter:
              variant === "yellow"
                ? "brightness(0) saturate(100%) invert(80%) sepia(50%) saturate(1000%) hue-rotate(360deg) brightness(105%) contrast(105%)"
                : "none",
          }}
          priority
        />
      </div>
    )
  }

  // Quando usado com classes do Tailwind (ex: h-8 w-auto)
  // O container precisa ter aspect-ratio para funcionar com fill
  // Proporção aproximada do logo: 180/50 = 3.6
  return (
    <div 
      className={`relative ${className}`}
      style={{ aspectRatio: '3.6 / 1' }}
    >
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_1-VTfVPh3t1DtDdS9lNmHAVfulKK5lOf.png"
        alt="Roberto Navarro Logo"
        fill
        className="object-contain"
        sizes="(max-width: 768px) 120px, 180px"
        style={{
          filter:
            variant === "yellow"
              ? "brightness(0) saturate(100%) invert(80%) sepia(50%) saturate(1000%) hue-rotate(360deg) brightness(105%) contrast(105%)"
              : "none",
        }}
        priority
      />
    </div>
  )
}
