name := "FirebaseAuthAPI"

version := "0.1"

scalaVersion := "2.13.12"

libraryDependencies ++= Seq(
  "com.google.firebase" % "firebase-admin" % "9.1.1",
  "com.typesafe.akka" %% "akka-http" % "10.5.3", // Akka 2.7.x に対応する最新バージョン
  "com.typesafe.akka" %% "akka-http-spray-json" % "10.5.3", // Akka 2.7.x 対応
  "com.typesafe.akka" %% "akka-actor-typed" % "2.7.0", // Akka HTTP に要求されるバージョン
  "com.typesafe.akka" %% "akka-stream" % "2.7.0" // 必須の Akka ストリームライブラリ
)
