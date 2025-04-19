import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CreatePost from './components/posts/CreatePost';
import EditPost from './components/posts/EditPost';
import PostDetail from './components/posts/PostDetail';
import PrivateRoute from './components/auth/PrivateRoute';

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Container>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/posts/:id" element={<PostDetail />} />
                    <Route
                        path="/posts/create"
                        element={
                            <PrivateRoute>
                                <CreatePost />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/posts/:id/edit"
                        element={
                            <PrivateRoute>
                                <EditPost />
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;
