# 基本イメージ
FROM openjdk:17-slim

# 作業ディレクトリを設定
WORKDIR /app

# sbt をインストールするためのツール
RUN apt-get update && apt-get install -y \
  curl gnupg && \
  echo "deb https://repo.scala-sbt.org/scalasbt/debian all main" > /etc/apt/sources.list.d/sbt.list && \
  curl -sL "https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x99E82A75642AC823" | apt-key add && \
  apt-get update && apt-get install -y sbt && \
  apt-get clean

# プロジェクトファイルをコピー
COPY . .

# キャッシュをクリアして依存関係を更新
RUN sbt clean update

# sbt アプリケーションをビルド
RUN sbt compile

# サービスアカウントキーの環境変数
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/service-account-key.json

# アプリケーションを起動
CMD ["sbt", "run"]
