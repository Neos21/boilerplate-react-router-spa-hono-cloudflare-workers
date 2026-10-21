# Common Coding Rules

共通コーディングルール。


## 命名

- ディレクトリ名、ファイル名、クラス名、変数名は単数形と複数形を正確に区別する
- Controller・Service・Repository は複数概念を扱う命名として扱う
- スキーマ・型定義は単数概念を扱う命名として扱う
- 例 : `examples` は複数レコード集合、`example` は単一レコードを表す
- Boolean な変数名は `is`・`has`・`should`・`can`・`needs` のいずれかを必ず接頭辞に使用する。`disabled` のように接頭辞のない変数名は定義してはならない (この場合 `isDisabled` とする)
- イベントハンドラなど領域固有の命名は、対応する詳細ルールに従う
- 命名ルールの具体例
    - リソース名を接尾辞に含むモノ
        - `constants/` : `-constants.ts`
        - `schemas/` : `-schema.ts` (1ファイルから複数 `export` していても単数形) … `const exampleSchema`
        - `services/` : `-service.ts` … `export class` 宣言必須 (関数での `export` 禁止)・クラス名の接尾辞 `Service`
        - `shared/schemas/utilities/` : `-utilities.ts`
        - `server/repositories/` : `-repository.ts` … `export class` 宣言必須 (関数での `export` 禁止)・クラス名の接尾辞 `Repository`
        - `client/stores/` : `-store.ts` … 型は `ExampleState`、ストアは `export const exampleStore` と宣言
        - `client/layouts/` : `-layout.tsx`
    - ディレクトリ名とファイル名を揃えるモノ (サブディレクトリの構造ルールは前述のとおり)
        - `server/routes/`
        - `client/pages/` : ページコンポーネント名は `Example` のようにタイトルケース
    - 特定の接尾辞が不要なモノ
        - `helpers/`
        - `types/` : 型名は `type Example` のようにタイトルケース
        - `client/` における `components/` : `export const` 宣言必須・コンポーネント名は `Example` のようにタイトルケース


## 公開範囲と共有処理

- ファイル外から利用しない型・定数・関数は `export` しない
- 共通化できる処理は Helper または役割を表す Service に切り出す
- 複数レイヤーで使う業務上の上限・下限は、重複したマジックナンバーにせず共有定数に置く


## 言語表現

- 正規表現リテラルは必ず `(/.../)` のようにカッコで囲む
- 文字列の空文字・Null 判定には `isEmpty()` を積極的に使う
- 暗黙型変換を使った `if(!condition)` を避け、`== null` や `=== ''` (`isEmpty()` ヘルパー関数の使用をより推奨)、Boolean な厳密型比較にする
- 変数名・引数名を省略しない。原則として型名やクラス名をそのまま変数名に使用する。どれだけ長くなっても省略せず正確さを優先する
    - × `const repo = new ExamplesRepository();` → ◯ `const examplesRepository = new ExamplesRepository();`
    - × `type Props = { settings: UserSettings; };` → ◯ `type Props = { userSettings: UserSettings; };`
- 定数をアッパースネークケースで書かない。型定義・クラス定義・React コンポーネント名定義のみパスカルケース (`PascalCase`) とし、それ以外はロウワーキャメルケース (`lowerCamelCase`) で統一する
- `default export` は React Router などのフレームワーク都合で必須な場合のみとし、原則使わない
- `function` 定義は `default export` が必要な React コンポーネントのみ許可し、それ以外では使わない。関数定義はアロー関数で行う
    - × `export default exampleHelperFunction() { }` → ◯ `export const exampleHelperFunction = () => { };`
- クラス定義
    - クラス名はタイトルケース (例 : `ExamplesService`・`ExamplesRepository`)
    - `public`・`private` のアクセス修飾子を必ず書く
    - フィールド → コンストラクタ → メソッドの順に書く
    - フィールドは可能な限り `readonly` を書く
    - 空のコンストラクタの場合は `{ }` とブレース記号の中にスペースを1つ入れる (空のオブジェクトの宣言 `{}` と区別するため)
    - メソッドは `public` 群 → `private` 群の順に書く
        - Repository や Service の場合、SELECT → INSERT → UPDATE → DELETE に相当する順番で `public` メソッドを並べる。`private` メソッドは `public` メソッド群での登場順に置く
    - `static` の使用は禁止
    - よって、`public` フィールド → `private` フィールド → `public` メソッド → `private` メソッドの順に書く
