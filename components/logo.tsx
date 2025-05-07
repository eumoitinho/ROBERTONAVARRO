import Image from "next/image"

export default function Logo({
  className = "",
  width = 180,
  height = 50,
  variant = "white",
}: {
  className?: string
  width?: number
  height?: number
  variant?: "white" | "yellow"
}) {
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_1-VTfVPh3t1DtDdS9lNmHAVfulKK5lOf.png"
        alt="Roberto Navarro Logo"
        fill
        className="object-contain"
        style={{
          filter:
            variant === "yellow"
              ? "brightness(0) saturate(100%) invert(80%) sepia(50%) saturate(1000%) hue-rotate(360deg) brightness(105%) contrast(105%)"
              : "none",
        }}
      />
    </div>
  )
}
