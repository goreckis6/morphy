# Deployment Guide

This guide covers deploying MorphyIMG to various cloud platforms from GitLab.

## Quick Start

1. **Prepare Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

2. **Choose Your Platform**
   - [Render.com](#rendercom) - Easiest setup
   - [AWS](#aws) - Most scalable
   - [Netlify](#netlify) - Great for static sites
   - [Vercel](#vercel) - Excellent performance

## Platform-Specific Instructions

### Render.com

**Automatic Deployment (Recommended)**
1. Connect GitLab repository to Render.com
2. Create new Static Site
3. Use these settings:
   - Build Command: `npm ci && npm run build`
   - Publish Directory: `dist`
   - Auto-Deploy: Yes
4. Set environment variables in Render dashboard
5. Deploy automatically triggers on push to main

**Manual Deployment**
```bash
./scripts/deploy-render.sh
```

### AWS

**Infrastructure Setup**
```bash
# Install prerequisites
# - Terraform
# - AWS CLI

# Configure AWS credentials
aws configure

# Deploy infrastructure
./scripts/deploy-aws.sh
```

**GitLab CI/CD Setup**
1. Set GitLab CI/CD variables:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_S3_BUCKET` (from Terraform output)
   - `AWS_CLOUDFRONT_DISTRIBUTION_ID` (from Terraform output)

2. Push to main branch to trigger deployment

**Manual Deployment**
```bash
npm run build
./aws-deploy.sh <bucket-name> <distribution-id>
```

### Netlify

**Automatic Deployment**
1. Connect GitLab repository to Netlify
2. Build settings are configured in `netlify.toml`
3. Set environment variables in Netlify dashboard

**Manual Deployment**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

### Vercel

**Automatic Deployment**
1. Connect GitLab repository to Vercel
2. Build settings are configured in `vercel.json`
3. Set environment variables in Vercel dashboard

**Manual Deployment**
```bash
npm install -g vercel
vercel login
vercel --prod
```

## Docker Deployment

**Build and Run Locally**
```bash
docker build -f docker/Dockerfile -t morphyimg .
docker run -p 3000:80 morphyimg
```

**Docker Compose**
```bash
docker-compose up -d
```

**Deploy to Container Platform**
1. Build and push to registry:
   ```bash
   docker build -f docker/Dockerfile -t your-registry/morphyimg .
   docker push your-registry/morphyimg
   ```

2. Deploy to your container platform (AWS ECS, Google Cloud Run, etc.)

## Environment Variables

### Required
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### Optional
- `VITE_GA_TRACKING_ID` - Google Analytics tracking ID
- `VITE_SENTRY_DSN` - Sentry error tracking DSN

## Security Considerations

All deployment configurations include:
- Security headers (CORS, CSP, etc.)
- HTTPS enforcement
- Static asset caching
- SPA routing support

## Monitoring

Consider setting up:
- Error tracking (Sentry)
- Analytics (Google Analytics)
- Uptime monitoring
- Performance monitoring

## Troubleshooting

### Build Failures
- Check Node.js version (requires 18+)
- Verify all dependencies are installed
- Check environment variables are set

### Runtime Errors
- Check browser console for errors
- Verify Supabase configuration
- Check network connectivity

### Performance Issues
- Enable CDN caching
- Optimize images
- Use compression
- Monitor bundle size

## Support

For deployment issues:
1. Check the logs in your deployment platform
2. Verify environment variables
3. Test locally first: `npm run build && npm run preview`
4. Open an issue on GitLab if problems persist