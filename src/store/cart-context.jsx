import { createContext, useState } from "react";

export const CartContext = createContext({
    items: [],
    addItemToCart: () => {},
    toggleCartModal: () => {},
    toggleCheckoutModal: () => {},
    reduceItemQuantity: () => {},
    isCartOpen: false
});

export default function CartContextProvider({children}) {
    const [cart, setCart] = useState({
        items: []
    });

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const toggleCartModal = () => {
        setIsCartOpen(prev => !prev);
    }

    const toggleCheckoutModal = () => {
        setIsCartOpen(false);
        setIsCheckoutOpen(prev => !prev);
    }

    const handleReduceQuantity = (id) => {
        setCart(prevCart => {
            const updatedItems = [...prevCart.items];
            const currentItem = updatedItems.find(item => item.id === id);
            debugger;
            // add or remove quantity
            currentItem.quantity = currentItem.quantity - 1;
    
            // if less than zero -> remove item
            if (currentItem.quantity <= 0) {
                return {
                    items: updatedItems.filter(item => item.id !== id)
                };
            }
    
            updatedItems[id] = currentItem;
    
            return {
                items: updatedItems
            };
        });
    }

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
                    quantity: existingItem.quantity + 1
                }

                updatedItems[existingItemIndex] = updatedItem;
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
        addItemToCart: handleAddToCart,
        reduceItemQuantity: handleReduceQuantity,
        toggleCartModal,
        toggleCheckoutModal,
        isCartOpen,
        isCheckoutOpen
    };

    return <CartContext.Provider value={context}>
        {children}
    </CartContext.Provider>
}