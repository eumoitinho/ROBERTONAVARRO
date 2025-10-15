import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// Tipo para o payload do webhook do Sanity
interface SanityWebhookPayload {
  _type: string;
  _id: string;
  slug?: {
    current?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Verificar secret para segurança
    const secret = request.nextUrl.searchParams.get('secret');
    const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;

    if (!expectedSecret) {
      console.error('[Revalidate] SANITY_REVALIDATE_SECRET não configurado');
      return NextResponse.json(
        { message: 'Secret de revalidação não configurado' },
        { status: 500 }
      );
    }

    if (secret !== expectedSecret) {
      console.error('[Revalidate] Secret inválido');
      return NextResponse.json(
        { message: 'Secret inválido' },
        { status: 401 }
      );
    }

    // Pegar o body do webhook
    const body = await request.json();
    const payload = body as SanityWebhookPayload;

    console.log('[Revalidate] Recebido webhook:', {
      type: payload._type,
      id: payload._id,
      slug: payload.slug?.current,
    });

    // Revalidar baseado no tipo de documento
    switch (payload._type) {
      case 'homepage':
        console.log('[Revalidate] Revalidando homepage...');
        revalidatePath('/');
        revalidateTag('homepage');
        console.log('[Revalidate] ✅ Homepage revalidada');
        break;

      case 'eventPage':
        if (payload.slug?.current) {
          const path = `/eventos/${payload.slug.current}`;
          console.log(`[Revalidate] Revalidando evento: ${path}`);
          revalidatePath(path);
          revalidateTag(`event-${payload.slug.current}`);
          console.log(`[Revalidate] ✅ Evento ${path} revalidado`);
        }
        break;

      case 'page':
        if (payload.slug?.current) {
          const path = `/${payload.slug.current}`;
          console.log(`[Revalidate] Revalidando página: ${path}`);
          revalidatePath(path);
          revalidateTag(`page-${payload.slug.current}`);
          console.log(`[Revalidate] ✅ Página ${path} revalidada`);
        }
        break;

      case 'post':
        if (payload.slug?.current) {
          const path = `/blog/${payload.slug.current}`;
          console.log(`[Revalidate] Revalidando post: ${path}`);
          revalidatePath(path);
          revalidatePath('/blog');
          revalidateTag(`post-${payload.slug.current}`);
          revalidateTag('blog-posts');
          console.log(`[Revalidate] ✅ Post ${path} revalidado`);
        }
        break;

      case 'siteSettings':
        console.log('[Revalidate] Revalidando todas as páginas (settings globais)...');
        // Revalidar tudo quando settings globais mudarem
        revalidatePath('/', 'layout');
        revalidateTag('site-settings');
        console.log('[Revalidate] ✅ Settings globais revalidados');
        break;

      default:
        console.log(`[Revalidate] Tipo de documento não reconhecido: ${payload._type}`);
        // Revalidar homepage por padrão
        revalidatePath('/');
        break;
    }

    return NextResponse.json({
      success: true,
      message: 'Revalidação concluída',
      type: payload._type,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Revalidate] Erro ao revalidar:', error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}

// Permitir GET para teste (apenas em desenvolvimento)
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { message: 'Método não permitido em produção' },
      { status: 405 }
    );
  }

  const secret = request.nextUrl.searchParams.get('secret');
  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;

  if (secret !== expectedSecret) {
    return NextResponse.json(
      { message: 'Secret inválido' },
      { status: 401 }
    );
  }

  // Revalidar homepage para teste
  revalidatePath('/');
  revalidateTag('homepage');

  return NextResponse.json({
    success: true,
    message: 'Homepage revalidada (teste)',
    timestamp: new Date().toISOString(),
  });
}

