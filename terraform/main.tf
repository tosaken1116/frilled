provider "google" {
  project = var.project_id
  region  = var.region
}

# Artifact Registry を作成
resource "google_artifact_registry_repository" "docker_repo" {
  name     = "sfu-token-server"
  format   = "DOCKER"
  location = var.region
}

# Cloud Build Trigger
resource "google_cloudbuild_trigger" "build_trigger" {
  name = "build-sfu-token-server"

  github {
    owner       = var.github_owner
    name        = var.github_repo
    push {
      branch = "^main$" # main ブランチがプッシュされたときにトリガー
    }
  }

  # Cloud Build 設定
  build {
    step {
      name = "gcr.io/cloud-builders/docker"
      args = [
        "build", "-t",
        "LOCATION-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.docker_repo.name}/sfu-token-server:latest",
        "./server/sfu-token-server"
      ]
    }
    step {
      name = "gcr.io/cloud-builders/docker"
      args = [
        "push",
        "LOCATION-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.docker_repo.name}/sfu-token-server:latest"
      ]
    }
    images = [
      "LOCATION-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.docker_repo.name}/sfu-token-server:latest"
    ]
  }
}

# Cloud Run サービスを作成
resource "google_cloud_run_service" "sfu_token_server" {
  name     = "sfu-token-server"
  location = var.region

  template {
    spec {
      containers {
        image = "LOCATION-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.docker_repo.name}/sfu-token-server:latest"
        ports {
          container_port = 8080
        }
        env {
          name  = "ENV_VAR_NAME"
          value = "value"
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

# Cloud Run IAM 設定 (全ユーザーに公開)
resource "google_cloud_run_service_iam_member" "invoker" {
  service  = google_cloud_run_service.sfu_token_server.name
  location = google_cloud_run_service.sfu_token_server.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

output "cloud_run_url" {
  description = "Cloud Run サービスの URL"
  value       = google_cloud_run_service.sfu_token_server.status[0].url
}

variable "project_id" {
  description = "GCP プロジェクト ID"
  type        = string
}

variable "region" {
  description = "GCP リージョン"
  type        = string
  default     = "us-central1"
}

variable "github_owner" {
  description = "GitHub リポジトリのオーナー"
  type        = string
}

variable "github_repo" {
  description = "GitHub リポジトリ名"
  type        = string
}
