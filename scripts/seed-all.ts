import { seedAll } from '../seed/index'

seedAll()
  .then(() => {
    console.log('\n✅ Seed concluído com sucesso!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Erro ao executar seed:', error)
    process.exit(1)
  })

