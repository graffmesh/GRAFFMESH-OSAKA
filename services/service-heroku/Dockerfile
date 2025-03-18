# Node.jsの公式イメージをベースにする
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 必要な依存関係をインストール
RUN npm install

# アプリケーションコードをコピー
COPY . .

# ポートを指定
EXPOSE 3000

# サーバーを起動
CMD ["npm", "start"]