import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload/client'
import { navigationItemsDefault } from '@/lib/navigation-default'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayloadClient()
    const navigation = await payload.findGlobal({
      slug: 'navigation',
    })

    const items = Array.isArray(navigation?.headerItems)
      ? navigation.headerItems
      : navigationItemsDefault

    return NextResponse.json({ items })
  } catch (error) {
    console.error('Erro ao buscar navegação:', error)
    return NextResponse.json({ items: [] }, { status: 200 })
  }
}
