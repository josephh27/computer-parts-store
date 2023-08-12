import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { emailSignInStart, googleSignInStart } from './../../redux/User/user.actions';
import './styles.scss';
import Buttons from './../forms/Button';
import FormInput from './../forms/FormInput';
import AuthWrapper from '../AuthWrapper';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const initialState = {
    email: '',
    password: ''
}

const SignIn = (props) => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(mapState);
    const [ state, setState ]  = useState(initialState);
    const { email, password } = state;
    const navigate = useNavigate();
    const configAuthWrapper = {
        headline: 'Login'
    };
    
    useEffect(() => {
        if (currentUser) {
            setState({
                ...initialState
            });
            navigate('/');
        }

    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        })
    }
    
    const handleGoogleSignIn = () => {
         dispatch(googleSignInStart());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(emailSignInStart({ email, password }));
    }

    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
                <form onSubmit={handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={email}     
                        placeholder="Email"
                        onChange={handleChange}                   
                    />

                    <FormInput
                        type="password"
                        name="password"
                        value={password}     
                        placeholder="Password"        
                        onChange={handleChange}                     
                    />
                    
                    <Buttons type="submit">
                        Login
                    </Buttons>
                    <div className="socialSignin">
                        <div className="row">
                            <Buttons onClick={handleGoogleSignIn}>
                                Sign in with Google
                            </Buttons>
                        </div>
                    </div>

                    <div className="links">
                        <Link to="/recovery">
                            Reset Password
                        </Link>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    );
};

export default SignIn;