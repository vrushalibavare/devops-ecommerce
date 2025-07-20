resource "aws_cloudwatch_dashboard" "main" {
  dashboard_name = "${local.name_prefix}-dashboard"

  dashboard_body = jsonencode({
    widgets = [
      {
        type   = "metric"
        x      = 0
        y      = 0
        width  = 12
        height = 6
        properties = {
          metrics = [
            ["AWS/ECS", "CPUUtilization", "ServiceName", "${local.name_prefix}-product", "ClusterName", module.ecs.cluster_name],
            ["AWS/ECS", "CPUUtilization", "ServiceName", "${local.name_prefix}-cart", "ClusterName", module.ecs.cluster_name],
            ["AWS/ECS", "CPUUtilization", "ServiceName", "${local.name_prefix}-checkout", "ClusterName", module.ecs.cluster_name],
            ["AWS/ECS", "CPUUtilization", "ServiceName", "${local.name_prefix}-order", "ClusterName", module.ecs.cluster_name],
            ["AWS/ECS", "CPUUtilization", "ServiceName", "${local.name_prefix}-frontend", "ClusterName", module.ecs.cluster_name]
          ]
          view    = "timeSeries"
          stacked = false
          region  = var.aws_region
          title   = "CPU Utilization"
        }
      },
      {
        type   = "metric"
        x      = 12
        y      = 0
        width  = 12
        height = 6
        properties = {
          metrics = [
            ["AWS/ECS", "MemoryUtilization", "ServiceName", "${local.name_prefix}-product", "ClusterName", module.ecs.cluster_name],
            ["AWS/ECS", "MemoryUtilization", "ServiceName", "${local.name_prefix}-cart", "ClusterName", module.ecs.cluster_name],
            ["AWS/ECS", "MemoryUtilization", "ServiceName", "${local.name_prefix}-checkout", "ClusterName", module.ecs.cluster_name],
            ["AWS/ECS", "MemoryUtilization", "ServiceName", "${local.name_prefix}-order", "ClusterName", module.ecs.cluster_name],
            ["AWS/ECS", "MemoryUtilization", "ServiceName", "${local.name_prefix}-frontend", "ClusterName", module.ecs.cluster_name]
          ]
          view    = "timeSeries"
          stacked = false
          region  = var.aws_region
          title   = "Memory Utilization"
        }
      },
      {
        type   = "metric"
        x      = 0
        y      = 6
        width  = 24
        height = 6
        properties = {
          metrics = [
            ["AWS/RDS", "CPUUtilization", "DBInstanceIdentifier", module.db.db_instance_identifier],
            ["AWS/RDS", "FreeStorageSpace", "DBInstanceIdentifier", module.db.db_instance_identifier],
            ["AWS/RDS", "DatabaseConnections", "DBInstanceIdentifier", module.db.db_instance_identifier]
          ]
          view    = "timeSeries"
          stacked = false
          region  = var.aws_region
          title   = "RDS Metrics"
        }
      }
    ]
  })
}