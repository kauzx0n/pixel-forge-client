import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
 plugins: [
   react(),
   VitePWA({
     registerType: 'autoUpdate',
     includeAssets: [
       'favicon.svg',
       'favicon.ico',
       'apple-touch-icon.png',
     ],
     manifest: {
       name: 'pixel forge client',
       short_name: 'pixel forge client',
       description: 'O GameHub é uma aplicação mobile-first com uma interface premium em Dark Mode e detalhes iluminados. Desenvolvido para jogadores que desejam acompanhar seu desempenho, gerenciar suas contas e competir com amigos, o aplicativo entrega uma experiência fluida e imersiva, fortemente inspirada no ecossistema de plataformas como a Steam.',
       theme_color: '#A83EE5',
       background_color: '#27282B',
       display: 'standalone',
       icons: [
         {
           src: 'icons/icon-192x192.png',
           sizes: '192x192',
           type: 'image/png',
         },
         {
           src: 'icons/icon-512x512.png',
           sizes: '512x512',
           type: 'image/png',
         },
       ],
     },
   }),
 ],
});




