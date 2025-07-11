# コンガ先生のレジ打ち修行 🎯

和風でポップなタイピングゲーム！レジ打ちの達人を目指そう！

## 🎮 ゲーム概要

- **ゲーム名**: コンガ先生のレジ打ち修行
- **ジャンル**: タイピング練習ゲーム
- **テーマ**: 和風 × ポップ
- **制限時間**: 60秒

## ✨ 特徴

- 🌸 美しい和風デザイン
- 🎭 アニメーション豊富なローディング演出
- 📱 レスポンシブ対応（PC・スマホ対応）
- 🎯 商品名と金額の2段階入力システム
- 📊 リアルタイムスコア表示
- 🎨 背景GIFアニメーション

## 🚀 技術スタック

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **フォント**: Google Fonts (Nunito, Comfortaa)
- **デプロイ**: Vercel
- **アニメーション**: CSS Animations & Keyframes

## 🎯 ゲームルール

1. 表示される商品名をタイピング
2. Enterキーで確定
3. 続いて金額を入力
4. 60秒間でどれだけスコアを稼げるかチャレンジ！

## 📁 ファイル構造

```
/
├── index.html          # メインHTML
├── style.css           # スタイルシート
├── script.js           # ゲームロジック
├── image/              # 画像ファイル
│   ├── メインロゴ.png
│   ├── サブロゴ.png
│   ├── カットインメイン.png
│   ├── カットインサブ.png
│   └── *.gif           # 背景アニメーション
├── package.json        # 依存関係
├── vercel.json         # Vercel設定
└── README.md          # このファイル
```

## 🔧 ローカル開発

```bash
# リポジトリをクローン
git clone https://github.com/username/konga-sensei-typing-game.git

# ディレクトリに移動
cd konga-sensei-typing-game

# ローカルサーバー起動
npx http-server . -p 3000 -o
```

## 🌐 デプロイ

このプロジェクトはVercelで自動デプロイされています。

## 🎨 アニメーション演出

- **ローディング画面**: カラフルなグラデーション + 回転スピナー
- **カットイン演出**: フェード + ポップアニメーション
- **背景**: GIFアニメーションの循環表示
- **UI要素**: 順次フェードイン演出

## 📝 ライセンス

MIT License

## 🤝 貢献

プルリクエストやIssueはお気軽にどうぞ！

---

Developed with ❤️ by Claude Code Assistant