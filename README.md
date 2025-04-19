# Full Stack Blog Application

A modern, full-stack blog application built with Django REST Framework and React. This application allows users to create, read, update, and delete blog posts with a beautiful and responsive user interface.

## Features

- 🔐 User Authentication (Register, Login, Logout)
- 📝 Create, Edit, and Delete Blog Posts
- 🔍 View All Posts and Individual Post Details
- 👤 User-specific Post Management
- 🎨 Modern and Responsive UI with Material-UI
- 🔒 Secure API with JWT Authentication

## Tech Stack

### Backend
- Django
- Django REST Framework
- Simple JWT for Authentication
- SQLite Database

### Frontend
- React
- TypeScript
- Material-UI (MUI)
- React Router
- Axios for API calls

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd blog_project/backend
```

2. Create and activate a virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows, use `.venv\Scripts\activate`
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Start the development server:
```bash
python manage.py runserver
```

The backend will be running at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd blog_project/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be running at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register/` - Register a new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/refresh/` - Refresh JWT token

### Blog Posts
- `GET /api/posts/` - List all posts
- `POST /api/posts/` - Create a new post
- `GET /api/posts/{id}/` - Retrieve a specific post
- `PUT /api/posts/{id}/` - Update a specific post
- `DELETE /api/posts/{id}/` - Delete a specific post

## Features in Detail

### User Authentication
- Secure registration and login system
- JWT token-based authentication
- Protected routes for authenticated users

### Blog Post Management
- Rich text editor for creating posts
- Edit and delete functionality for post authors
- Responsive post layout with Material-UI components

### User Interface
- Clean and modern design
- Responsive layout for all screen sizes
- Material Design components
- User-friendly navigation

## Security Features
- Password hashing
- JWT token authentication
- CORS configuration
- Protected API endpoints
- Authorization checks for post modifications

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 