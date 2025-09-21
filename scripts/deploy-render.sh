#!/bin/bash

# Render.com Deployment Script
# This script helps set up deployment to Render.com

set -e

echo "🚀 Setting up Render.com deployment for MorphyIMG"

# Check if render.yaml exists
if [ ! -f "render.yaml" ]; then
    echo "❌ render.yaml not found. Please run this script from the project root."
    exit 1
fi

echo "✅ render.yaml found"

# Instructions for manual setup
echo ""
echo "📋 Manual Setup Instructions for Render.com:"
echo ""
echo "1. Go to https://render.com and sign up/login"
echo "2. Connect your GitLab account"
echo "3. Create a new Static Site"
echo "4. Select your GitLab repository"
echo "5. Use these settings:"
echo "   - Build Command: npm ci && npm run build"
echo "   - Publish Directory: dist"
echo "   - Auto-Deploy: Yes"
echo ""
echo "6. Set Environment Variables:"
echo "   - VITE_SUPABASE_URL=your_supabase_url"
echo "   - VITE_SUPABASE_ANON_KEY=your_supabase_anon_key"
echo ""
echo "7. Deploy!"
echo ""

# Check if we can use Render CLI
if command -v render &> /dev/null; then
    echo "🔧 Render CLI detected. You can also deploy using:"
    echo "   render deploy"
else
    echo "💡 To install Render CLI:"
    echo "   npm install -g @render/cli"
    echo "   render login"
    echo "   render deploy"
fi

echo ""
echo "✨ Your render.yaml is configured with:"
echo "   - Automatic builds on push to main"
echo "   - Security headers"
echo "   - SPA routing support"
echo "   - Node.js 18 environment"