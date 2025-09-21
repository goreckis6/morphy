#!/bin/bash

# Environment Setup Script
# This script helps set up environment variables for different deployment platforms

set -e

echo "🔧 Setting up environment variables for MorphyIMG"

# Create .env.example if it doesn't exist
if [ ! -f ".env.example" ]; then
    cat > .env.example << EOF
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Analytics
VITE_GA_TRACKING_ID=your_google_analytics_id

# Optional: Error Tracking
VITE_SENTRY_DSN=your_sentry_dsn
EOF
    echo "✅ Created .env.example"
fi

echo ""
echo "📋 Environment Variables Setup:"
echo ""
echo "1. Copy .env.example to .env:"
echo "   cp .env.example .env"
echo ""
echo "2. Fill in your Supabase credentials in .env"
echo ""
echo "3. For deployment platforms, set these variables:"
echo ""

echo "🔵 Render.com:"
echo "   - VITE_SUPABASE_URL"
echo "   - VITE_SUPABASE_ANON_KEY"
echo ""

echo "☁️ AWS Amplify:"
echo "   - VITE_SUPABASE_URL"
echo "   - VITE_SUPABASE_ANON_KEY"
echo ""

echo "🟢 Netlify:"
echo "   - VITE_SUPABASE_URL"
echo "   - VITE_SUPABASE_ANON_KEY"
echo ""

echo "⚫ Vercel:"
echo "   - VITE_SUPABASE_URL"
echo "   - VITE_SUPABASE_ANON_KEY"
echo ""

echo "🐙 GitLab CI/CD:"
echo "   Add these as CI/CD variables in GitLab:"
echo "   - VITE_SUPABASE_URL"
echo "   - VITE_SUPABASE_ANON_KEY"
echo "   - AWS_ACCESS_KEY_ID (for AWS deployment)"
echo "   - AWS_SECRET_ACCESS_KEY (for AWS deployment)"
echo "   - NETLIFY_AUTH_TOKEN (for Netlify deployment)"
echo "   - VERCEL_TOKEN (for Vercel deployment)"
echo ""

echo "✨ Setup complete! Choose your deployment platform and follow the instructions."