# This file is part of the Terraform configuration for AWS ECS services.
# It sets up the ECS cluster, task definitions, and services for the application components.
# The ECS cluster is configured to use Fargate, which is a managed AWS service that simplifies running containers.
module "ecs" {
  source  = "terraform-aws-modules/ecs/aws"
  version = "~> 5.0"

  cluster_name = "${local.name_prefix}-cluster"

  cluster_settings = {
    "name"  = "containerInsights"
    "value" = "enabled"
  }

  fargate_capacity_providers = {
    FARGATE = {
      default_capacity_provider_strategy = {
        weight = 100
      }
    }
  }

  tags = local.common_tags
}

# Using existing hosted zone instead of private DNS namespace

resource "aws_iam_role" "ecs_execution" {
  name = "${local.name_prefix}-ecs-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })

  tags = local.common_tags
}

resource "aws_iam_role_policy_attachment" "ecs_execution" {
  role       = aws_iam_role.ecs_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role_policy_attachment" "ecs_ecr_access" {
  role       = aws_iam_role.ecs_execution.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess"

}

# Service Discovery removed - using Route53 records instead

# Task Definitions and Services
module "ecs_service_product" {
  source  = "terraform-aws-modules/ecs/aws//modules/service"
  version = "~> 5.0"

  name        = "${local.name_prefix}-product"
  cluster_arn = module.ecs.cluster_arn

  cpu    = 256
  memory = 512

  container_definitions = {
    product-service = {
      cpu       = 256
      memory    = 512
      essential = true
      image     = "${aws_ecr_repository.repositories["product"].repository_url}:latest"
      port_mappings = [
        {
          name          = "product-service"
          containerPort = 5000
          hostPort      = 5000
          protocol      = "tcp"
        }
      ]
      log_configuration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.services["product"].name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  }

  subnet_ids         = module.vpc.public_subnets
  security_group_ids = [aws_security_group.ecs.id]
  assign_public_ip   = true

  tags = local.common_tags
}

module "ecs_service_cart" {
  source  = "terraform-aws-modules/ecs/aws//modules/service"
  version = "~> 5.0"

  name        = "${local.name_prefix}-cart"
  cluster_arn = module.ecs.cluster_arn

  cpu    = 256
  memory = 512

  container_definitions = {
    cart-service = {
      cpu       = 256
      memory    = 512
      essential = true
      image     = "${aws_ecr_repository.repositories["cart"].repository_url}:latest"
      port_mappings = [
        {
          name          = "cart-service"
          containerPort = 5000
          hostPort      = 5000
          protocol      = "tcp"
        }
      ]
      log_configuration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.services["cart"].name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  }

  # Service discovery removed

  subnet_ids         = module.vpc.public_subnets
  security_group_ids = [aws_security_group.ecs.id]
  assign_public_ip   = true

  tags = local.common_tags
}

module "ecs_service_checkout" {
  source  = "terraform-aws-modules/ecs/aws//modules/service"
  version = "~> 5.0"

  name        = "${local.name_prefix}-checkout"
  cluster_arn = module.ecs.cluster_arn

  cpu    = 256
  memory = 512

  container_definitions = {
    checkout-service = {
      cpu       = 256
      memory    = 512
      essential = true
      image     = "${aws_ecr_repository.repositories["checkout"].repository_url}:latest"
      port_mappings = [
        {
          name          = "checkout-service"
          containerPort = 5000
          hostPort      = 5000
          protocol      = "tcp"
        }
      ]
      environment = [
        {
          name  = "ORDER_SERVICE_URL"
          value = "http://order.${var.project_name}.${data.aws_route53_zone.existing.name}"
        }
      ]
      log_configuration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.services["checkout"].name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  }

  # Service discovery removed

  subnet_ids         = module.vpc.public_subnets
  security_group_ids = [aws_security_group.ecs.id]
  assign_public_ip   = true

  tags = local.common_tags
}

module "ecs_service_order" {
  source  = "terraform-aws-modules/ecs/aws//modules/service"
  version = "~> 5.0"

  name        = "${local.name_prefix}-order"
  cluster_arn = module.ecs.cluster_arn

  cpu    = 256
  memory = 512

  container_definitions = {
    order-service = {
      cpu       = 256
      memory    = 512
      essential = true
      image     = "${aws_ecr_repository.repositories["order"].repository_url}:latest"
      port_mappings = [
        {
          name          = "order-service"
          containerPort = 5000
          hostPort      = 5000
          protocol      = "tcp"
        }
      ]
      environment = [
        {
          name  = "DATABASE_URL"
          value = "postgresql://${var.db_username}:${var.db_password}@${module.db.db_instance_endpoint}/shopmate"
        }
      ]
      log_configuration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.services["order"].name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  }

  # Service discovery removed

  subnet_ids         = module.vpc.public_subnets
  security_group_ids = [aws_security_group.ecs.id]
  assign_public_ip   = true

  tags = local.common_tags
}

module "ecs_service_frontend" {
  source  = "terraform-aws-modules/ecs/aws//modules/service"
  version = "~> 5.0"

  name        = "${local.name_prefix}-frontend"
  cluster_arn = module.ecs.cluster_arn

  cpu    = 256
  memory = 512



  container_definitions = {
    frontend-service = {
      cpu       = 256
      memory    = 512
      essential = true
      image     = "${aws_ecr_repository.repositories["frontend"].repository_url}:latest"
      port_mappings = [
        {
          name          = "frontend-service"
          containerPort = 80
          hostPort      = 80
          protocol      = "tcp"
        }
      ]
      environment = [
        {
          name  = "VITE_PRODUCT_API"
          value = "http://product.${var.project_name}.${data.aws_route53_zone.existing.name}"
        },
        {
          name  = "VITE_CART_API"
          value = "http://cart.${var.project_name}.${data.aws_route53_zone.existing.name}"
        },
        {
          name  = "VITE_CHECKOUT_API"
          value = "http://checkout.${var.project_name}.${data.aws_route53_zone.existing.name}"
        },
        {
          name  = "VITE_ORDER_API"
          value = "http://order.${var.project_name}.${data.aws_route53_zone.existing.name}"
        },
        {
          name  = "VITE_DEPS_TEMP"
          value = "/tmp/vite-tmp"
        }
      ]
      log_configuration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.services["frontend"].name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }
      readonlyRootFilesystem = true
      linuxParameters = {
        tmpfs = [
          {
            "containerPath" : "/var/cache/nginx",
            "size" : 64,
            "mountOptions" : ["rw", "nosuid", "nodev", "noexec"]
          },

          {
            "containerPath" : "/var/log/nginx",
            "size" : 64,
            "mountOptions" : ["rw", "nosuid", "nodev", "noexec"]
          },
          {
            "containerPath" : "/var/run",
            "size" : 64,
            "mountOptions" : ["rw", "nosuid", "nodev", "noexec"]
          }
        ]
      }
    }
  }

  load_balancer = [
    {
      target_group_arn = aws_lb_target_group.frontend.arn
      container_name   = "frontend-service"
      container_port   = 80
    }
  ]

  subnet_ids         = module.vpc.public_subnets
  security_group_ids = [aws_security_group.ecs.id]
  assign_public_ip   = true

  tags = local.common_tags
}

# CloudWatch Log Groups
resource "aws_cloudwatch_log_group" "services" {
  for_each = toset([
    "product",
    "cart",
    "checkout",
    "order",
    "frontend"
  ])

  name              = "/ecs/${var.project_name}-${each.key}"
  retention_in_days = 30

  tags = local.common_tags
}