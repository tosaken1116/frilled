variable "project_id" {
  description = "GCP プロジェクト ID"
  type        = string
}

variable "region" {
  description = "GCP リージョン"
  type        = string
  default     = "asia-northeast1"
}

variable "github_owner" {
  description = "GitHub リポジトリのオーナー"
  type        = string
}

variable "github_repo" {
  description = "GitHub リポジトリ名"
  type        = string
}
