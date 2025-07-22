#!/bin/bash

# Step 1: Build React frontend
cd frontend-folder
npm install
npm run build
cd ..

# Step 2: Install backend Python dependencies
pip install -r requirements.txt

# Step 3: Start Flask backend
gunicorn run:app --bind=0.0.0.0:$PORT
