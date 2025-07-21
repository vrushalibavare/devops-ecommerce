variable "aws_region" {
  description = "AWS region to deploy resources"
  default     = "ap-southeast-1"
}

variable "project_name" {
  description = "Project name used for resource naming"
  default     = "shopmate"
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  default     = "dev"
}

variable "db_username" {
  description = "Database username"
  default     = "shopmate"
}

variable "db_password" {
  description = "Database password"
  sensitive   = true
}

variable "create_random_password" {
  description = "Whether to create a random password in Secrets Manager"
  type        = bool
  default     = true
}