output "cloud_run_url" {
  description = "デプロイされた Cloud Run サービスの URL"
  value       = google_cloud_run_service.default.status[0].url
}
