import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { dirname, resolve } from 'path';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import dts from 'vite-plugin-dts';

const require = createRequire(import.meta.url);
const spellcheckLicenses = [
  resolve(__dirname, 'node_modules/dictionary-ru/license'),
  resolve(__dirname, 'node_modules/dictionary-en/license'),
  resolve(__dirname, 'node_modules/nspell/license'),
  resolve(dirname(require.resolve('is-buffer', {
    paths: [resolve(__dirname, 'node_modules/nspell')]
  })), 'LICENSE')
].map(file => readFileSync(file, 'utf8')).join('\n\n');

export default defineConfig({
  base: './',
  worker: {
    rollupOptions: {
      output: { banner: `/*!\n${spellcheckLicenses}\n*/` }
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'sep-yui',
      fileName: format => (format === 'es' ? 'sep-yui.mjs' : 'sep-yui.umd.cjs')
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.includes('-')
        }
      }
    }),
    dts({
      insertTypesEntry: true
    })
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    alias: {
      'dictionary-ru': resolve(__dirname, 'node_modules/dictionary-ru'),
      'dictionary-en': resolve(__dirname, 'node_modules/dictionary-en'),
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/scss/_variables.scss" as *;
          @use "@/assets/scss/_mixins.scss" as *;
        `
      }
    }
  }
});
