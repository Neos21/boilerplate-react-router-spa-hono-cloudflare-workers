# API

Hono で提供する `/api` 配下の API 契約を示す。各項目の厳密な型とバリデーションは、対応する `shared/types/` と `shared/schemas/` を正とする。


## 共通仕様

- `POST /api/login` を除き、JWT 認証を必要とする
- 正常レスポンスはトップレベルを `result` のみとする
- エラーレスポンスはトップレベルを `error` のみとする
- JSON Body は構文不正と Schema 不正を区別せず、クライアント入力エラーとして 400 を返す
- URL の ID は整数に変換できない場合に 400 を返す
- 想定される Service エラーは `Result` 型で表す

```json
{ "result": {} }
```

```json
{ "error": "エラーメッセージ" }
```


## API エンドポイント一覧

| リソース | メソッド | パス                | 用途                                |
|----------|----------|---------------------|-------------------------------------|
| 認証     | `POST`   | `/api/login`        | パスワードを照合して JWT を発行する |
| サンプル | `GET`    | `/api/examples`     | 一覧を取得する                      |
| サンプル | `GET`    | `/api/examples/:id` | 1件取得する                         |
| サンプル | `POST`   | `/api/examples`     | 追加する                            |
| サンプル | `PATCH`  | `/api/examples/:id` | 更新する                            |
| サンプル | `DELETE` | `/api/examples/:id` | 削除する                            |
