variable "project_id" {
  description = "GCP プロジェクト ID"
  type        = string
}

variable "region" {
  description = "GCP リージョン"
  type        = string
  default     = "us-central1"
}

variable "credentials_file" {
  description = "GCP サービスアカウントキーのパス"
  type        = string
}
