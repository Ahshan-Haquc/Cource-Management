// src/context/WishListContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
    const { user } = useAuth();
    const [wishList, setWishList] = useState([]);

    // Fetch wishlist for logged-in user
    const fetchWishList = async () => {
        if (!user) return;
        try {
            const res = await axios.get("http://localhost:5000/api/courses/showAllWishListCourse", {
                withCredentials: true,
            });
            if (res.data.success) setWishList(res.data.courses);
        } catch (err) {
            console.error("Error fetching wishlist:", err);
        }
    };

    // Toggle add/remove wishlist
    const toggleWishList = async (courseId) => {
        if (!user) {
            alert("Please login to use wishlist.");
            return;
        }
        try {
            const res = await axios.get(
                `http://localhost:5000/api/courses/addToWishList/${courseId}`,
                { withCredentials: true }
            );
            alert(res.data.message);
            fetchWishList();
        } catch (err) {
            console.error("Error toggling wishlist:", err);
        }
    };

    useEffect(() => {
        if (user) fetchWishList();
        else setWishList([]); // clear when logged out
    }, [user]);

    return (
        <WishListContext.Provider value={{ wishList, toggleWishList, fetchWishList }}>
            {children}
        </WishListContext.Provider>
    );
};

export const useWishList = () => useContext(WishListContext);
