# Shared Rules

`shared/` を変更する場合に適用する。


## 型の分類

`shared/types/` は次の分類を維持する。

- `utilities/` : Result、Boolean 制御などの汎用型
- `entities/` : DB テーブルと対になる型。テーブル別に作成する
- `app/` : 画面・API・業務ロジックで使う合成型


## スキーマ

- 入力バリデーションは `server/`・`client/` で共有する Zod スキーマを使う
- オブジェクトは通常の `z.object()` で定義する。`strictObject()` は使わず、未知のプロパティは拒否せずパース結果から除去する
- 空文字チェックが必要な場合は `isEmpty()` を使い、個別に `== null` や `=== ''` などを重複させない
- 業務上の上限・下限は共有定数を参照する
- 必須入力を表す `.min(1)` の `1` は定数化せずスキーマに直接記述する
- 更新用スキーマは、対象操作で変更を許可する項目だけに限定する
- オブジェクト全体の定義以外の各検証には、可能な限り `error` を指定して `zodErrorMessages` を活用する
- 正の数の検証は `.positive()` ではなく `.min(1)` を使う


## Helper と Service

- 業務知識を持たない整形・判定処理は `shared/helpers/` に置き、Helper は `export const` で関数を定義する
- `server/`・`client/` の両方で使うビジネスロジックは `shared/services/` に置き、Service は `export class` で定義する
- SQL、画面、Server Service に同じビジネスロジックを重複実装しない
- 計算途中の値と表示用の丸めを分離する
