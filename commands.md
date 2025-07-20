# Important Commands for DevOps E-commerce Project

## Database Password Generation

Generate a secure random password for the RDS database:

```bash
openssl rand -base64 16
```

Example output: `9Zs/H3TQoTmLIyJClj+Yfg==`

After generating this password:
1. Go to your GitHub repository → Settings → Secrets and variables → Actions
2. Add a new repository secret named `DB_PASSWORD`
3. Paste the generated password as the value
4. Click "Add secret"

## Terraform Commands

Initialize Terraform:
```bash
cd terraform
terraform init
```

Plan deployment:
```bash
terraform plan -var="db_password=YOUR_PASSWORD_HERE"
```

Apply changes:
```bash
terraform apply -var="db_password=YOUR_PASSWORD_HERE"
```

Destroy infrastructure:
```bash
terraform destroy -var="db_password=YOUR_PASSWORD_HERE"
```

## Docker Commands

Build and tag images:
```bash
docker build -t username/shopmate-product:latest ./backend/product-service
docker build -t username/shopmate-cart:latest ./backend/cart-service
docker build -t username/shopmate-checkout:latest ./backend/checkout-service
docker build -t username/shopmate-order:latest ./backend/order-service
docker build -t username/shopmate-frontend:latest ./frontend-react
```

Push images to DockerHub:
```bash
docker push username/shopmate-product:latest
docker push username/shopmate-cart:latest
docker push username/shopmate-checkout:latest
docker push username/shopmate-order:latest
docker push username/shopmate-frontend:latest
```

## AWS ECR Commands

Login to ECR:
```bash
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin $(aws sts get-caller-identity --query Account --output text).dkr.ecr.ap-southeast-1.amazonaws.com
```

Tag and push images to ECR:
```bash
docker tag username/shopmate-product:latest $(aws sts get-caller-identity --query Account --output text).dkr.ecr.ap-southeast-1.amazonaws.com/shopmate-product:latest
docker push $(aws sts get-caller-identity --query Account --output text).dkr.ecr.ap-southeast-1.amazonaws.com/shopmate-product:latest
```