import React from 'react';
import './styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutUserStart } from './../../redux/User/user.actions';
import { selectCartItemsCount } from './../../redux/Cart/cart.selectors';
import Logo from './../../assets/logo.png';


const mapState = (state) => ({
    currentUser: state.user.currentUser,
    totalNumCartItems: selectCartItemsCount(state)
});


const Header = props => {
    const dispatch = useDispatch();
    const { currentUser, totalNumCartItems } = useSelector(mapState);

    const signOut = () => {
        dispatch(signOutUserStart());
    };

    return (
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} alt="Simple Logo" />
                    </Link>
                </div>

                <nav>
                    <ul>
                        <li>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/search">
                                Search
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="callToActions">
                    <ul>
                        <li>
                            <Link to="/cart">
                                Your Cart ({totalNumCartItems})
                            </Link>
                        </li>
                        {currentUser && [
                            <li>
                                <Link to="/dashboard">
                                    My Account
                                </Link>
                            </li>,
                            <li>
                                <a onClick={() => signOut()}>
                                    Logout
                                </a>
                            </li>
                        ]}

                        {!currentUser && [
                            <li>
                                <Link to="/registration">
                                    Register
                                </Link>
                            </li>,
                            <li>
                                <Link to="/login">
                                    Login
                                </Link>
                            </li>
                        ]}
                    </ul>  
                </div>
            </div>
        </header>
    );
};

Header.defaultProps = {
    currentUser: null
}

export default Header;