# ECR Repository Configuration



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
  force_delete         = true

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = local.common_tags
}

# ECR Repository Policy - Commented out due to issues
/*
resource "aws_ecr_repository_policy" "policy" {
  for_each   = aws_ecr_repository.repositories
  repository = each.value.name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowSpecificUserPushAndPull"
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
          "ecr:CompleteLayerUpload",
          "ecr:DescribeImages"
        ]
      },
      {
        Sid    = "AllowECSTaskExecution"
        Effect = "Allow"
        Principal = {
          AWS = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/${var.project_name}-ecs-execution-role"
        }
        Action = [
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "ecr:BatchCheckLayerAvailability"
        ]
      }
    ]
  })
}
*/

data "aws_caller_identity" "current" {}