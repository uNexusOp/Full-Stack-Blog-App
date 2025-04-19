#!/bin/bash

# Start the backend server
echo "Starting Django backend server..."
cd blog_project/backend
source venv/bin/activate
python manage.py runserver 8000 &
BACKEND_PID=$!

# Start the frontend server
echo "Starting React frontend server..."
cd ../frontend
npm start &
FRONTEND_PID=$!

# Wait for both processes to finish
wait $BACKEND_PID $FRONTEND_PID 