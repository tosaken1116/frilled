provider "google" {
  project = var.project_id
  region  = var.region
}
resource "google_service_account" "cloudbuild_service_account" {
  account_id   = "cloudbuild-sa"
  display_name = "cloudbuild-sa"
  description  = "Cloud build service account"
}

resource "google_project_iam_member" "act_as" {
  project = var.project_id
  role    = "roles/iam.serviceAccountUser"
  member  = "serviceAccount:${google_service_account.cloudbuild_service_account.email}"
}

resource "google_project_iam_member" "logs_writer" {
  project = var.project_id
  role    = "roles/logging.logWriter"
  member  = "serviceAccount:${google_service_account.cloudbuild_service_account.email}"
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
  service_account = google_service_account.cloudbuild_service_account.id

  build {
    step {
      name = "gcr.io/cloud-builders/docker"
      args = [
        "build", "-t",
        "${var.region}-docker.pkg.dev/${var.project_id}/sfu-token-server/sfu-token-server:latest",
        "../server/sfu-token-server"
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

