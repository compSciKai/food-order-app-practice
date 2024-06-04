import { useContext } from 'react';
import { CartContext } from '../store/cart-context';

export default function CartModal() {
    const {
        isCartOpen, 
        toggleCartModal,
        toggleCheckoutModal,
        items
    } = useContext(CartContext);

    const subTotal = items.reduce(
        (accum, currentValue) => 
        accum + (currentValue.price * currentValue.quantity), 
        0
    );

    return <dialog open={isCartOpen} className='modal'>
        <div className="cart">
            <h2>Your Cart</h2>
            <ul>{renderCartItems(items)}</ul>  
            <div className="cart-total">${subTotal.toFixed(2)}</div>
            <div className="modal-actions">
                <button className='text-button' onClick={toggleCartModal}>Close</button>
                <button className='button' onClick={toggleCheckoutModal}>Go to Checkout</button>
            </div>          
        </div>
    </dialog>
}

const renderCartItems = () => {
    const {items, addItemToCart, reduceItemQuantity} = useContext(CartContext);
    return items.map(item => <CartItem
        key={item.id}
        {...item}
        addItem={addItemToCart}
        removeItem={reduceItemQuantity}
    />
    );
}

function CartItem({name, id, quantity, price, addItem, removeItem}) {
    return <li className='cart-item' id={id}>
        <p>{name} - {quantity} x ${price}</p>
        <span className='cart-item-actions'>
            <button onClick={() => removeItem(id)}>-</button>
            {quantity}
            <button onClick={() => addItem({id, name, price})}>+</button>
        </span>
    </li>   
}