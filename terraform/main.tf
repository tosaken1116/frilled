provider "google" {
  project = var.project_id
  region  = var.region
}

# Artifact Registry を作成
resource "google_artifact_registry_repository" "docker_repo" {
  repository_id = "sfu-token-server"
  format        = "DOCKER"
  location      = var.region
}

# Cloud Build Trigger
resource "google_cloudbuild_trigger" "build_trigger" {
  name = "build-sfu-token-server"

  github {
    owner = var.github_owner
    name  = var.github_repo
    push {
      branch = "^main$"
    }
  }

  build {
    step {
      name = "gcr.io/cloud-builders/docker"
      args = [
        "build", "-t",
        "${var.region}-docker.pkg.dev/${var.project_id}/sfu-token-server/sfu-token-server:latest",
        "./server/sfu-token-server"
      ]
    }
    step {
      name = "gcr.io/cloud-builders/docker"
      args = [
        "push",
        "${var.region}-docker.pkg.dev/${var.project_id}/sfu-token-server/sfu-token-server:latest"
      ]
    }
    images = [
      "${var.region}-docker.pkg.dev/${var.project_id}/sfu-token-server/sfu-token-server:latest"
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
        image = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.docker_repo.name}/sfu-token-server:latest"
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

