# 薬剤師たぬぽん ポートフォリオサイト 移行マニュアル

最終更新: 2026-05-10

## 概要

AI Studio (Google) で開発していた React + Vite + TypeScript のポートフォリオサイトを、GitHub + Netlify の構成に移行した記録。

| 項目 | 移行前 | 移行後 |
|---|---|---|
| ホスティング | Cloud Run (有料、AI Studio の「公開」) | **Netlify (無料、CDN 配信)** |
| バックエンド | Firestore + Firebase Auth | なし（純粋な静的サイト） |
| コンテンツ管理 | ブラウザ上の CMS (Editor.tsx) | **`src/config.ts` の直接編集** |
| AI Rewriting | Gemini API (`@google/generative-ai`) | 削除 |
| デプロイ | AI Studio の「公開」ボタン | **GitHub の main に push → Netlify 自動デプロイ** |

## URL 一覧

| 種類 | URL |
|---|---|
| 公開サイト | https://tanupon-portfolio.netlify.app |
| GitHub リポジトリ | https://github.com/tanupon-web/tanupon-portfolio |
| Netlify ダッシュボード | https://app.netlify.com/projects/tanupon-portfolio |

## 技術スタック

- **React 19** + **Vite 6** + **TypeScript 5.8**
- **Tailwind CSS v4**（`@tailwindcss/vite` プラグイン方式、`tailwind.config.js` 不要）
- **shadcn/ui**（`@base-ui/react` ベース、`components/ui/` 以下に配置）
- アニメーション: framer-motion
- アイコン: lucide-react
- Markdown: react-markdown（ブログ記事レンダリング）
- トースト: sonner
- 問い合わせ送信: **Formspree**（`https://formspree.io/f/xqenkezq`）

## 移行で削除したファイル

| ファイル | 理由 |
|---|---|
| `src/Editor.tsx` (35KB) | CMS 編集パネル本体。今後は config 直編集なので不要 |
| `src/api.ts` | Gemini API 呼び出し（CMS の AI rewrite 用）。CMS 削除に伴い不要 |
| `lib/firebase.ts` | Firebase 初期化。Firestore/auth を使わないため不要 |
| `firebase-applet-config.json`, `firebase-blueprint.json` | Firebase 設定 |
| `firestore.rules`, `DRAFT_firestore.rules` | Firestore セキュリティルール |
| `.env.example` | GEMINI_API_KEY 用テンプレート |
| `metadata.json` | AI Studio 専用ファイル |

## 移行で改造したファイル

### `src/App.tsx`（フル書き直し、290行 → 11行）
- Firestore の `onSnapshot` 4本（configs / services / works / blog）削除
- localStorage 復旧ロジック削除
- Firebase Auth 関連すべて削除
- `handlePublish` / `handleLogin` / `handleLogout` 削除
- `Editor` コンポーネント呼び出し削除
- `tmikany@gmail.com` の管理者判定削除
- 結果として `siteConfig` を `<Preview>` に渡すだけのシンプル構造に

### `src/Preview.tsx`
- `isLoggedIn?` / `onLogin?` props 削除（PreviewProps 型からも除去）
- ナビ右上の「Login」ボタン削除
- フッターの「Admin Login」ボタン削除
- モバイルメニューの「Contact: tmikany@gmail.com」表示ブロック削除
- **問い合わせフォームの件名 input を `name="subject"` → `name="_subject"` に修正**（Formspree 仕様）

### `src/constants.ts` → `src/config.ts`（リネーム）
- export 名を `INITIAL_CONFIG` → `siteConfig` に変更
- `hero.avatar.url` を `https://api.dicebear.com/...`（プレースホルダ）→ `/profile_icon_square.png`（本物の薬剤師たぬぽん画像）に変更
- `footer.socials` から「Note」を削除
- `footer.socials` の X URL を `#` → `https://x.com/tanupon_web` に変更

### `vite.config.ts`
- `process.env.GEMINI_API_KEY` の `define` ブロック削除
- `loadEnv` import 削除
- AI Studio 用の `DISABLE_HMR` server 設定削除

