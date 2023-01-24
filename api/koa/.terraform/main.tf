variable "docker_image" {}

variable "region" {
  default = "europe-west3"
}

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.50.0"
    }
  }
}

provider "google" {}

resource "google_cloud_run_service" "api-koa" {
  name     = "api-koa"
  location = var.region

  template {
    spec {
      containers {
        image = var.docker_image
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}
