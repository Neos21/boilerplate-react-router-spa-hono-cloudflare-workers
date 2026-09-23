// Example : Hono インスタンスごとのユニットテスト

import { sign } from 'hono/jwt';
import { describe, expect, it, vi } from 'vitest';

import { examples } from './examples';

import type { Example } from '../../../../shared/types/entities/example';
import type { HonoBindings } from '../../../types/hono-bindings';

describe('examples API', () => {
  it('認証済みの一覧取得リクエストに一覧データを返す', async () => {
    const expectedExamples: Array<Example> = [
      {
        id        : 1,
        name      : '名前',
        memo      : null,
        is_active : 1,
        created_at: '2026-01-01 00 : 00 : 00',
        updated_at: '2026-01-02 00 : 00 : 00'
      }
    ];
    const all = vi.fn().mockResolvedValue({ results: expectedExamples });
    const prepare = vi.fn().mockReturnValue({ all });
    const adminJwtSecret = 'test-admin-jwt-secret';
    const bindings = {
      DB: { prepare } as unknown as D1Database,
      ADMIN_PASSWORD: 'test-admin-password',
      ADMIN_JWT_SECRET: adminJwtSecret
    } satisfies HonoBindings;
    const token = await sign({ exp: Math.floor(Date.now() / 1000) + 60 }, adminJwtSecret, 'HS256');
    
    const response = await examples.request('/', {
      headers: { Authorization: `Bearer ${token}` }
    }, bindings);
    
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ result: expectedExamples });
    expect(prepare).toHaveBeenCalledOnce();
    expect(all).toHaveBeenCalledOnce();
  });
});
