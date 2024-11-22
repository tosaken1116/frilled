provider "google" {
  project = var.project_id
  region  = var.region
}



resource "google_cloud_run_service" "sfu_token_server" {
  name     = "sfu-token-server"
  location = var.region

  template {
    spec {
      containers {
        image = "${var.region}-docker.pkg.dev/${var.project_id}/sfu_token_server/sfu-token-server:latest"
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

