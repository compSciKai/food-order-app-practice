import Logo from '../assets/logo.jpg';
import CartButton from './CartButton';

export default function Header() {


    return <menu id="main-header">
        <div id="title">
            <img src={Logo} alt="" />
            <h1>ReactFood</h1>
        </div>
        <CartButton />
    </menu>
}