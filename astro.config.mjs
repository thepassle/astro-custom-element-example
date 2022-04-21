import { defineConfig } from 'astro/config';
import customElements from 'custom-elements-ssr/astro.js';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [customElements()],
  adapter: netlify(),
});
