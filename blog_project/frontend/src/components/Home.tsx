import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Box,
    IconButton,
} from '@mui/material';
import { getPosts, deletePost } from '../services/api';
import { Post } from '../types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Home: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const currentUsername = localStorage.getItem('username');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                console.log('Fetching posts...');
                const response = await getPosts();
                console.log('Raw API Response:', response);
                
                if (!response) {
                    throw new Error('No response from API');
                }

                if (!Array.isArray(response)) {
                    console.error('Response is not an array:', response);
                    throw new Error('Invalid response format: expected an array');
                }

                console.log('Setting posts with:', response);
                setPosts(response);
                console.log('Posts state after setting:', posts);
                setError('');
            } catch (err) {
                console.error('Error in fetchPosts:', err);
                setError(err instanceof Error ? err.message : 'Failed to fetch posts');
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [location.pathname]);

    const handleDelete = async (postId: string) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await deletePost(postId);
                // Refresh the posts after deletion
                const updatedPosts = posts.filter(post => post.id !== postId);
                setPosts(updatedPosts);
            } catch (err) {
                console.error('Error deleting post:', err);
                setError('Failed to delete post');
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

    if (error) {
        return (
            <Container>
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    if (!posts || posts.length === 0) {
        return (
            <Container>
                <Typography>No posts found</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Blog Posts
                </Typography>
            </Box>
            <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)'
                },
                gap: 3
            }}>
                {posts.map((post) => (
                    <Card key={post.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" component="h2" gutterBottom>
                                {post.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {post.content}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                By {post.author.username}
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'space-between' }}>
                            <Button
                                size="small"
                                component={RouterLink}
                                to={`/posts/${post.id}`}
                            >
                                Read More
                            </Button>
                            {currentUsername === post.author.username && (
                                <Box>
                                    <IconButton
                                        size="small"
                                        onClick={() => navigate(`/posts/${post.id}/edit`)}
                                        color="primary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(post.id)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            )}
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </Container>
    );
};

export default Home; 