import { useContext } from 'react';
import { CartContext } from '../store/cart-context';

export default function CheckoutModal() {
    const {
        isCheckoutOpen, 
        toggleCheckoutModal,
        items
    } = useContext(CartContext);

    const subTotal = items.reduce(
        (accum, currentValue) => accum + (currentValue.price * currentValue.quantity), 0
    );

    return <dialog open={isCheckoutOpen} className='modal'>
        <form className="cart">
            <h2>Checkout</h2>
            <p>Total Amount: ${subTotal}</p>
            <div className="control">
                <label htmlFor="name">Full Name</label>
                <input type="text" name="name" />
            </div>
            <div className="control">
                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" />
            </div>
            <div className="control">
                <label htmlFor="street">Street</label>
                <input type="text" name="street" />
            </div>
            <div className="control-row">
                <div className="control" style={{maxWidth: '200px'}}>
                    <label htmlFor="postal">Postal Code</label>
                    <input type="text" name="postal" />
                </div>
                <div className="control" style={{maxWidth: '200px'}}>
                    <label htmlFor="city">City</label>
                    <input type="text" name="city" />
                </div>                
            </div>
            <div className="modal-actions" style={{marginTop: '12px'}}>
                <button className='text-button' onClick={toggleCheckoutModal}>Close</button>
                <button className='button'>Submit Order</button>
            </div>          
        </form>
    </dialog>
}