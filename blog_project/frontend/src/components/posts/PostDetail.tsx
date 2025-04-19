import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Button,
    Box,
    Paper,
    Divider,
} from '@mui/material';
import { getPost, deletePost } from '../../services/api';
import { Post } from '../../types';

const PostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    
    const currentUsername = localStorage.getItem('username');
    const isAuthor = post?.author.username === currentUsername;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (id) {
                    const data = await getPost(id);
                    setPost(data);
                }
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch post');
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        if (!isAuthor) {
            setError('You are not authorized to delete this post');
            return;
        }

        if (id && window.confirm('Are you sure you want to delete this post?')) {
            try {
                await deletePost(id);
                navigate('/');
            } catch (err: any) {
                if (err.response?.status === 403) {
                    setError('You are not authorized to delete this post');
                } else {
                    setError('Failed to delete post');
                }
            }
        }
    };

    if (loading) {
        return (
            <Container>
                <Typography>Loading...</Typography>
            </Container>
        );
    }

    if (error || !post) {
        return (
            <Container>
                <Typography color="error">{error || 'Post not found'}</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {post.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    By {post.author.username} on {new Date(post.created_at).toLocaleDateString()}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" paragraph>
                    {post.content}
                </Typography>
                {isAuthor && (
                    <Box sx={{ mt: 3 }}>
                        <Button
                            component={RouterLink}
                            to={`/posts/${post.id}/edit`}
                            variant="contained"
                            color="primary"
                            sx={{ mr: 2 }}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </Box>
                )}
                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
            </Paper>
        </Container>
    );
};

export default PostDetail; 