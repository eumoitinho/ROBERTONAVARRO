// Este arquivo deve ser importado PRIMEIRO para configurar o stub de SCSS
import Module from 'module'

const extensions = (Module as any)._extensions
if (!extensions['.scss']) {
  extensions['.scss'] = () => {}
}
if (!extensions['.css']) {
  extensions['.css'] = () => {}
}

