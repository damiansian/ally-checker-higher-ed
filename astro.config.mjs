import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  redirects: {
    '/language': '/language/pdf',
    '/text-alternatives': '/text-alternatives/word',
  },
});
