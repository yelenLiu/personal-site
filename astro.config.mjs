import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({
  site: process.env.SITE_URL || 'https://yelen-blog.yelen4430.workers.dev',
  integrations: [sitemap()],
  output: 'static',
  trailingSlash: 'always',
});
