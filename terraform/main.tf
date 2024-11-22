provider "google" {
  project     = var.project_id
  region      = var.region
}

resource "google_artifact_registry_repository" "repo" {
  location      = var.region
  repository_id  = "my-repo"
  format         = "DOCKER"
}

resource "google_cloud_run_service" "default" {
  name     = "my-cloud-run-service"
  location = var.region

  template {
    spec {
      containers {
        image = "us-central1-docker.pkg.dev/${var.project_id}/my-repo/my-app:latest"
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
  service  = google_cloud_run_service.default.name
  location = google_cloud_run_service.default.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}
