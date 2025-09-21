#!/bin/bash

# AWS Deployment Setup Script
# This script helps set up AWS infrastructure using Terraform

set -e

echo "☁️ Setting up AWS deployment for MorphyIMG"

# Check if Terraform is installed
if ! command -v terraform &> /dev/null; then
    echo "❌ Terraform is not installed. Please install it first:"
    echo "   https://learn.hashicorp.com/tutorials/terraform/install-cli"
    exit 1
fi

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first:"
    echo "   https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

echo "✅ Prerequisites check passed"

# Navigate to terraform directory
cd terraform

# Initialize Terraform
echo "🔧 Initializing Terraform..."
terraform init

# Plan the deployment
echo "📋 Planning AWS infrastructure..."
terraform plan

echo ""
echo "📋 Manual Setup Instructions for AWS:"
echo ""
echo "1. Configure AWS credentials:"
echo "   aws configure"
echo ""
echo "2. Review the Terraform plan above"
echo ""
echo "3. Apply the infrastructure:"
echo "   cd terraform"
echo "   terraform apply"
echo ""
echo "4. Note the outputs (S3 bucket name and CloudFront distribution ID)"
echo ""
echo "5. Set up GitLab CI/CD variables:"
echo "   - AWS_ACCESS_KEY_ID"
echo "   - AWS_SECRET_ACCESS_KEY"
echo "   - AWS_S3_BUCKET (from terraform output)"
echo "   - AWS_CLOUDFRONT_DISTRIBUTION_ID (from terraform output)"
echo ""
echo "6. Push to main branch to trigger deployment"
echo ""

echo "💡 To deploy manually:"
echo "   npm run build"
echo "   ./aws-deploy.sh <bucket-name> <distribution-id>"

cd ..