#!/bin/bash

# Define the root directory
ROOT_DIR="video-automation-api"

# Create directory structure
mkdir -p $ROOT_DIR/app/services
mkdir -p $ROOT_DIR/app/routes

# Create Python files with placeholder content
touch $ROOT_DIR/app/__init__.py

cat > $ROOT_DIR/app/main.py <<EOF
# Entry point for FastAPI
from fastapi import FastAPI
from app.routes import auth, accounts, upload

app = FastAPI()

# Include routers
app.include_router(auth.router)
app.include_router(accounts.router)
app.include_router(upload.router)
EOF

cat > $ROOT_DIR/app/config.py <<EOF
# Configuration file (env settings, etc.)
class Settings:
    PROJECT_NAME = "Video Automation API"

settings = Settings()
EOF

cat > $ROOT_DIR/app/schemas.py <<EOF
# Pydantic models for request/response
from pydantic import BaseModel

class User(BaseModel):
    username: str
    email: str
EOF

# Services
touch $ROOT_DIR/app/services/__init__.py

cat > $ROOT_DIR/app/services/fb_instagram.py <<EOF
# Facebook and Instagram integration logic
def post_to_facebook():
    pass

def post_to_instagram():
    pass
EOF

cat > $ROOT_DIR/app/services/youtube.py <<EOF
# YouTube integration logic
def upload_to_youtube():
    pass
EOF

cat > $ROOT_DIR/app/services/processor.py <<EOF
# Video processing logic
def process_video(file_path: str):
    pass
EOF

# Routes
touch $ROOT_DIR/app/routes/__init__.py

cat > $ROOT_DIR/app/routes/auth.py <<EOF
# Authentication routes
from fastapi import APIRouter

router = APIRouter()

@router.post("/login")
def login():
    return {"message": "Login successful"}
EOF

cat > $ROOT_DIR/app/routes/accounts.py <<EOF
# Account-related routes
from fastapi import APIRouter

router = APIRouter()

@router.get("/accounts")
def get_accounts():
    return {"accounts": []}
EOF

cat > $ROOT_DIR/app/routes/upload.py <<EOF
# Upload-related routes
from fastapi import APIRouter

router = APIRouter()

@router.post("/upload")
def upload_video():
    return {"status": "Upload received"}
EOF

# Dockerfile
cat > $ROOT_DIR/Dockerfile <<EOF
# Base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Command to run the app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
EOF

# Requirements
cat > $ROOT_DIR/requirements.txt <<EOF
fastapi
uvicorn
pydantic
EOF

# README
cat > $ROOT_DIR/README.md <<EOF
# Video Automation Project

## Setup

1. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

2. Run the app locally:
\`\`\`bash
uvicorn app.main:app --reload
\`\`\`

3. Run with Docker:
\`\`\`bash
docker build -t video-automation .
docker run -p 80:80 video-automation
\`\`\`
EOF

echo "Project structure created under '$ROOT_DIR'"
