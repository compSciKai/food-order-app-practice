import { useState } from 'react';

import Header from './components/Header'
import MealItemList from './components/MealItemList'

function App() {
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

  const count = cart?.items.length;
  return (
    <>
      <Header cartItemCount={count} />
      <MealItemList onAddToCart={handleAddToCart} />
    </>
  );
}

export default App;