### `package.json`
- name を `react-example` → `medical-web-creator` に変更
- `clean` スクリプト削除（POSIX 依存で Windows 動作しなかった）
- `dev` スクリプトから `--port=3000 --host=0.0.0.0` 削除（デフォルトの :5173 で十分）
- 依存削除（後述）

### `index.html`
- `<html lang="en">` → `<html lang="ja">`
- title / description はすでに正しい文言で入っていたので変更なし

### `src/index.css`
- `@import url('https://fonts.googleapis.com/...')` を冒頭に移動（Vite ビルド時の CSS warning 解消）

### `.gitignore`
- `.claude/`、`.vscode/`、`Thumbs.db` を追加（Claude Code/IDE 設定や Windows サムネイルが GitHub に上がらないように）

### `public/profile_icon_square.png`
- 新規追加。薬剤師たぬぽんのキャラクター画像（白衣・薬瓶・モノクル）。サイズ 835KB

## 削除した npm パッケージ

**dependencies**:
- `@google/genai`、`@google/generative-ai`（Gemini API）
- `dotenv`（環境変数）
- `express`（Node サーバー、AI Studio の都合）
- `motion`（未使用、`framer-motion` のみ使用）

**devDependencies**:
- `firebase`
- `@firebase/eslint-plugin-security-rules`
- `@types/express`
- `tsx`（Node スクリプト実行用）
- `autoprefixer`（Tailwind v4 では内蔵で不要）

## 環境構築（ローカル）

PowerShell の場合、プロジェクトディレクトリで:

```powershell
npm install                  # 依存パッケージのインストール
npm run dev                  # 開発サーバー起動 → http://localhost:5173/
npm run build                # 本番ビルド → dist/ に出力
npm run preview              # ビルド結果のプレビュー
npm run lint                 # 型チェックのみ（tsc --noEmit）
```

## デプロイ手順（初回セットアップ）

1. ローカルで `git init -b main`
2. git の identity 設定: `git config --global user.name "tanupon"` / `user.email "tanupon.pharmacist@gmail.com"`
3. `git add . && git commit -m "Initial commit"`
4. GitHub で新規リポジトリ作成（**README / .gitignore / license は全部チェックなし** ← 既存ファイルとの衝突回避のため）
5. `git remote add origin https://github.com/tanupon-web/tanupon-portfolio.git`
6. `git push -u origin main`
7. Netlify ダッシュボード https://app.netlify.com/start を開く
8. 画面下部の「Import a Git repository」→ **GitHub** を選択
9. アカウント切り替えプルダウンで **`tanupon-web`** を選ぶ
10. リポジトリ一覧から `tanupon-portfolio` を選択
11. Project name に `tanupon-portfolio` を入力（→ URL が `tanupon-portfolio.netlify.app` になる）
12. ビルド設定は Vite 自動検出が効く（Build command: `npm run build` / Publish: `dist`）
13. **Deploy tanupon-portfolio** をクリック
14. 完了するとサイトが https://tanupon-portfolio.netlify.app で公開される

### Netlify のつまずきポイント

**「リポジトリ一覧に新規リポジトリが出ない」場合**

Netlify GitHub App が新規リポジトリへのアクセス権を持っていない状態。対処法:

1. リポジトリ選択画面の「**Configure the Netlify app on GitHub**」リンクをクリック
2. → GitHub の Netlify インストール先選択画面が開く
3. 該当の組織（例: 「タヌポンウェブ」= `tanupon-web`）の「設定する」をクリック
4. 「Repository access」を **「All repositories」に変更**（おすすめ。新規リポジトリも自動許可）
5. 「Save」
6. Netlify のタブに戻ってリロード → リポジトリが見えるようになる

## 今後の運用フロー（編集→デプロイ）

> サイトの内容を編集したい時の標準フロー:

1. **Claude Code に変更内容を伝える**（テキスト変更・画像差し替え・新セクション追加など）
2. Claude Code が `src/config.ts` などを編集
3. `git add . && git commit -m "..." && git push`
4. **GitHub の main に push が入ると Netlify が自動でデプロイ**（push をフックに走る）
5. 2〜5分後、https://tanupon-portfolio.netlify.app に反映

