export const metadata = {
  title: 'Roberto Navarro - Studio',
  description: 'Content Management Studio',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}