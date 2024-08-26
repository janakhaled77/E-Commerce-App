import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
    const token = localStorage.getItem('token');
    const headers = { token };

    function getUserCart() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers })
            .then(response => response)
            .catch(error => error);
    }

    function addToUserCart(pID) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId: pID }, { headers })
            .then(response => response)
            .catch(error => error);
    }

    function updateUserCart(id, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count }, { headers })
            .then(response => response)
            .catch(error => error);
    }

    function removeItemCart(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
            .then(response => response)
            .catch(error => error);
    }

    function CheckOutSession(cartId, shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
            { "shippingAddress": shippingAddress },
            { headers })
            .then(data => data)
            .catch(err => err);
    }

    function clearCart() {
        return axios.delete('https://ecommerce.routemisr.com/api/v1/cart', { headers })
            .then(response => response)
            .catch(error => error);
    }

    const [cartItems, setCartItems] = useState([]);

    async function getCart() {
        const response = await getUserCart();
        if (response.data.success === "success") {
            setCartItems(response.data.numOfCartItems);
        }
    }

    useEffect(() => {
        getCart();
    }, []);

    async function handleClearCart() {
        try {
            const response = await clearCart();
            if (response.data.success === "success") {
                // Clear the cartItems state to reflect the empty cart
                setCartItems([]);
            }
        } catch (error) {
            console.error("Failed to clear cart:", error);
        }
    }

    return (
        <CartContext.Provider value={{ cartItems, CheckOutSession, setCartItems, getUserCart, addToUserCart, updateUserCart, removeItemCart, clearCart: handleClearCart }}>
            {children}
        </CartContext.Provider>
    );
}