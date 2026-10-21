# Architecture

本プロジェクトの現行実装におけるシステム構成、依存方向、各レイヤーの責務を示す。


## システム構成

```text
Browser → React SPA → `/api` への HTTP リクエスト → Cloudflare Workers + Hono → Cloudflare D1 (SQLite)
```

- React Router を SPA モードで利用し、画面遷移とログイン後の共通レイアウトを構成する
- Hono の `/api` 配下に認証・各リソースのルートを登録する
- Cloudflare Workers の Binding から D1 と環境変数を参照する


## ディレクトリの責務

| ディレクトリ           | 責務                                          |
|------------------------|-----------------------------------------------|
| `shared/constants/`    | Server・Client で共通利用する定数             |
| `shared/helpers/`      | Server・Client で共通利用する処理             |
| `shared/schemas/`      | Server・Client で共通利用する Zod スキーマ    |
| `shared/types/`        | Server・Client で共通利用する型定義           |
| `shared/services/`     | Client・Server で共通利用するビジネスロジック |
| `shared/constants/`    | サーバ内部だけで使う定数                      |
| `shared/helpers/`      | サーバ内部だけで使う共通処理                  |
| `server/types/`        | SQL 行など、サーバ内部だけで使う型            |
| `server/routes/`       | ルーティングコントローラ                      |
| `server/services/`     | ビジネスロジック                              |
| `server/repositories/` | DB に対する CRUD                              |
| `client/constants/`    | クライアント内部だけで使う定数                |
| `client/helpers/`      | クライアント内部だけで使う共通処理            |
| `client/stores/`       | Zustand ストア                                |
| `client/layouts/`      | レイアウトコンポーネント                      |
| `client/pages/`        | ページコンポーネント                          |
| `client/components/`   | 複数画面で利用するコンポーネント              |
| `public/`              | 静的アセット                                  |
| `migrations/`          | DB 操作するためのマイグレーション SQL         |


## 依存方向

```text
server ┐
       ├─> shared
client ┘

server/routes   -> server/repositories (単一テーブルの単純な CRUD)
server/routes   -> server/services     (複合テーブル・ユースケース)
server/services -> server/repositories
server/services -> shared/services
```

- `shared/` は `server/`・`client/` に依存しない
- `client/`・`server/` はそれぞれ `shared/` への依存はできる。`client/` と `server/` は互いに依存しない

### サーバサイドにおけるルーティングコントローラの配置

- `server/index.ts` に Hono のエントリポイントが宣言されている
- `server/routes/` 配下にルーティングコントローラのファイルを配置するが、このディレクトリ以下は「ディレクトリ階層 = API パス」で一致するようにする
- よって各種 API は `server/routes/api/` 配下に配置され、実質的なエントリポイントは `server/routes/api/api.ts` となる

### クライアントにおけるコンポーネントの配置

- `client/pages/` 配下に「ページコンポーネント」を配置するが、このディレクトリ以下は「ディレクトリ階層 = `client/routes.ts` で定義したページパス」で一致するようにする
- `client/routes.ts` で定義しているページコンポーネントは React Router の仕様上 `default export` が必須なため `function Example(): ReactElement` で定義するが、コンポーネントは `export const Example = (): ReactElement => {};` で定義する
- 複数ページで共通利用するコンポーネントは `client/components/` 配下に配置する
    - 1つのコンポーネントが内部的に複数コンポーネントに分けて実装している場合、`client/components/example/` とサブディレクトリを作成し、内部的なコンポーネントは `client/components/example/components/` ディレクトリへと隠蔽する
- 1ページでのみ利用するコンポーネントは `client/pages/` 配下に `components/` ディレクトリを作って配置する (例 : `client/pages/index/components/example.tsx` のような階層)
    - ヘルパー関数についても1ページでのみ利用するモノは `client/pages/` 配下に `helpers/` ディレクトリを作り、`client/helpers/` 直下を肥大化させないようにして良い


## 横断的な設計

- 整合性はサーバ側で保証し、不可分な複数書き込みは一つのユースケースとして扱う

各領域の具体的な実装規則は [Agent Rules](./docs/agent-rules/README.md) を参照のこと。
