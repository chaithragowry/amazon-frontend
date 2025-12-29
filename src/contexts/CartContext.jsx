import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const existingIndex = state.findIndex(item => item._id === action.payload._id);
            if (existingIndex > -1) {
                //updating existing item quantity
                const updatedCart = [...state];
                updatedCart[existingIndex] = {
                    ...updatedCart[existingIndex],
                    quantity: updatedCart[existingIndex].quantity + action.payload.quantity

                };
                return updatedCart;
            } else {
                //add new item
                return [...state, { ...action.payload, quantity: action.payload.quantity }];

            }

        case 'REMOVE_ITEM':
            return state.filter(item => item._id !== action.payload._id);

        case 'UPDATE_QUANTITY':
            return state.map(item =>
                item._id === action.payload._id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );

        case 'CLEAR_CART':
            return [];

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, [], () => {
        try {
            return JSON.parse(localStorage.getItem('cart') || '[]');
        } catch (err) {
            console.error("Failed to parse cart from localStorage", err);
            return [];
        }
    });

    //sync to localstorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );

};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};   