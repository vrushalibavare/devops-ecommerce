module "db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 5.0"

  identifier = "${local.name_prefix}-db"

  engine               = "postgres"
  engine_version       = "13"
  family               = "postgres13"
  major_engine_version = "13"
  instance_class       = "db.t3.micro"

  allocated_storage     = 20
  max_allocated_storage = 100

  db_name  = "shopmate"
  username = var.db_username
  password = var.db_password
  port     = 5432

  multi_az               = false
  create_db_subnet_group = true
  subnet_ids             = module.vpc.private_subnets
  vpc_security_group_ids = [aws_security_group.db.id]

  # Keep monitoring features for dashboards
  enabled_cloudwatch_logs_exports       = ["postgresql", "upgrade"]
  performance_insights_enabled          = true
  performance_insights_retention_period = 7 # Free tier: 7 days retention

  # Simplify backup settings
  backup_retention_period = 1 # Minimal backup (1 day)
  skip_final_snapshot     = true
  deletion_protection     = false

  tags = local.common_tags
}

resource "aws_security_group" "db" {
  name        = "${local.name_prefix}-db-sg"
  description = "Security group for RDS database"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.ecs.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    local.common_tags,
    { Name = "${local.name_prefix}-db-sg" }
  )
}