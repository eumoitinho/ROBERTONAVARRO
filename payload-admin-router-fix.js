// Wrapper para forçar uso do react-router-dom v5 do Payload
// Este arquivo é usado como alias no webpack para garantir que withRouter esteja disponível

const path = require('path')
const routerPath = path.join(__dirname, 'node_modules', 'payload', 'node_modules', 'react-router-dom')

// Forçar uso da versão do Payload
const router = require(routerPath)

// Garantir que withRouter está exportado
if (!router.withRouter) {
  console.error('❌ withRouter não encontrado em react-router-dom do Payload')
}

module.exports = router

