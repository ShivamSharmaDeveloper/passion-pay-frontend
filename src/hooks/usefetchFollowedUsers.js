import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase"; // Adjust the path to your Firestore config

const fetchFollowedUsers = async (userId, showing) => {
    const followingUsers = [];
    try {
        const q = query(collection(firestore, "users"), where(showing, "array-contains", userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            followingUsers.push({ id: doc.id, ...doc.data() });
        });
    } catch (error) {
        console.error("Error fetching followed users: ", error);
    }
    return followingUsers;
};

export default fetchFollowedUsers;
