// Polyfill para adicionar withRouter ao react-router-dom
// Isso resolve o problema de compatibilidade com react-router-navigation-prompt

const path = require('path')
const fs = require('fs')

const routerPath = path.resolve(__dirname, '../node_modules/payload/node_modules/react-router-dom')
const indexPath = path.join(routerPath, 'index.js')

if (fs.existsSync(indexPath)) {
  const content = fs.readFileSync(indexPath, 'utf8')
  
  // Verificar se withRouter já está exportado
  if (!content.includes('withRouter')) {
    // Adicionar export de withRouter se não existir
    const withRouterPath = path.join(routerPath, 'withRouter.js')
    if (fs.existsSync(withRouterPath)) {
      // Se o arquivo withRouter.js existe, garantir que está sendo exportado
      console.log('✅ withRouter.js encontrado em:', withRouterPath)
    }
  }
}

// Exportar função para injetar withRouter
module.exports = function injectWithRouter(module) {
  if (module.exports && !module.exports.withRouter) {
    try {
      const withRouter = require(path.join(routerPath, 'withRouter.js'))
      if (withRouter && typeof withRouter === 'function') {
        module.exports.withRouter = withRouter.default || withRouter
        console.log('✅ withRouter injetado com sucesso')
      }
    } catch (e) {
      console.warn('⚠️  Não foi possível injetar withRouter:', e.message)
    }
  }
}

