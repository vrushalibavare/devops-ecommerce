# Import the existing target group to manage it
resource "aws_lb_target_group" "frontend" {
  name        = "${local.name_prefix}-frontend-tg"
  port        = 8080  # Update port to match container
  protocol    = "HTTP"
  vpc_id      = module.vpc.vpc_id
  target_type = "ip"

  # Prevent Terraform from trying to recreate this resource
  lifecycle {
    ignore_changes = [name]
  }

  tags = local.common_tags
}