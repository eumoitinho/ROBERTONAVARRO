interface TokenData {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
  expires_at?: number
}

interface TokenResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
}

class KommoAuth {
  private subdomain: string
  private clientId: string
  private clientSecret: string
  private redirectUri: string

  constructor() {
    this.subdomain = process.env.KOMMO_SUBDOMAIN || ""
    this.clientId = process.env.KOMMO_CLIENT_ID || ""
    this.clientSecret = process.env.KOMMO_CLIENT_SECRET || ""
    this.redirectUri = process.env.KOMMO_REDIRECT_URI || `${process.env.NEXT_PUBLIC_APP_URL}/api/kommo/callback`
  }

  // Gerar URL de autorização
  getAuthUrl(state?: string): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: "code",
      state: state || "auth",
    })

    return `https://${this.subdomain}.kommo.com/oauth2/authorize?${params.toString()}`
  }

  // Trocar código por tokens
  async exchangeCodeForTokens(code: string): Promise<TokenData> {
    try {
      const response = await fetch(`https://${this.subdomain}.kommo.com/oauth2/access_token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: "authorization_code",
          code,
          redirect_uri: this.redirectUri,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Erro ao trocar código por tokens: ${response.status} - ${errorText}`)
      }

      const tokenData: TokenResponse = await response.json()

      // Calcular timestamp de expiração
      const expiresAt = Date.now() + tokenData.expires_in * 1000

      const result: TokenData = {
        ...tokenData,
        expires_at: expiresAt,
      }

      // Salvar tokens no banco de dados ou arquivo
      await this.saveTokens(result)

      return result
    } catch (error) {
      console.error("Erro ao trocar código por tokens:", error)
      throw error
    }
  }

  // Renovar access token usando refresh token
  async refreshAccessToken(refreshToken?: string): Promise<TokenData> {
    try {
      // Se não foi fornecido refresh token, buscar do armazenamento
      if (!refreshToken) {
        const storedTokens = await this.getStoredTokens()
        if (!storedTokens?.refresh_token) {
          throw new Error("Refresh token não encontrado")
        }
        refreshToken = storedTokens.refresh_token
      }

      const response = await fetch(`https://${this.subdomain}.kommo.com/oauth2/access_token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          redirect_uri: this.redirectUri,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Erro ao renovar token: ${response.status} - ${errorText}`)
      }

      const tokenData: TokenResponse = await response.json()

      // Calcular timestamp de expiração
      const expiresAt = Date.now() + tokenData.expires_in * 1000

      const result: TokenData = {
        ...tokenData,
        expires_at: expiresAt,
      }

      // Salvar novos tokens
      await this.saveTokens(result)

      return result
    } catch (error) {
      console.error("Erro ao renovar access token:", error)
      throw error
    }
  }

  // Verificar se o token está expirado
  isTokenExpired(tokenData?: TokenData): boolean {
    if (!tokenData?.expires_at) return true

    // Considerar expirado se faltam menos de 5 minutos
    const bufferTime = 5 * 60 * 1000 // 5 minutos em ms
    return Date.now() >= tokenData.expires_at - bufferTime
  }

  // Obter token válido (renovar se necessário)
  async getValidAccessToken(): Promise<string> {
    try {
      const storedTokens = await this.getStoredTokens()

      if (!storedTokens) {
        throw new Error("Tokens não encontrados. É necessário fazer a autorização inicial.")
      }

      // Se o token não está expirado, retornar o atual
      if (!this.isTokenExpired(storedTokens)) {
        return storedTokens.access_token
      }

      // Token expirado, renovar
      console.log("Token expirado, renovando...")
      const newTokens = await this.refreshAccessToken(storedTokens.refresh_token)
      return newTokens.access_token
    } catch (error) {
      console.error("Erro ao obter token válido:", error)
      throw error
    }
  }

  // Salvar tokens (implementar conforme sua estratégia de armazenamento)
  private async saveTokens(tokenData: TokenData): Promise<void> {
    try {
      // Opção 1: Salvar em arquivo JSON (desenvolvimento)
      if (process.env.NODE_ENV === "development") {
        const fs = await import("fs/promises")
        const path = await import("path")
        const tokensPath = path.join(process.cwd(), ".kommo-tokens.json")
        await fs.writeFile(tokensPath, JSON.stringify(tokenData, null, 2))
        return
      }

      // Opção 2: Salvar no banco de dados (produção)
      // Implementar conforme seu banco de dados
      // Exemplo com Prisma:
      /*
      await prisma.kommoTokens.upsert({
        where: { id: 1 },
        update: {
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token,
          expiresAt: new Date(tokenData.expires_at!),
        },
        create: {
          accessToken: tokenData.access_token,
          refreshToken: tokenData.refresh_token,
          expiresAt: new Date(tokenData.expires_at!),
        },
      })
      */

      // Opção 3: Salvar em variáveis de ambiente (não recomendado para produção)
      console.log("⚠️ Tokens salvos apenas em memória. Configure um armazenamento persistente.")
    } catch (error) {
      console.error("Erro ao salvar tokens:", error)
      throw error
    }
  }

  // Obter tokens armazenados
  private async getStoredTokens(): Promise<TokenData | null> {
    try {
      // Opção 1: Ler de arquivo JSON (desenvolvimento)
      if (process.env.NODE_ENV === "development") {
        try {
          const fs = await import("fs/promises")
          const path = await import("path")
          const tokensPath = path.join(process.cwd(), ".kommo-tokens.json")
          const tokensFile = await fs.readFile(tokensPath, "utf-8")
          return JSON.parse(tokensFile)
        } catch {
          return null
        }
      }

      // Opção 2: Buscar no banco de dados (produção)
      // Implementar conforme seu banco de dados
      // Exemplo com Prisma:
      /*
      const tokens = await prisma.kommoTokens.findFirst({
        where: { id: 1 },
      })
      
      if (tokens) {
        return {
          access_token: tokens.accessToken,
          refresh_token: tokens.refreshToken,
          expires_in: 0, // Não usado ao recuperar
          token_type: 'Bearer',
          expires_at: tokens.expiresAt.getTime(),
        }
      }
      */

      // Opção 3: Fallback para variáveis de ambiente
      const accessToken = process.env.KOMMO_ACCESS_TOKEN
      const refreshToken = process.env.KOMMO_REFRESH_TOKEN

      if (accessToken && refreshToken) {
        return {
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: 0,
          token_type: "Bearer",
          expires_at: 0, // Assumir expirado para forçar renovação
        }
      }

      return null
    } catch (error) {
      console.error("Erro ao obter tokens armazenados:", error)
      return null
    }
  }

  // Revogar tokens
  async revokeTokens(): Promise<void> {
    try {
      const storedTokens = await this.getStoredTokens()
      if (!storedTokens) return

      // Revogar no Kommo
      await fetch(`https://${this.subdomain}.kommo.com/oauth2/revoke`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          token: storedTokens.access_token,
        }),
      })

      // Remover tokens locais
      if (process.env.NODE_ENV === "development") {
        const fs = await import("fs/promises")
        const path = await import("path")
        const tokensPath = path.join(process.cwd(), ".kommo-tokens.json")
        try {
          await fs.unlink(tokensPath)
        } catch {
          // Arquivo não existe
        }
      }

      console.log("Tokens revogados com sucesso")
    } catch (error) {
      console.error("Erro ao revogar tokens:", error)
      throw error
    }
  }
}

export const kommoAuth = new KommoAuth()

// Middleware para garantir token válido
export async function withValidToken<T>(operation: (token: string) => Promise<T>): Promise<T> {
  try {
    const validToken = await kommoAuth.getValidAccessToken()
    return await operation(validToken)
  } catch (error) {
    console.error("Erro na operação com token:", error)
    throw error
  }
}
