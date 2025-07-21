#!/bin/bash

# Import target group
terraform import aws_lb_target_group.frontend shopmate-dev-frontend-tg

# Import RDS instance
terraform import module.db.module.db_instance.aws_db_instance.this[0] shopmate-dev-db

echo "Resources imported successfully"
