-- テーブルを新規作成する

CREATE TABLE examples (  -- Example
  id          INTEGER  PRIMARY KEY  AUTOINCREMENT,                         -- ID
  name        TEXT     NOT NULL,                                           -- 必須入力項目
  memo        TEXT,                                                        -- 自由入力項目
  is_active   INTEGER  NOT NULL     DEFAULT 1 CHECK (is_active IN (0, 1))  -- Boolean 相当の項目のサンプル
  created_at  TEXT     NOT NULL     DEFAULT CURRENT_TIMESTAMP,             -- 初回登録日時
  updated_at  TEXT     NOT NULL     DEFAULT CURRENT_TIMESTAMP              -- 最終更新日時
);
