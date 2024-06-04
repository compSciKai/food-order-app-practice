import { useContext } from 'react';
import { CartContext } from '../store/cart-context';

export default function CartButton() {
    const { items, toggleCartModal } = useContext(CartContext);

    return <button className='text-button' onClick={toggleCartModal}>
        Cart ({items.length})
    </button>
}