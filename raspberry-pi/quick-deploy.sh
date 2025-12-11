#!/bin/bash

# Quick Rsync Deployment Script
set -e

REMOTE_USER="alan"
PI_IP="192.168.68.52"
SITE_NAME="AlanMcGinnis_Website"
APP_DIR="Websites/$SITE_NAME"

# Build and sync files to Raspberry Pi
echo "Building site..."
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.."
npm run build

echo "Syncing files to Pi..."
rsync -avz --delete --exclude='start-server.sh' dist/ $REMOTE_USER@$PI_IP:$APP_DIR/

# No restart needed - Python HTTP server automatically serves new files
echo "Quick deployment complete! Site updated at http://$PI_IP:3001"