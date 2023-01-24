variable "project" {}

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

  backend "gcs" {
    prefix = "api/koa"
  }
}


provider "google" {
  project = var.project
}

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
