# Docker Setup for Morphy

This document explains how to set up and run the Morphy application using Docker.

## Architecture

- **Frontend**: React/Vite application (port 5173)
- **Backend**: Express API with Sharp for image processing (port 3000)

## Quick Start

### 1. Local Development with Docker Compose

```bash
# Start both frontend and backend
npm run docker:dev

# Or manually:
docker-compose up --build
```

This will:
- Build and start the backend API on http://localhost:3000
- Build and start the frontend on http://localhost:5173
- Set up proper networking between services

### 2. Backend Only (for development)

```bash
# Start just the backend
npm run docker:backend

# Or manually:
cd backend
npm install
npm run dev
```

### 3. Production Build

```bash
# Build backend image
docker build -f backend/Dockerfile -t morphy-backend ./backend

# Build frontend image
docker build -t morphy-frontend .

# Run backend
docker run -p 3000:3000 morphy-backend

# Run frontend
docker run -p 5173:5173 morphy-frontend
```

## Environment Variables

### Frontend
- `VITE_API_BASE_URL`: Backend API URL (default: http://localhost:3000)

### Backend
- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (default: 3000)
- `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:5173)

## Render.com Deployment

The `render.yaml` file configures two services:

1. **Backend Service**: `morphy-backend`
   - Docker-based deployment
   - Health check at `/health`
   - Handles image conversion

2. **Frontend Service**: `morphy-frontend`
   - Docker-based deployment
   - Serves the React application
   - Connects to backend service

### Deploy to Render.com

1. Push your code to GitHub
2. Connect your repository to Render.com
3. Render will automatically detect the `render.yaml` file
4. Both services will be deployed and connected

## API Endpoints

### Backend API (port 3000)

- `GET /health` - Health check
- `POST /api/convert` - Single file conversion
- `POST /api/convert/batch` - Batch file conversion

### Frontend (port 5173)

- All conversion pages use the backend API
- Real-time conversion with progress feedback
- Batch processing support

## Troubleshooting

### Backend Issues
- Check logs: `docker logs <container-name>`
- Verify Sharp installation: `docker exec <container> sharp --version`
- Test health endpoint: `curl http://localhost:3000/health`

### Frontend Issues
- Check API connection: Open browser dev tools
- Verify environment variables
- Test API directly: `curl http://localhost:3000/api/convert`

### Docker Issues
- Rebuild images: `docker-compose up --build --force-recreate`
- Clean up: `docker-compose down -v`
- Check ports: `netstat -tulpn | grep :3000`

## Development Workflow

1. Make changes to frontend code
2. Frontend auto-reloads (hot reload)
3. Make changes to backend code
4. Backend auto-reloads (tsx watch)
5. Test conversion functionality
6. Commit and push to GitHub
7. Render.com auto-deploys

## Performance Notes

- Backend uses Sharp for high-performance image processing
- Supports RAW formats (CR2, DNG, NEF, ARW, etc.)
- Memory-efficient streaming for large files
- Rate limiting to prevent abuse
- Health checks for monitoring
