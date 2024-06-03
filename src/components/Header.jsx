import Logo from '../assets/logo.jpg';

export default function Header({cartItemCount}) {
    return <menu id="main-header">
        <div id="title">
            <img src={Logo} alt="" />
            <h1>ReactFood</h1>
        </div>
        <button className='text-button'>Cart ({cartItemCount})</button>
    </menu>
}