import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        gastro: resolve(__dirname, 'gastro.html'),
        fashion: resolve(__dirname, 'fashion.html'),
        pos: resolve(__dirname, 'pos.html'),
        drive: resolve(__dirname, 'drive.html'),
        business: resolve(__dirname, 'business.html'),
        terminos: resolve(__dirname, 'terminos.html'),
        privacidad: resolve(__dirname, 'privacidad.html'),
        cookies: resolve(__dirname, 'cookies.html'),
        avisoLegal: resolve(__dirname, 'aviso-legal.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true
  }
});
