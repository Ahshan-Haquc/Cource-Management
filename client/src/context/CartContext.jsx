import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const fetchCart = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/courses/cart", { withCredentials: true });
            if (res.data.success) setCart(res.data.courses);
        } catch (err) {
            console.error("Error fetching cart:", err);
        }
    };
    // Fetch cart when app loads
    useEffect(() => {
        fetchCart();
    }, [cart]);

    const addToCart = async (courseId) => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/courses/addToCart/${courseId}`,
                { withCredentials: true }
            );
            if (res.data.success) {
                // setCart((prev) => [...prev, { _id: courseId }]); // or re-fetch cart again
                alert(res.data.message)
                fetchCart()
            } else {
                alert(res.data.message)
            }
        } catch (error) {
            console.error("Error adding course to cart:", error);
            alert(error.response?.data?.message || "Add to cart failed.");
        }
    };

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
