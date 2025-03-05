import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/common';
import * as SecureStore from 'expo-secure-store';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const token = await SecureStore.getItemAsync('userToken');
            if (token) {
                const response = await api.get(`/user/article/likes`, {
                    headers: {
                        'Authorization': `${token}`
                    }
                });
                setPosts(response.data.result);
            } else {
                console.log('No token found');
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <PostContext.Provider value={{ posts, setPosts, fetchPosts }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePostContext = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error("usePostContext must be used within a PostProvider");
    }
    return context;
};
