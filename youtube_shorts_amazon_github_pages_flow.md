# YouTube Shorts × Amazonアフィリエイト × GitHub Pages 構築メモ

## 1. 目的

YouTube
ShortsでAmazonアフィリエイト商品を紹介し、Shortsからプロフィール経由で商品一覧サイトへ誘導してAmazonへ送客する。

基本導線：

``` text
YouTube Shorts
    ↓
「Products in my bio」などで誘導
    ↓
YouTubeチャンネルのプロフィールリンク
    ↓
GitHub Pagesの商品一覧サイト
    ↓
商品ページ / 商品一覧
    ↓
Amazon.com
    ↓
購入
```

------------------------------------------------------------------------

## 2. Shortsの概要欄について確認したこと

YouTube
Shortsでは、Shortsの説明欄・コメントに記載した外部URLをクリック可能なリンクとして使うことはできない。

そのため、

``` text
Shorts
↓
概要欄のAmazonリンク
```

という直接導線ではなく、

``` text
Shorts
↓
プロフィール
↓
自分のサイト
↓
Amazon
```

という導線を使う。

YouTubeチャンネルのプロフィールには複数のリンクを掲載できるため、商品一覧サイトを主要リンクとして設定する。

------------------------------------------------------------------------

# 3. 商品一覧サイトを作る方針

100〜1000商品を扱う場合、商品ごとにHTMLを作るのではなく、

``` text
index.html
style.css
app.js
products.json
```

という構成にする。

商品情報は `products.json` にまとめる。

これにより、100商品でも1000商品でもHTMLを大量に作り直す必要がない。

------------------------------------------------------------------------

# 4. 推奨サイト構成

トップページ：

``` text
BEST FINDS USA

Products featured in our YouTube Shorts

[Trending]
[Tech]
[Home]
[Kitchen]
[Gaming]
[Fashion]
[Travel]
...

🔥 Trending now

[商品]
[商品]
[商品]
[商品]

💻 Tech

[商品]
[商品]
[商品]

🏠 Home

[商品]
[商品]
[商品]
```

スマホユーザーを中心に考える。

------------------------------------------------------------------------

# 5. 商品データ

`products.json` に以下の情報を持たせる。

``` json
{
  "id": "001",
  "title": "Portable Blender",
  "price": "$29.99",
  "category": "Kitchen",
  "tags": "blender portable smoothie gadget",
  "image": "YOUR_ALLOWED_IMAGE_URL",
  "amazon": "YOUR_AMAZON_ASSOCIATES_SPECIAL_LINK",
  "featured": true,
  "shorts": ["short-001"]
}
```

主な項目：

-   `id`：商品固有ID
-   `title`：商品名
-   `price`：表示価格
-   `category`：カテゴリ
-   `tags`：検索用キーワード
-   `image`：商品画像
-   `amazon`：Amazon AssociatesのSpecial Link
-   `featured`：トップのFeatured表示
-   `shorts`：どのShortsで紹介したか

------------------------------------------------------------------------

# 6. Shortsごとの商品表示

今回のサイトではURLパラメータを使う。

例えば：

``` text
https://YOUR-SITE/?p=short-001
```

とすると、

``` json
"shorts": ["short-001"]
```

を持つ商品をまとめて表示できる。

例えば1本のShortsで5商品を紹介した場合、5商品のデータすべてに、

``` json
"shorts": ["short-001"]
```

を設定する。

すると、

``` text
Shorts
↓
プロフィール
↓
? p=short-001
↓
その動画の商品5個
↓
Amazon
```

という導線を作れる。

------------------------------------------------------------------------

# 7. Shortごとの導線

Shorts動画：

> 5 Amazon gadgets you didn't know you needed 🤯

動画内：

``` text
#1 Product A
#2 Product B
#3 Product C
#4 Product D
#5 Product E
```

動画・プロフィールでは、

> Get all 5 products in my bio 👆

などと誘導する。

リンク先：

``` text
https://YOUR-SITE/?p=short-001
```

サイト：

``` text
🔥 Products from this video

Product A
[View on Amazon]

Product B
[View on Amazon]

Product C
[View on Amazon]

Product D
[View on Amazon]

Product E
[View on Amazon]
```

これにより、1本のShortsから複数商品へ送客できる。

------------------------------------------------------------------------

# 8. GitHub Pages

GitHub Pagesでサイトを無料公開する。

基本ファイル：

``` text
amazon-finds/
├── index.html
├── style.css
├── app.js
├── products.json
├── .nojekyll
└── README.md
```

GitHubでPublic repositoryを作成し、ファイルをアップロード。

その後：

``` text
Repository
↓
Settings
↓
Pages
↓
Deploy from a branch
↓
main
↓
/ (root)
↓
Save
```

で公開する。

最初はGitHub
PagesのURLでテストし、アクセスやクリックが確認できてから独自ドメインを検討する。

------------------------------------------------------------------------

# 9. 今回作成したテンプレート

作成済みファイル：

