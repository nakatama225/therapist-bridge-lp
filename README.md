[![Project Status: Concept – This repository is intended as a limited demo of a proposed career-support service.](https://www.repostatus.org/badges/latest/concept.svg)](https://www.repostatus.org/#concept)

# Therapist Bridge LP

理学療法士（PT）・作業療法士（OT）向けのキャリア支援構想「Therapist Bridge（セラピストブリッジ）」の、
相談につながる導線を確認するためのランディングページ（LP）モックです。
サービス名は仮称で、サービスサイトの別モックは含みません。

## Why — 何を解くのか

臨床経験のあるPT・OTが、自分の経験を医療以外の仕事でどう活かせるかを考え、
キャリア相談へ進めるようにします。

主な対象は24〜28歳のPT・OTです。臨床で培った課題発見・計画立案・伴走・改善の経験を、
SaaS・IT・コンサルティングなどの仕事で伝わる言葉へ翻訳する構成にしています。

## Design Choice — 採用した構成と、その理由

### 相談の導線を1ページにまとめる

Hero → 共感 → スキルの翻訳と未来 → 思想と支援方針 → 相談CTAの順に配置しています。
サービスサイト全体を別に作る案は、最初の相談までの流れを確かめる目的に対して
確認対象が広がるため採用していません。

### HTML・CSS・JavaScriptをそのまま配信する

ページが1枚でサーバー処理もないため、フレームワークやビルド処理は追加していません。
ビルド設定の管理よりも、原稿・見た目・相談導線を直接確認できることを優先しました。
`dist/` が編集元であり、別のソースから生成されるディレクトリではありません。

### 相談フォームは画面内の確認までにする

すべてのCTAから同じダイアログを開き、必須項目とメール形式を確認して、
入力内容のプレビュー・再編集へ進みます。送信先や保存先は接続していません。
実際の相談受付機能は、このコンセプトモックの対象外です。

人物画像は生成素材で、実際の利用者・転職事例を表すものではありません。
架空の利用者の声・内定数・年収実績は掲載していません。

## How-to — 動かし方

ローカルプレビューにはPython 3を使います。依存パッケージのインストールやビルドは不要です。
リポジトリのルートで次を実行します。

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

[ローカルプレビュー](http://127.0.0.1:4173/)を開きます。終了はターミナルでCtrl+Cです。
`dist/index.html` を直接開くこともできます。

JavaScriptの構文検査にはNode.jsを使います。Node.jsはページの配信には不要です。

```sh
node --check dist/assets/app.js
```

## ファイル構成

| パス | 役割 |
|---|---|
| `dist/index.html` | LPの原稿・構造・相談ダイアログ |
| `dist/assets/styles.css` | 共通スタイルとレスポンシブ設定 |
| `dist/assets/brand.css` | Therapist Bridgeの配色・レイアウト |
| `dist/assets/app.js` | ダイアログ・入力検証・プレビュー・再編集 |
| `dist/assets/*.png` | 臨床2点とビジネス1点の生成画像 |

ビジネス画像は、人物の外見を調整した `business-future-v2.png` を使用しています。

## 現在の状態と残っている確認

2026-09-20時点でLPと相談フォームの画面内処理を実装済みです。
JavaScriptの構文、参照ファイル、HTML内の参照先を検査しています。

次は実ブラウザで、モバイル表示、必須項目・メール形式の検証、確認から再編集、
ダイアログの閉じ方、キーボード操作とフォーカスの復帰を最終確認します。
送信・永続保存、解析、外部フォーム、CRMとの連携は実装していません。

このモックの原稿にはサービス構想上の前提を含みます。
本ページはコンセプトデザインのため、支援内容・料金・運営者は定めていません。

## 共有・公開

一時共有にはOpenAIのSitesを使います。名称の変更に合わせてSiteを作り直すため、
共有先のURLは作り直した後に記載します。
URLを知っている人が閲覧できる設定で、配信対象は `dist/` のLPファイルです。
GitHubリポジトリは公開しています。

Sitesとの対応は `.openai/hosting.json` に記録しています。
更新時は同じSiteへ保存・再公開してください。GitHubへのpushだけではSitesは更新されません。
フォームは引き続きモックで、入力内容を送信・永続保存しません。

### GitHub Pagesの準備

GitHub Pagesは未設定です。将来使う場合の配信ブランチと手順を残しています。
配信元は `gh-pages` ブランチのルートです。`main` の `dist/` だけを切り出すため、
READMEや運用資料はサイトに含まれません。`.nojekyll` により静的ファイルをそのまま配信します。

Pagesの設定は「Deploy from a branch」→ `gh-pages` → `/ (root)` を使います。
有効化後のURLは `https://nakatama225.github.io/therapist-bridge-lp/` です。

Pagesを使う場合の更新は、検査・コミット・mainへの反映後に、リポジトリのルートで実行します。
GitHubへのpush権限を持つGit認証が必要です。

```sh
git switch main
git pull --ff-only origin main
node --check dist/assets/app.js
git subtree push --prefix=dist origin gh-pages
```

`main` へのpushだけではサイトは更新されません。`gh-pages` へのpush後に
GitHubの標準Pages処理が配信を更新します。

ページには `noindex,nofollow` を指定していますが、閲覧制限や認証の代わりにはなりません。
