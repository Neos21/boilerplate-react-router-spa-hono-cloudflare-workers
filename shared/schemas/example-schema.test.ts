// Example : スキーマのユニットテスト

import { describe, expect, it } from 'vitest';

import { exampleSchema } from './example-schema';

describe('example スキーマ', () => {
  it('フォーム入力値を正規化する', () => {
    const parsed = exampleSchema.parse({
      id        : 1,
      name      : ' 名前 ',
      memo      : ' 1行目\r\n\r\n\r\n2行目 ',
      is_active : 'true'
    });
    
    expect(parsed).toEqual({
      id        : 1,
      name      : '名前',
      memo      : '1行目\n\n2行目',
      is_active : 1
    });
  });
  
  it('不正なフォーム入力値を拒否する', () => {
    const parsed = exampleSchema.safeParse({
      name      : null,
      memo      : null,
      is_active : 2
    });
    
    expect(parsed.success).toBe(false);
  });
});
