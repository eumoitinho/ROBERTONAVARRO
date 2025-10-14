// Script para atualizar o conteúdo COMPLETO dos posts
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'c2lnfkl6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sku3NuSJsrRD4behyaUUkiddYZeUT37ei1qVx0arD76Qqu9yIYPHvNqlU79xvbsssQogmBKz4mvNZbAUIJZ5bDVls2PRWltMs6K3gzh1iD9mS5s71rusuacKm8EPZwo85XfP1ALeZ0BPbKk1J3H5nLNAWhA4fYh40md9Cf5mWFUALqu6gFIY',
  useCdn: false
})

async function updateFullContent() {
  console.log('📝 Atualizando conteúdo COMPLETO dos posts...')
  
  try {
    // Post 1 - Cadê a Sua Versão Milionária
    await client.patch('blogpost-cade-sua-versao-milionaria').set({
      body: [
        {
          _type: 'block',
          _key: 'block-0',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'span-0',
              text: 'Cadê a Sua Versão Milionária?'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span-1',
              text: 'Lembra daquela versão sua que sonhava grande? Que planejava conquistar a liberdade financeira e viver com propósito? Onde ela está agora? Talvez ela não tenha desaparecido — talvez ela esteja apenas adormecida, esperando um empurrão de coragem para despertar.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-2',
          style: 'h3',
          children: [
            {
              _type: 'span',
              _key: 'span-2',
              text: 'Por Que Você Parou de Sonhar Grande?'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-3',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span-3',
              text: 'Com o tempo, muitos de nós trocam ambição por conformismo. Chamamos medo de '
            },
            {
              _type: 'span',
              _key: 'span-4',
              marks: ['strong'],
              text: '"realismo"'
            },
            {
              _type: 'span',
              _key: 'span-5',
              text: ' e nos contentamos com metas pequenas. Mas a verdade é que você não parou por falta de tempo ou oportunidades. Algo dentro de você está te segurando — uma voz sutil que diz: '
            },
            {
              _type: 'span',
              _key: 'span-6',
              marks: ['em'],
              text: '"Não arrisque"'
            },
            {
              _type: 'span',
              _key: 'span-7',
              text: ', '
            },
            {
              _type: 'span',
              _key: 'span-8',
              marks: ['em'],
              text: '"Não é o momento"'
            },
            {
              _type: 'span',
              _key: 'span-9',
              text: ' ou '
            },
            {
              _type: 'span',
              _key: 'span-10',
              marks: ['em'],
              text: '"Você não é capaz"'
            },
            {
              _type: 'span',
              _key: 'span-11',
              text: '.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-4',
          style: 'h3',
          children: [
            {
              _type: 'span',
              _key: 'span-12',
              text: 'Crenças Limitantes: O Inimigo Silencioso'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-5',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span-13',
              text: 'Essas vozes são '
            },
            {
              _type: 'span',
              _key: 'span-14',
              marks: ['strong'],
              text: 'crenças limitantes'
            },
            {
              _type: 'span',
              _key: 'span-15',
              text: ', um sistema interno que sabota seus planos mesmo quando tudo parece favorável. Elas não surgem por acaso. São fruto de experiências, medos e inseguranças acumuladas, que te fazem priorizar a segurança em vez do crescimento.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-6',
          style: 'blockquote',
          children: [
            {
              _type: 'span',
              _key: 'span-16',
              text: 'As crenças limitantes são como freios invisíveis que impedem você de acelerar em direção aos seus sonhos.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-7',
          style: 'normal',
          listItem: 'bullet',
          children: [
            {
              _type: 'span',
              _key: 'span-17',
              marks: ['strong'],
              text: '"Melhor não arriscar"'
            },
            {
              _type: 'span',
              _key: 'span-18',
              text: ': Evita o fracasso, mas também o sucesso.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-8',
          style: 'normal',
          listItem: 'bullet',
          children: [
            {
              _type: 'span',
              _key: 'span-19',
              marks: ['strong'],
              text: '"Agora não é o momento"'
            },
            {
              _type: 'span',
              _key: 'span-20',
              text: ': Adia seus sonhos indefinidamente.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-9',
          style: 'normal',
          listItem: 'bullet',
          children: [
            {
              _type: 'span',
              _key: 'span-21',
              marks: ['strong'],
              text: '"Quem sou eu pra isso?"'
            },
            {
              _type: 'span',
              _key: 'span-22',
              text: ': Mina sua autoconfiança.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-10',
          style: 'h3',
          children: [
            {
              _type: 'span',
              _key: 'span-23',
              text: 'O Perigo de Se Contentar com Pouco'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-11',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span-24',
              text: 'Quando você aceita '
            },
            {
              _type: 'span',
              _key: 'span-25',
              marks: ['em'],
              text: '"apenas pagar as contas"'
            },
            {
              _type: 'span',
              _key: 'span-26',
              text: ' como suficiente, sua versão milionária perde força. Cada dia conformado é um passo para trás. A boa notícia? Essa versão ainda está aí, esperando uma decisão sua para voltar à ativa.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-12',
          style: 'h3',
          children: [
            {
              _type: 'span',
              _key: 'span-27',
              text: 'Coragem: O Ingrediente que Falta'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-13',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span-28',
              text: 'Planejar é importante, mas sem '
            },
            {
              _type: 'span',
              _key: 'span-29',
              marks: ['strong'],
              text: 'coragem'
            },
            {
              _type: 'span',
              _key: 'span-30',
              text: ', seus planos ficam no papel. Coragem é o que transforma sonhos em realidade. É o que faz você silenciar as desculpas, enfrentar o medo e agir, mesmo com incertezas.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-14',
          style: 'h3',
          children: [
            {
              _type: 'span',
              _key: 'span-31',
              text: 'Desperte Sua Mentalidade Milionária'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-15',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span-32',
              text: 'A escolha é sua: continuar preso às desculpas ou reagir? Sua versão milionária está viva, pronta para liderar. Comece hoje, dê o primeiro passo e construa a mentalidade que te levará ao topo.'
            }
          ]
        }
      ]
    }).commit()
    console.log('✅ Post 1 atualizado')

    // Post 2 - Estabilidade
    await client.patch('blogpost-estabilidade-preco-alto').set({
      body: [
        {
          _type: 'block',
          _key: 'block-0',
          style: 'h2',
          children: [
            {
              _type: 'span',
              _key: 'span-0',
              text: 'Estabilidade: Segurança ou Armadilha?'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span-1',
              text: 'Você se sente seguro na sua zona de conforto? Talvez essa '
            },
            {
              _type: 'span',
              _key: 'span-2',
              marks: ['strong'],
              text: '"estabilidade"'
            },
            {
              _type: 'span',
              _key: 'span-3',
              text: ' que você tanto defende seja apenas medo disfarçado. Acomodar-se pode parecer seguro, mas o preço pode ser alto: sua saúde, energia e liberdade.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-2',
          style: 'h3',
          children: [
            {
              _type: 'span',
              _key: 'span-4',
              text: 'Quando a Estabilidade Vira Prisão'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-3',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span-5',
              text: 'Quantas vezes você permaneceu em um trabalho que te esgota, só porque o desconhecido parece mais assustador? A rotina pode ser confortável, mas, aos poucos, ela rouba sua vitalidade e adia seus sonhos.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-4',
          style: 'blockquote',
          children: [
            {
              _type: 'span',
              _key: 'span-6',
              text: 'A verdadeira segurança não vem da estabilidade externa, mas da confiança em sua capacidade de se adaptar e crescer.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-5',
          style: 'h3',
          children: [
            {
              _type: 'span',
              _key: 'span-7',
              text: 'A Verdadeira Razão da Procrastinação'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-6',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span-8',
              text: 'Você adia decisões importantes — uma conversa, uma mudança de carreira, um novo projeto — e culpa a falta de tempo. Mas, no fundo, o que falta é '
            },
            {
              _type: 'span',
              _key: 'span-9',
              marks: ['strong'],
              text: 'coragem'
            },
            {
              _type: 'span',
              _key: 'span-10',
              text: '. Coragem para enfrentar o desconforto e dar o próximo passo.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-7',
          style: 'h3',
          children: [
            {
              _type: 'span',
              _key: 'span-11',
              text: 'Seu Escudo de Desculpas'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-8',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span-12',
              text: 'Para se proteger, você criou um sistema de desculpas que parecem lógicas, mas só te mantêm parado:'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-9',
          style: 'normal',
          listItem: 'bullet',
          children: [
            {
              _type: 'span',
              _key: 'span-13',
              marks: ['em'],
              text: '"Agora não é o momento ideal."'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-10',
          style: 'normal',
          listItem: 'bullet',
          children: [
            {
              _type: 'span',
              _key: 'span-14',
              marks: ['em'],
              text: '"Primeiro, preciso quitar minhas dívidas."'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-11',
          style: 'normal',
          listItem: 'bullet',
          children: [
            {
              _type: 'span',
              _key: 'span-15',
              marks: ['em'],
              text: '"Quando o trabalho estiver mais calmo."'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-12',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span-16',
              text: 'Essas justificativas são um escudo emocional, mas também uma armadilha que te impede de crescer.'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-13',
          style: 'h3',
          children: [
            {
              _type: 'span',
              _key: 'span-17',
              text: 'O Preço da Falsa Segurança'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-14',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span-18',
              text: 'A estabilidade só é valiosa quando não custa sua paz ou seu propósito. Se ela está drenando sua energia ou adiando seus projetos, é hora de questionar: '
            },
            {
              _type: 'span',
              _key: 'span-19',
              marks: ['strong'],
              text: 'vale a pena pagar esse preço?'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-15',
          style: 'h3',
          children: [
            {
              _type: 'span',
              _key: 'span-20',
              text: 'Quebre o Ciclo Hoje'
            }
          ]
        },
        {
          _type: 'block',
          _key: 'block-16',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 'span-21',
              text: 'O problema não está no mundo lá fora, mas na mentalidade que você construiu. Para reconquistar sua liberdade, comece enfrentando pequenos medos. Cada passo corajoso te aproxima da vida que você merece.'
            }
          ]
        }
      ]
    }).commit()
    console.log('✅ Post 2 atualizado')

    console.log('🎉 Conteúdo completo adicionado aos posts!')
    
  } catch (error) {
    console.error('❌ Erro ao atualizar conteúdo:', error)
  }
}

updateFullContent()