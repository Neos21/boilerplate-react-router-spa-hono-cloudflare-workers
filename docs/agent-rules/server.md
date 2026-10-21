# Server Rules

`server/` を変更する場合に適用する。


## Repository と Service

- DB の CRUD は `server/repositories/` 配下にテーブル別の Repository として実装する。基本的には1クラスが1テーブルのみの CRUD を担当するが、複数テーブルの結合が必要になる場合は開発者に確認のうえ、ユースケース別の Repository を作ることも許容する
- Repository のコンストラクタには `context.env.DB` のみを渡す
- Repository のファイル名とクラス名は複数形で一致させる
    - 例 : `examples-repository.ts`・`ExamplesRepository`
- Repository のメソッド名は `findAll`・`findById`・`create`・`update` など、一覧取得と単体操作を区別する
- Repository は `Result` 型や Boolean を返さず、`exists()` などの判定処理が混ざるような関数を設けない。存在判定など取得データに基づく処理が必要な場合は行を取得し、Service で判断する
- `update` は変更を許可しない関連先 ID などを更新対象に含めない
- 複数テーブルを横断する Read Model の取り扱いやビジネスロジック、エラーの意味づけ、データの型変換などは `server/services/` に置く
- サーバ内部だけで使う JOIN 行などの型は `server/types/` に置く
- SQL と Batch の実行は Repository に集約する。Service に SQL を書かず、Service から Repository に SQL 文字列を渡さない
- サーバ内部だけで使う取得行の型は、SELECT・RETURNING の実際の取得列に合わせて `server/types/` に定義する。公開型と DB 行型を混同せず、管理向けの型を一般向けの内部行型の代用品にしない
- Hono の `Bindings` と `Variables` は `HonoBindings` に集約し、Route 固有の Environment 型を作らない


## 複数書き込み

- SQL は可能な限り静的に記述する。条件による SQL 断片の追加・除去や過剰な共通化を避け、必要な繰り返しは許容する
- 1件のみ取得する SQL には `LIMIT 1` を記述する
- SQL のテーブル名は `t` 等に省略せず、`SELECT`・`RETURNING` のカラムを明記する
- `RETURNING` は必要な戻り値の列だけを書く。戻り値を使わない操作には付けない
- SELECT・RETURNING の取得には、実際の取得列と一致する行型のジェネリクスを指定する。行を返さない `run()` には指定しなくて良い
- 複数テーブルへの作成・更新を不可分にする必要がある場合は D1 の `batch()` を使う
- 複数の作成・更新を不可分にする必要がある場合は Repository 内で D1 の `batch()` を使う。途中失敗時に、一部だけが作成・更新された状態を残さない
- Batch の実行順や結果の添字、異なる行型を含む結果の解釈は Repository 内に閉じ込め、Service には必要なデータを名前付きで返す


## 想定されるエラー

- 想定されるエラーに例外オブジェクト、`throw`、`onError` Middleware を使わない
- `shared/types/utilities/result.ts` の `Result` 型を使い、Controller で正常・異常レスポンスを明示的に分岐する


## Route Controller

- Route は HTTP の責務に限定し、DB クエリやビジネスロジックを直接持たない
- `context.req.json()` は `await context.req.json().catch(() => null)` で受ける
- `body == null` の場合は 400 エラーを返す
- JSON ボディの構文不正とスキーマ不正を区別せず、いずれもクライアント入力エラーとして 400 を返す
- 正常レスポンスはトップレベルを `result` のみ、エラーレスポンスはトップレベルを `error` のみとする
- 正常レスポンスの `context.json()` には `Result<Example>` などのジェネリクスを指定し、クライアントの `ky.post().json<Result<Example>>()` と型を対応させる。`error` を返す場合はジェネリクスを指定しない
- ルートパス文字列に `/:id` のようなコロンを含む場合は、`// eslint-disable-line neos-eslint-plugin/comment-colon-spacing` を付ける
- URL の ID は整数に変換できない場合に 400 を返す
- ID・Query・Body は Route で検証し、DB 状態を伴う業務条件は Service でも検証する
