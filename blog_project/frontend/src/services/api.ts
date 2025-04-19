import axios from 'axios';
import { AuthResponse, LoginData, Post, RegisterData } from '../types';

const API_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post(`${API_URL}/auth/refresh/`, {
                    refresh: refreshToken,
                });

                const { access } = response.data;
                localStorage.setItem('token', access);

                originalRequest.headers.Authorization = `Bearer ${access}`;
                return api(originalRequest);
            } catch (refreshError) {
                // If refresh token fails, logout the user
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Auth endpoints
export const login = async (credentials: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login/', credentials);
    localStorage.setItem('token', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    return response.data;
};

export const register = async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register/', userData);
    localStorage.setItem('token', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
};

// Blog post endpoints
export interface PostsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Post[];
}

export const getPosts = async (): Promise<PostsResponse> => {
    const response = await api.get<PostsResponse>('/posts/');
    return response.data;
};

export const getPost = async (id: string): Promise<Post> => {
    const response = await api.get<Post>(`/posts/${id}/`);
    return response.data;
};

export const createPost = async (postData: { title: string; content: string }): Promise<Post> => {
    const response = await api.post<Post>('/posts/', postData);
    return response.data;
};

export const updatePost = async (id: string, postData: { title: string; content: string }): Promise<Post> => {
    const response = await api.put<Post>(`/posts/${id}/`, postData);
    return response.data;
};

export const deletePost = async (id: string): Promise<void> => {
    await api.delete(`/posts/${id}/`);
};

export default api; 