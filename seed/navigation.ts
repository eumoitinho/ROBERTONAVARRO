import { navigationItemsDefault } from '@/lib/navigation-default'

export async function seedNavigation(payload: any) {
  console.log('\n🧭 Populando Navegação...')
  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      headerItems: navigationItemsDefault,
    },
    overrideAccess: true,
  })
  console.log('✅ Navegação atualizada')
}
