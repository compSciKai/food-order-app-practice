import { createContext, useState } from "react";

export const CartContext = createContext({
    items: [],
    addItemToCart: () => {}
});

export default function CartContextProvider({children}) {
    const [cart, setCart] = useState({
        items: []
    });

    const handleAddToCart = (meal) => {
        setCart(prevCart => { 
        const updatedItems = [...prevCart.items];

        const existingItemIndex = updatedItems.findIndex(
            item => item.id === meal.id
        )

        const existingItem = updatedItems[existingItemIndex]; 
        if (existingItem) {
            const updatedItem = {
            ...existingItem,
            quantity: ++existingItem.quantity
            }

            updatedItem[existingItem] = updatedItem;
        } else {
            updatedItems.push({
            id: meal.id,
            name: meal.name,
            price: meal.price,
            quantity: 1
            });
        }

        return { items: updatedItems };
        });
    }

    const context = {
        items: cart.items,
        addItemToCart: handleAddToCart
    };

    return <CartContext.Provider value={context}>
        {children}
    </CartContext.Provider>
}