import { defineConfig } from 'astro/config';
import { SITE_URL } from './src/data/business.ts';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
});
