import axios from 'axios';

export async function getPosts(authUser) {
    try {
        const response = await axios.post("http://localhost:5000/api/posts/fetchInitialPosts", { authUser }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching initial posts:", error);
        throw error;
    }
}

export async function getMorePosts(authUser, lastVisible) {
    try {
        const response = await axios.post("http://localhost:5000/api/posts/fetchMorePosts", { authUser, lastVisible }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error fetching more posts:", error);
        throw error;
    }
}
