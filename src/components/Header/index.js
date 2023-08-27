import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutUserStart } from './../../redux/User/user.actions';
import './styles.scss';
import { firestore } from './../../firebase/utils';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import Logo from './../../assets/logo.png';


const mapState = ({ user }) => ({
    currentUser: user.currentUser
});


const Header = props => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(mapState);

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
                    {currentUser && (
                        <ul className="linkContainer">
                            <li>
                                <Link to="/dashboard">
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <a onClick={() => signOut()}>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    )}

                    {!currentUser && (
                        <ul className="linkContainer">
                            <li>
                                <Link to="/registration">
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link to="/login">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    )}
                    
                </div>
            </div>
        </header>
    );
};

Header.defaultProps = {
    currentUser: null
}

export default Header;