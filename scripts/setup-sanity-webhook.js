const { createClient } = require('@sanity/client');
const crypto = require('crypto');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function setupWebhook() {
  try {
    console.log('🔧 Configurando webhook do Sanity...\n');

    // Verificar se já existe um secret
    let secret = process.env.SANITY_REVALIDATE_SECRET;
    
    if (!secret) {
      // Gerar novo secret
      secret = crypto.randomBytes(32).toString('hex');
      console.log('🔑 Secret gerado:', secret);
      console.log('\n⚠️  IMPORTANTE: Adicione esta linha ao seu .env.local:');
      console.log(`SANITY_REVALIDATE_SECRET="${secret}"\n`);
    } else {
      console.log('✅ Secret já configurado no .env.local\n');
    }

    // URL do webhook (ajuste conforme seu domínio)
    const webhookUrl = process.env.NEXT_PUBLIC_SITE_URL 
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?secret=${secret}`
      : `http://localhost:3000/api/revalidate?secret=${secret}`;

    console.log('📊 Configuração do Webhook:');
    console.log(`   URL: ${webhookUrl}`);
    console.log(`   Project ID: ${client.config().projectId}`);
    console.log(`   Dataset: ${client.config().dataset}\n`);

    console.log('📝 INSTRUÇÕES PARA CONFIGURAR NO SANITY:');
    console.log('─────────────────────────────────────────────────────\n');
    console.log('1. Acesse: https://www.sanity.io/manage');
    console.log(`2. Selecione seu projeto: ${client.config().projectId}`);
    console.log('3. Vá em "API" → "Webhooks"');
    console.log('4. Clique em "Create webhook"');
    console.log('5. Preencha:\n');
    console.log(`   Name: Content Revalidation (Homepage + Events)`);
    console.log(`   URL: ${webhookUrl}`);
    console.log(`   Dataset: ${client.config().dataset}`);
    console.log(`   Trigger on: Create, Update, Delete`);
    console.log(`   Filter: _type == "homepage" || _type == "eventPage"`);
    console.log(`   HTTP method: POST`);
    console.log(`   API version: v2024-01-01`);
    console.log(`   Include drafts: No`);
    console.log('\n6. Clique em "Save"\n');
    
    console.log('─────────────────────────────────────────────────────\n');
    console.log('✅ Após configurar, toda vez que você publicar mudanças');
    console.log('   na homepage, o site será atualizado AUTOMATICAMENTE!\n');
    
    console.log('🧪 Para testar o webhook localmente:');
    console.log('   1. Certifique-se que o servidor está rodando (npm run dev)');
    console.log('   2. Use um túnel como ngrok para expor localhost');
    console.log('   3. Ou teste manualmente:');
    console.log(`      curl "${webhookUrl}"\n`);

  } catch (error) {
    console.error('\n❌ Erro ao configurar webhook:');
    console.error(error.message);
    process.exit(1);
  }
}

setupWebhook();

