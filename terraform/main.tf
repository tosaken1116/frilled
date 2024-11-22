provider "google" {
  project = var.project_id
  region  = var.region
}
resource "google_service_account" "cloudbuild_service_account" {
  account_id   = "cloudbuild-sa"
  display_name = "cloudbuild-sa"
  description  = "Cloud build service account"
}
resource "google_artifact_registry_repository" "docker_repo" {
  repository_id = "sfu-token-server"
  format        = "DOCKER"
  location      = var.region
}


resource "google_cloudbuild_trigger" "build_trigger" {
  name = "build-sfu-token-server"

  github {
    owner = var.github_owner
    name  = var.github_repo
    push {
      branch = "^main$"
    }
  }

  filename = "server/sfu-token-server/cloudbuild.yaml"
  substitutions = {
    _REGION                         = var.region
    _ARTIFACT_REPOSITORY_IMAGE_NAME = "${var.region}-docker.pkg.dev/${var.project_id}/artifact-registry-nextjs-gcp-sample-app/console"
  }

}

resource "google_cloud_run_service" "sfu_token_server" {
  name     = "sfu-token-server"
  location = var.region

  template {
    spec {
      containers {
        image = "${var.region}-docker.pkg.dev/${var.project_id}/${google_artifact_registry_repository.docker_repo.repository_id}/sfu-token-server:latest"
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

resource "google_cloud_run_service_iam_member" "invoker" {
  service  = google_cloud_run_service.sfu_token_server.id
  location = google_cloud_run_service.sfu_token_server.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

