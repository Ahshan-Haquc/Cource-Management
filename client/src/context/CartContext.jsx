import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState([]);
    const [cartWhenUserNotLogedIn, setCartWhenUserNotLogedIn] = useState([]);

    // 🔥 Fetch logged-in cart from DB
    const fetchCart = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/courses/cart", { withCredentials: true });
            if (res.data.success) setCart(res.data.courses);
        } catch (err) {
            console.error("Error fetching cart:", err);
        }
    };

    // 🔥 Fetch guest cart from local state
    const fetchCartWhenUserNotLogedIn = async () => {
        try {
            const courseIds = cartWhenUserNotLogedIn.map((item) => item._id);
            if (courseIds.length === 0) return;

            const res = await axios.post("http://localhost:5000/api/courses/cart/guest", { courseIds });
            if (res.data.success) {
                setCart(res.data.courses); // reuse the same `cart` for UI
            }
        } catch (err) {
            console.error("Error fetching guest cart:", err);
        }
    };

    //  Merge guest cart into user cart after login
    const mergeGuestCartIntoUserCart = async () => {
        if (cartWhenUserNotLogedIn.length === 0) return;

        try {
            const courseIds = cartWhenUserNotLogedIn.map((item) => item._id);

            const res = await axios.post(
                "http://localhost:5000/api/courses/cart/merge",
                { courseIds },
                { withCredentials: true }
            );

            if (res.data.success) {
                setCartWhenUserNotLogedIn([]); // clear guest cart
                fetchCart(); // refresh DB cart
            }
        } catch (err) {
            console.error("Error merging guest cart:", err);
        }
    };

    // Watch user login/logout
    useEffect(() => {
        if (user) {
            mergeGuestCartIntoUserCart();
            fetchCart();
        } else {
            fetchCartWhenUserNotLogedIn();
        }
    }, [user]);

    // Add to cart
    const addToCart = async (courseId) => {
        if (user) {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/courses/addToCart/${courseId}`,
                    { withCredentials: true }
                );
                if (res.data.success) {
                    fetchCart();
                } else {
                    alert(res.data.message);
                }
            } catch (err) {
                console.error("Error adding course:", err);
            }
        } else {
            if (cartWhenUserNotLogedIn.find((c) => c._id === courseId)) {
                alert("Course already in your cart.");
                return;
            }
            setCartWhenUserNotLogedIn((prev) => [...prev, { _id: courseId }]);
            fetchCartWhenUserNotLogedIn(); // immediately update cart preview
        }
    };



    // Remove from cart
    const handleRemoveFromCart = async (courseId) => {
        if (user) {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/courses/removeFromCart/${courseId}`,
                    { withCredentials: true }
                );
                if (res.data.success) {
                    fetchCart();
                }
            } catch (err) {
                console.error("Remove error:", err);
            }
        } else {
            setCartWhenUserNotLogedIn((prev) => prev.filter((c) => c._id !== courseId));
            fetchCartWhenUserNotLogedIn();
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                addToCart,
                handleRemoveFromCart,
                cartWhenUserNotLogedIn,
                setCartWhenUserNotLogedIn,
                fetchCart,
                fetchCartWhenUserNotLogedIn,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
