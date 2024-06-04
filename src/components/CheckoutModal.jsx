import { useContext } from 'react';
import { CartContext } from '../store/cart-context';
import { postOrder } from '../requests';

export default function CheckoutModal() {
    const {
        isCheckoutOpen, 
        toggleCheckoutModal,
        items
    } = useContext(CartContext);

    const subTotal = items.reduce(
        (accum, currentValue) => accum + (currentValue.price * currentValue.quantity), 0
    );

    const handleSubmit = (event) => {
        const sendOrder = async (data) => {
            const response = await postOrder(data);
            console.log('response', response);
        }

        event.preventDefault();
        const fd = new FormData(event.target);
        const data = {
            customer: Object.fromEntries(fd.entries())
        };

        data.items = items;
        sendOrder(data);
    }

    return <dialog open={isCheckoutOpen} className='modal'>
        <form className="cart" onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: ${subTotal}</p>
            <div className="control">
                <label htmlFor="name">Full Name</label>
                <input type="text" name="name" id="name" />
            </div>
            <div className="control">
                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" id="email" />
            </div>
            <div className="control">
                <label htmlFor="street">Street</label>
                <input type="text" name="street" id="street" />
            </div>
            <div className="control-row">
                <div className="control" style={{maxWidth: '200px'}}>
                    <label htmlFor="postal-code">Postal Code</label>
                    <input type="text" name="postal-code" id="postal-code" />
                </div>
                <div className="control" style={{maxWidth: '200px'}}>
                    <label htmlFor="city">City</label>
                    <input type="text" name="city" id="city" />
                </div>                
            </div>
            <div className="modal-actions" style={{marginTop: '12px'}}>
                <button className='text-button' onClick={toggleCheckoutModal}>Close</button>
                <button type='submit' className='button'>Submit Order</button>
            </div>          
        </form>
    </dialog>
}