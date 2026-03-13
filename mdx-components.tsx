import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

function ToolCallout({ tool, description, url }: { tool: string; description: string; url: string }) {
  return (
    <div className="bg-cream rounded-[16px] p-6 my-6 border border-gray-100">
      <p className="text-[12px] font-semibold text-sage tracking-[0.06em] uppercase mb-2">Free Tool</p>
      <p className="font-serif text-[18px] tracking-[-0.01em] mb-2">
        <Link href={url} className="text-sage hover:underline">{tool}</Link>
      </p>
      <p className="text-[14px] text-gray-500 leading-[1.6]">{description}</p>
    </div>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto">
        <table {...props}>{children}</table>
      </div>
    ),
    ToolCallout,
    ...components,
  }
}
