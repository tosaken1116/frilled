output "cloud_run_url" {
  description = "デプロイされた Cloud Run サービスの URL"
  value = google_cloud_run_service.sfu_token_server.status[0].url
}
