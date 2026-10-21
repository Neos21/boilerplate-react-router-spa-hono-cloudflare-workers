# Client Rules

`client/` を変更する場合に適用する。


## コンポーネントの記述

- コンポーネントの Props は、コンポーネントと同ファイル内に `type Props` で定義する (`Props` の名称は固定・別名にしない)
- コンポーネント内の変数宣言の順番 : それぞれのブロックで空行を設けて分かりやすくする
    - `useParams`・`useLocation`・`useNavigate` などのフック宣言
    - Store の利用宣言
    - `useState` での状態管理の宣言
    - `useRef` での参照の宣言
        - `useRef` に連動させる処理の `useEffect`
    - 初期表示時に必要なローカル変数 : `useParams` から取得したパラメータの宣言など
    - 初期表示時に実行する処理を書く `useEffect` (依存配列ゼロのモノ)
    - 初期表示時と以降で共通利用する関数 : `onLoad` など
    - 共通利用する関数を初期表示時に実行する `useEffect` (依存配列が限りなく少ないモノ)
    - その他のタイミングで利用されるローカル変数 (なるべくない方が良い)
    - イベントに応じて呼び出す関数 : `onSubmit` など


## State と画面状態

- 既存 State から導出できる表示状態のために、重複した State を追加しない
- `useState` は行末コメントで用途と `null`・空文字などの特殊状態を示す
- 初期読込中も入力欄の位置と見た目を維持する場合は、スピナーへの置換や `disabled` のグレーアウトを避け、空の入力欄を `readOnly` で表示する
- 入力欄の位置をずらしたくない可変メッセージは入力欄より後に置く
- 他画面で採用されていない Hook を Lint 回避だけのために導入せず、既存画面の実装パターンを優先する


## 遷移

- アプリ内遷移は React Router の `useNavigate()` を使う。生の `a` 要素でリンクを作らない


## イベントと API

- イベントハンドラは `onSubmit`・`onLoadFoo`・`onChangeBar` のように `on` を接頭辞にする
- `handleHoge` 系の命名を使わない
- UX で発火するフォーム送信は `react` から Type Import した `SubmitEvent` を使い、`FormEvent` は使わない
- 入力バリデーションには `shared/schemas/` の Zod スキーマを使い、空文字チェックには `isEmpty()` を使う
- `ky` の `json<T>()` は `json<Result<Array<Example>>>()` のように記述する
- オブジェクトの型引数の末尾には必ずセミコロンを付ける (例 : `{ name: string; age: number; }` ← `number` の後ろのセミコロンが省略されやすいため注意)
- API 呼び出しの例外は `try`・`catch` の中に閉じ込め、Promise の `.then()`・`.catch()` を使わない


## JSX とレイアウト

- 条件付き JSX は `{condition && ( ... )}` のように JSX 部分をカッコで囲み、改行・インデントする
- `aria-*` 属性と `role` 属性は使用しない
- マージンは下方向に付与し、上方向のマージンは使用しない
- JSX は必ずカッコ `()` で囲む。単一行に無理して書かず、HTML 構造が分かるように改行を入れる
    - × `<Component button={<button>ボタン</button>} />` → ◯ `<Component button={(<button>ボタン</button>)} />`
- 条件に応じて表示する JSX を切り替える場合も、コンポーネントの `return` はなるべく1つに集約する
    - 特にページコンポーネントの場合はルート HTML 要素が条件に応じて変わったりしないようにするため、1つに集約する
    - ごく小さなコンポーネントであれば許容する

```tsx
// × なるべく避けるべき書き方 : JSX の `return` が複数ある (空行もない)
export const BadExample = (): ReactElement => {
  if(isLoading) return (
    <div>Loading...</div>
  );
  if(hasError) return (
    <div>Error</div>
  );
  return (
    <div>Succeeded</div>
  );
};

// ◯ できるだけ `return` は単一に保つ (空行も設ける) → この場合、トップレベルは `section` 要素で固定できている
export const GoodExample = (): ReactElement => {
  return (
    <section>
      {isLoading && (
        <div>Loading...</div>
      )}
      
      {hasError && (
        <div>Error</div>
      )}
      
      {!isLoading && !hasError && (
        <div>Succeeded</div>
      )}
    </section>
  );
};
```