- セミコロンを書くべき場所 (忘れやすいモノ)
    - 型定義の後 : × `type Props = { name: string; }` → ◯ `type Props = { name: string; };`
    - オブジェクトで表現する型の最後のプロパティ : × `type Props = { name: string; age: number };` → ◯ `type Props = { name: string; age: number; };`
- 「ケツカンマ」は禁止
    - × `const array = [1,2,3,];` → ◯ `const array = [1, 2, 3];`
    - × `const object = { name: 'Name', age: 20, };` → ◯ `const object = { name: 'Name', age: 20 };`
- オプション引数、デフォルト引数はなるべく定義しない。冗長になってでも、関数の利用側が明示的に記述する


## 可読性

- コメントの書き方
    - 「それが何であるか (What)」を先に書き、「・」や「 : 」で繋いだ後ろに用途や変更タイミングなど詳細を書く。1行で収まらない場合は無理に1行にせず複数行で書く
        - × `// ログイン認証後に発行する有効期限を設けたユーザ ID を内包する JWT` (「JWT である」ことが最後に書かれている) → ◯ `// 登録ユーザ用 JWT : ログイン認証が成功したら発行する・有効期限は90日に設定` (まず「JWT である」ことを先に示し、補足情報を後ろに書く)
    - コメント内で句点「。」は使用しない
    - 必ずドキュメンテーションコメントを書く場所
        - `export` するモノ
    - なるべくドキュメンテーションを書くべき場所
        - オブジェクトのプロパティ単位
        - ローカル変数
    - ドキュメンテーションコメントにしなくていい場所
        - `useState` の宣言場所 : 変数が配列で渡され、ドキュメンテーションコメントが難しいので省略して良い。行末に単一行コメントで示す
- 空行を開ける
    - 異常終了等での早期 `return` 直後、`continue` や `break` など処理の流れが変わるコードの直後。異常系の記述が終わり正常系に戻る部分などで空行が欲しい
    - 意味ごとにブロックを区切る : 生の入力データの変数宣言 → Zod パースとパースエラーによる早期 `return` → `try` 句の始まり、リクエスト処理 → 結果データの検証とエラー時の早期 `return` → 正常データの返却、というように段落を見えるようにしたい
- コメントやドキュメンテーションにおいて、D1・R2・Hono など、特定のサービス名やライブラリ名を説明に多用しない
    - DB・オブジェクトストレージ・バックエンド、のように特定の技術名称に依存しない、汎用的な表現を原則とする
    - 例えば「`batch()` メソッドを使用している」ことの説明のために、「D1 が提供する `batch()`」のように名称を持ち出すことは問題ない
    - `hono/cookie`・`hono/jwt`・`hono/utils/crypto` など、特定の処理において自前実装ではなくライブラリを利用していることを説明する場合は「Hono」と書くことは問題ない
    - 使用サービスやライブラリを別のモノに差し替えた場合も、変更範囲が小さく済むようにするため


## 空白による整列

- Markdown テーブルやソースコードに意図的な空白がある場合は、区切り文字や値の垂直位置を揃えた既存の表現を維持する
- 新しく同様の記述を加える場合も、`|`、`:`、値などが縦に揃うよう、可能な範囲で空白を調整する
- 日本語など文字幅の異なる文字を含み完全な整列が難しい場合は、厳密な一致を必須とせず、人間が読みやすくなる範囲で調整する
- 対象外の整形や、意図的な整列用空白を除去する一括 Formatter は実行しない

```markdown
| Example   | Table |
|-----------|-------|
| Text      | Foo   |
| Text Text | Hoge  |
```

```typescript
const exampleObject = {
  foo     : 1,
  piyo    : 2,
  hogefuga: 3
};
```
