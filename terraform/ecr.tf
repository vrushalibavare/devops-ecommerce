# ECR Repository Configuration
# This module creates ECR repositories for the application components.
# It also sets up the necessary IAM policies and permissions for the ECR repositories.

resource "aws_ecr_repository" "repositories" {
  for_each = toset([
    "product",
    "cart",
    "checkout",
    "order",
    "frontend"
  ])

  name                 = "${var.project_name}-${each.key}"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = local.common_tags
}

# ECR Repository Policy
resource "aws_ecr_repository_policy" "policy" {
  for_each   = aws_ecr_repository.repositories
  repository = each.value.name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "RestrictPullToSpecificUser"
        Effect = "Allow"
        Principal = {
          AWS = data.aws_caller_identity.current.arn
        }
        Action = [
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "ecr:BatchCheckLayerAvailability",
          "ecr:PutImage",
          "ecr:InitiateLayerUpload",
          "ecr:UploadLayerPart",
          "ecr:CompleteLayerUpload"
        ]
      },
      {
        Sid    = "DenyAllOthers"
        Effect = "Deny"
        Principal = "*"
        Action = "ecr:*"
        Condition = {
          StringNotLike = {
            "aws:PrincipalArn" = data.aws_caller_identity.current.arn
          }
        }
      }
    ]
  })
}

data "aws_caller_identity" "current" {}
