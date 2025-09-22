import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import serverAdapter from 'hono-react-router-adapter/vite';
import cloudflareAdapter from '@hono/vite-dev-server/cloudflare';

export default defineConfig({
  plugins: [
    // React Router v7 を Vite で動作させるプラグイン
    reactRouter(),
    // Hono と React Router v7 を Vite 内で統合させるプラグイン
    serverAdapter({
      // `wrangler.jsonc` で指定した Bindings を取り込めるようにするアダプタ
      adapter: cloudflareAdapter,
      // Hono サーバのエントリポイント
      entry: './server/index.ts'
    })
  ]
});
