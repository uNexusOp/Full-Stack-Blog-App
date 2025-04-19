export interface User {
    id: string;
    username: string;
    email: string;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    author: User;
    created_at: string;
    updated_at: string;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    access: string;
    refresh: string;
    user: User;
} 