import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'logo-upload-middleware',
        configureServer(server) {
          server.middlewares.use('/api/upload-logo', (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', () => {
                try {
                  const data = JSON.parse(body);
                  if (data.image && data.image.includes('base64,')) {
                    const base64Data = data.image.split('base64,')[1];
                    const buffer = Buffer.from(base64Data, 'base64');
                    fs.writeFileSync(path.resolve(__dirname, 'public/thow_logo_trimmed.png'), buffer);
                    fs.writeFileSync(path.resolve(__dirname, 'public/logo.png'), buffer);
                    fs.writeFileSync(path.resolve(__dirname, 'public/thow_logo_transparent.png'), buffer);
                  }
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true }));
                } catch {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: 'Failed to save logo' }));
                }
              });
            } else {
              res.statusCode = 404;
              res.end();
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