-   `index.html`
-   `style.css`
-   `app.js`
-   `products.json`
-   `.nojekyll`
-   `README.md`

ZIP：

`best-finds-usa-github-pages.zip`

このテンプレートには以下を実装済み。

-   スマホ対応
-   商品検索
-   カテゴリ絞り込み
-   Featured商品
-   商品追加
-   Shortsごとの商品表示
-   `?p=001` / `?p=short-001` 形式
-   Amazonリンク
-   Google Analytics用イベント
-   GitHub Pages対応
-   100〜1000商品へ拡張可能

------------------------------------------------------------------------

# 10. Amazonリンク

`products.json` の：

``` json
"amazon": "https://www.amazon.com/"
```

を、自分のAmazon AssociatesのSpecial Linkに変更する。

Amazonの商品ページを単純にスクレイピングして商品画像・価格などを大量取得する方法は避ける。

Amazon Associatesの現行ルールを確認し、許可されたProgram
ContentやAmazonが提供するAPI・ツールを利用する。

------------------------------------------------------------------------

# 11. 商品画像について

Amazonの商品画像を勝手にコピーしてGitHubリポジトリへ大量保存する方式は避ける。

画像を利用する場合は、Amazon
Associatesの現行ルールに適合する方法を使う。

商品データを自動取得する仕組みにする場合も、現在のAmazonのAPI・Creators
API等の最新仕様を確認してから実装する。

------------------------------------------------------------------------

# 12. Google Analytics

サイトではAmazonクリックを計測できる構造にしている。

イベント名：

``` text
amazon_click
```

イベントには、

``` text
product_id
product_name
category
```

を送る。

これによって、

``` text
Product A → 123クリック
Product B → 87クリック
Product C → 12クリック
```

のように、どの商品がクリックされているか分析できる。

Google AnalyticsのMeasurement IDを `index.html` の

``` text
G-XXXXXXXXXX
```

から自分のIDへ変更する。

------------------------------------------------------------------------

# 13. 今後追加すると強い機能

次の段階では以下を追加すると、かなり実運用しやすくなる。

### 商品管理

-   CSVから100〜1000商品を一括登録
-   商品カテゴリ一括変更
-   Amazonリンク一括更新
-   Featured商品の一括変更

### Shorts管理

-   Shorts IDと商品を紐付け
-   Shortごとの商品ページ
-   「この動画の商品」ページ
-   Shortごとのクリック数

### 分析

-   商品クリックランキング
-   カテゴリ別クリック率
-   Short別クリック数
-   人気商品のランキング

### サイト改善

-   商品詳細ページ
-   関連商品
-   Trendingランキング
-   Search
-   Category pages
-   SEO用タイトル・description
-   独自ドメイン

------------------------------------------------------------------------

# 14. 最終的に目指す構成

``` text
                    YouTube Shorts
                          │
                          │
                 「Products in bio」
                          │
                          ▼
                 YouTube Profile
                          │
                          ▼
                 GitHub Pages Site
                          │
              ┌───────────┴───────────┐
              │                       │
              ▼                       ▼
        Short専用ページ          カテゴリ一覧
              │                       │
              ▼                       ▼
        紹介商品5〜10個          100〜1000商品
              │
              ▼
        Amazon Special Link
              │
              ▼
             Amazon
              │
              ▼
           Purchase
```

重要なのは、1000商品をトップページに全部見せることではない。

**Shortsを見たユーザーが、その動画で紹介された商品を最短で見つけられること**を優先する。

------------------------------------------------------------------------

# 15. 現時点でのおすすめ運用

最初から1000商品を登録する必要はない。

まず：

``` text
商品：50〜100個
Shorts：20〜50本
```

程度でテスト。

見る数字：

``` text
Shorts再生数
↓
プロフィール訪問
↓
サイト訪問
↓
商品クリック
↓
Amazonクリック
↓
購入
```

クリックされるカテゴリ・商品・Shorts形式を特定する。

その後、反応の良いカテゴリーの商品を増やして1000商品規模へ拡張する。

------------------------------------------------------------------------

# 16. 特に重要な戦略

単純な、

``` text
Shorts
↓
「Link in bio」
↓
1000商品の一覧
```

よりも、

``` text
Shorts
↓
「Get all 5 products in my bio」
↓
Short専用ページ
↓
そのShortで紹介した商品
↓
Amazon
```

の方が、ユーザーが目的の商品を見つけやすい。

そのため、サイトは「Amazon商品の巨大カタログ」ではなく、

**「YouTube Shortsで紹介した商品を探すためのサイト」**

として設計する。

------------------------------------------------------------------------

## 次の開発候補

次に実装するなら、

1.  CSVを読み込んで1000商品を一括登録
2.  Shortsごとの商品グループを簡単に作成
3.  商品詳細ページ
4.  関連商品表示
5.  クリックランキング
6.  Amazonリンク一括管理
7.  AIで商品タイトル・説明を生成
8.  Amazonの最新仕様に合わせた商品データ自動取得

まで進めると、**AI
Shortsを大量投稿する運用にかなり向いた仕組み**になる。
