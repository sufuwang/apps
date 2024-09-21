import remarkGfm from 'remark-gfm'
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.16personalities.com',
        port: '',
        pathname: '/static/images/**',
      },
    ],
  }
}

const withMDX = createMDX({
  // 添加 markdown 插件
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
