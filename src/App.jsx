import Header from './components/Header'
import MealItemList from './components/MealItemList'
import CartModal from './components/CartModal';
import CheckoutModal from './components/CheckoutModal';
import CartContextProvider from './store/cart-context';

export default function App() {
  return (
    <CartContextProvider>
      <Header />
      <CartModal /> 
      <CheckoutModal />
      <MealItemList />
    </CartContextProvider>
  );
}