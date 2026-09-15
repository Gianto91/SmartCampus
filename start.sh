#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
cd backend && npm install --legacy-peer-deps && cd ..
cd frontend && npm install --legacy-peer-deps && cd ..

# Build frontend
echo "Building frontend..."
cd frontend && npm run build && cd ..

# Start backend
echo "Starting backend..."
cd backend && npm run start
