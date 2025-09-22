import { Hono } from 'hono';

const app = new Hono();

app.get('/api', context => context.json({ message: 'Hello API' }));

// `wrangler.jsonc` や `vite.config.ts` で指定しているエントリファイルなので `export default` でエクスポートする
export default app;
