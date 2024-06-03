import Header from './components/Header'
import MealItemList from './components/MealItemList'
import CartContextProvider from './store/cart-context';

export default function App() {
  return (
    <CartContextProvider>
      <Header />
      <MealItemList />
    </CartContextProvider>
  );
}