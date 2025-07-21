data "aws_route53_zone" "existing" {
  name = "sctp-sandbox.com." # Note the trailing dot
}

# Create A records for each service
resource "aws_route53_record" "services" {
  for_each = {
    product  = "${local.name_prefix}-product"
    cart     = "${local.name_prefix}-cart"
    checkout = "${local.name_prefix}-checkout"
    order    = "${local.name_prefix}-order"
    frontend = "${local.name_prefix}-frontend"
  }

  zone_id = data.aws_route53_zone.existing.zone_id
  name    = "${each.key}.${var.project_name}.${data.aws_route53_zone.existing.name}"
  type    = "A"

  alias {
    name                   = aws_lb.main.dns_name
    zone_id                = aws_lb.main.zone_id
    evaluate_target_health = true
  }
}

# Create load balancer for services
resource "aws_lb" "main" {
  name               = "${local.name_prefix}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = module.vpc.public_subnets

  tags = local.common_tags
}

resource "aws_security_group" "alb" {
  name        = "${local.name_prefix}-alb-sg"
  description = "Security group for ALB"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = local.common_tags
}

# Create listener and target groups
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend_8080.arn
  }

  lifecycle {
    ignore_changes = [default_action]
  }
}

resource "aws_lb_target_group" "frontend_8080" {
  name        = "${local.name_prefix}-frontend-tg-8080"
  port        = 8080
  protocol    = "HTTP"
  vpc_id      = module.vpc.vpc_id
  target_type = "ip"

  health_check {
    path                = "/"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200-399"
  }

  tags = local.common_tags
}