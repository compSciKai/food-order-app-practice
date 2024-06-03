import { useContext } from 'react';
import Logo from '../assets/logo.jpg';
import { CartContext } from '../store/cart-context';

export default function Header() {
    const { items } = useContext(CartContext);

    return <menu id="main-header">
        <div id="title">
            <img src={Logo} alt="" />
            <h1>ReactFood</h1>
        </div>
        <button className='text-button'>Cart ({items.length})</button>
    </menu>
}