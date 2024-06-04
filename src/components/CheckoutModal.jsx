import { useContext } from 'react';
import { CartContext } from '../store/cart-context';
import { useInput } from '../hooks/useInput';

import { postOrder } from '../utils/requests';
import { isEmail, isNotEmpty } from '../utils/validation';

import Input from './Input';

export default function CheckoutModal() {
    const {
        isCheckoutOpen, 
        toggleCheckoutModal,
        items
    } = useContext(CartContext);

    const {
        value: nameValue,
        handleInputChange: handleNameChange,
        handleInputBlur: handleNameBlur,
        hasError: nameHasError,
    } = useInput('', (value) => isNotEmpty(value));

    const {
        value: streetValue,
        handleInputChange: handleStreetChange,
        handleInputBlur: handleStreetBlur,
        hasError: streetHasError,
    } = useInput('', (value) => isNotEmpty(value));

    const {
        value: emailValue,
        handleInputChange: handleEmailChange,
        handleInputBlur: handleEmailBlur,
        hasError: emailHasError,
    } = useInput('', (value) => isNotEmpty(value) && isEmail(value));

    const {
        value: postalCodeValue,
        handleInputChange: handlePostalCodeChange,
        handleInputBlur: handlePostalCodeBlur,
        hasError: postalCodeHasError,
    } = useInput('', (value) => isNotEmpty(value));

    const {
        value: cityValue,
        handleInputChange: handleCityChange,
        handleInputBlur: handleCityBlur,
        hasError: cityHasError,
    } = useInput('', (value) => isNotEmpty(value));

    const subTotal = items.reduce(
        (accum, currentValue) => accum + (currentValue.price * currentValue.quantity), 0
    );

    const handleSubmit = (event) => {
        const sendOrder = async (data) => {
            const response = await postOrder(data);
            console.log('response', response);
        }

        event.preventDefault();
        const data = {
            customer: {
                name: nameValue,
                email: emailValue,
                street: streetValue,
                "postal-code": postalCodeValue,
                city: cityValue
            },
            items
        };

        sendOrder(data);
    }

    return <dialog open={isCheckoutOpen} className='modal'>
        <form className="cart" onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: ${subTotal}</p>
            <Input
                label="Full Name"
                id="name"
                type="name"
                onBlur={handleNameBlur}
                onChange={handleNameChange}
                value={nameValue}
                error={nameHasError && 'Full name field must not be empty.'}
            />
            <Input
                label="Email"
                id="email"
                type="email"
                onBlur={handleEmailBlur}
                onChange={handleEmailChange}
                value={emailValue}
                error={emailHasError && 'Email field must not be empty and email must contain an @ symbol.'}
            />
            <Input
                label="Street"
                id="street"
                type="street"
                onBlur={handleStreetBlur}
                onChange={handleStreetChange}
                value={streetValue}
                error={streetHasError && 'Street field must not be empty.'}
            />
            <div className="control-row">
                <Input
                    label="Postal Code"
                    id="postal-code"
                    type="postal-code"
                    onBlur={handlePostalCodeBlur}
                    onChange={handlePostalCodeChange}
                    value={postalCodeValue}
                    error={postalCodeHasError && 'Postal code field must not be empty.'}
                    style={{maxWidth: '200px'}}
                />
                <Input
                    label="City"
                    id="city"
                    type="city"
                    onBlur={handleCityBlur}
                    onChange={handleCityChange}
                    value={cityValue}
                    error={cityHasError && 'City field must not be empty.'}
                    style={{maxWidth: '200px'}}
                />              
            </div>
            <div className="modal-actions" style={{marginTop: '12px'}}>
                <button className='text-button' onClick={toggleCheckoutModal}>Close</button>
                <button type='submit' className='button'>Submit Order</button>
            </div>          
        </form>
    </dialog>
}