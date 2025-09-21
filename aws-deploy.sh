#!/bin/bash

# AWS S3 + CloudFront Deployment Script
# Usage: ./aws-deploy.sh <bucket-name> <cloudfront-distribution-id>

set -e

BUCKET_NAME=$1
DISTRIBUTION_ID=$2

if [ -z "$BUCKET_NAME" ] || [ -z "$DISTRIBUTION_ID" ]; then
    echo "Usage: $0 <bucket-name> <cloudfront-distribution-id>"
    echo "Example: $0 my-morphyimg-bucket E1234567890ABC"
    exit 1
fi

echo "Building application..."
npm run build

echo "Uploading to S3 bucket: $BUCKET_NAME"
aws s3 sync dist/ s3://$BUCKET_NAME --delete --cache-control "public, max-age=31536000" --exclude "index.html"

echo "Uploading index.html with no-cache policy..."
aws s3 cp dist/index.html s3://$BUCKET_NAME/index.html --cache-control "no-cache"

echo "Creating CloudFront invalidation..."
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "Deployment complete!"
echo "Your site should be available at your CloudFront domain in a few minutes."