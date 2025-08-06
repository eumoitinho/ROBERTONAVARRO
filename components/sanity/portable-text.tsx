import { PortableText as PortableTextComponent } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/client'

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="relative w-full h-96 my-8">
          <Image
            alt={value.alt || ' '}
            src={urlFor(value).url()}
            fill
            className="object-cover rounded-lg"
          />
          {value.caption && (
            <p className="text-center text-sm text-gray-600 mt-2">
              {value.caption}
            </p>
          )}
        </div>
      )
    },
    code: ({ value }: any) => {
      return (
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
          <code className="text-sm">{value.code}</code>
        </pre>
      )
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a href={value.href} rel={rel} className="text-blue-600 hover:underline">
          {children}
        </a>
      )
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-6 mb-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-4 mb-2">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl font-bold mt-3 mb-2">{children}</h4>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => <p className="mb-4">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside mb-4">{children}</ol>,
  },
}

export function PortableText({ value }: { value: any }) {
  return <PortableTextComponent value={value} components={components} />
}