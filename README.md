# Boilerplate : React Router (SPA) + Hono + Cloudflare Workers

React Router (SPA モード) + Hono + Cloudflare Workers プロジェクトのボイラープレート。

サンプルコードには `example`・`examples` の記載がある他、隅付き括弧を用いたプレースホルダを記載している。


## 技術スタック

- フロントエンド : React + React Router (SPA モード)
- UI : Tailwind CSS + daisyUI
- State 管理 : Zustand
- HTTP クライアント : ky
- バリデーション : Zod
- バックエンド : Hono (TypeScript)
- ビルドツール : Vite
- 実行環境 : Cloudflare Workers
- DB : Cloudflare D1 (SQLite)
- 認証 : サンプルプロジェクトのため、環境変数に注入したパスワードと照合して JWT を発行し、LocalStorage に保持する


## 開発の開始

```bash
$ npm install
$ npm run dev
```

開発手順、検証コマンド、D1・デプロイ操作は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照のこと。


## ドキュメント

| ファイル                                               | 役割                                                     |
|--------------------------------------------------------|----------------------------------------------------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md)                   | システム構成、ディレクトリ・レイヤーの責務、データフロー |
| [CONTRIBUTING.md](./CONTRIBUTING.md)                   | 開発手順、検証、開発者が手動で行う運用操作               |
| [docs/README.md](./docs/README.md)                     | 詳細ドキュメントの配置方針と索引                         |
| [docs/features/README.md](./docs/features/README.md)   | 機能別仕様の索引                                         |
| [docs/decisions/README.md](./docs/decisions/README.md) | 重要な設計判断とその理由 (ADR)                           |
| [AGENTS.md](./AGENTS.md)                               | AI エージェントが常に守るルールと詳細ルールへの入口      |
| [TASKS.md](./TASKS.md)                                 | 実行順が必要な未完了タスク                               |

同じ説明を複数ファイルに重複させず、詳細を所有する文書にリンクする。実装固有の処理順や実装意図の説明などは、対象ソースコードのドキュメンテーションコメントを正とする。


## ページ一覧

| パス    | 機能                                                                         |
|-------- |------------------------------------------------------------------------------|
| `/`     | ログイン。ログイン済みの場合は `/home` に遷移する                            |
| `/home` | ログイン後のホーム。共通サイドメニューはこのページへの遷移後に初めて表示する |


## Links

- [Neo's World](https://neos21.net/)