### よくある編集対象

| 編集内容 | 編集場所 |
|---|---|
| Hero / About / Services / Works / Blog / Contact のテキスト | `src/config.ts` |
| 各セクションの見出し（INTRO / ABOUT 等） | `src/config.ts` の `labels` |
| ナビゲーションリンクの追加・削除 | `src/config.ts` の `navigation.links` |
| アバター画像の差し替え | `public/profile_icon_square.png` を同名で上書き、または config の `avatar.url` を別ファイル名に変更 |
| services / works / blog 項目の追加 | `src/config.ts` の `services.items` / `works.items` / `blog.items` の配列に追加 |
| カラー（accent gold / navy 系）変更 | `src/config.ts` の `theme` と `src/index.css` の `:root { --accent: ... }` |
| ファビコン追加 | `public/favicon.ico` を置いて `index.html` の `<head>` に `<link rel="icon" href="/favicon.ico">` |
| SNS リンク変更 | `src/config.ts` の `footer.socials` |

### Netlify 側の手動操作が必要な場合

| やりたいこと | 操作場所 |
|---|---|
| 独自ドメインを設定 | Netlify ダッシュボード → Domain management（独自ドメイン代だけで Netlify 側は無料） |
| ビルド失敗時のログ確認 | Netlify ダッシュボード → Production deploys → 該当ビルド → Deploy log |
| HTTPS 証明書 | Netlify が自動で Let's Encrypt 設定（`*.netlify.app` でも独自ドメインでも） |

## 今回ハマった話 / 知識メモ

### Formspree の件名フィールドは `_subject`

問い合わせフォームの件名（メールクライアントが「件名」として表示する行）に反映させるには、`<input name="subject">` ではなく `<input name="_subject">` にする必要がある。普通の `subject` だとフォームデータの1フィールドとしてメール本文に出るだけで、件名行には反映されない。

### Tailwind v4 + 外部 Google Fonts の `@import` 順序

CSS 仕様上、`@import url(...)` は `@charset` を除き全ルールの先頭になければいけない。`@import "tailwindcss"` は Tailwind ディレクティブとして特殊扱いされるが、`@import url('https://fonts.googleapis.com/...')` は CSS の冒頭に置く必要がある。Vite/Lightning CSS のビルド警告として出る。

### Vite 6 のチャンクサイズ警告（500KB 超）

`(!) Some chunks are larger than 500 kB after minification` という警告は、framer-motion + react-markdown + base-ui + lucide-react などの合計で発生。**gzip 後は 170KB 程度**で Netlify の Edge CDN が gzip 配信してくれるので、実質問題なし。気にしなくて OK。

### Windows + Git の改行コード警告

`warning: in the working copy of 'xxx', LF will be replaced by CRLF` は、Git Windows の `core.autocrlf=true` の挙動。チェックアウト時に LF → CRLF 変換、コミット時に CRLF → LF 変換される。Netlify は Linux でビルドするので影響なし。

### Netlify の AI agent タブと Import タブ

Netlify ダッシュボードのトップ「Let's create your new project」ページは、上半分が「**AI agent でビルド**」（Claude Agent + スターターサンプル: Marketing site / Personal portfolio 等）、下半分が「**Import a Git repository**」になっている。今回は下半分の GitHub から入る。AI agent 側のサンプルプロンプトは無関係。

## バックアップ

- ZIP: `C:\Users\tmika\Downloads\medical-web-creator.zip`（AI Studio からエクスポートした原本）
- 旧 AI Studio プロジェクト: そのまま放置（請求はトリガーされない設計）
- 旧 URL `gen-lang-client-0246298104.web.app` は古いまま残るが、ココナラ等で使うのは新しい Netlify URL に統一する方針

## コミット履歴

| ハッシュ | 内容 |
|---|---|
| `cdb8674` | Initial commit（28ファイル / 9732行追加。AI Studio からの初回移行） |
| `9d48c9d` | Fix Formspree subject field（`name="subject"` → `name="_subject"`） |
