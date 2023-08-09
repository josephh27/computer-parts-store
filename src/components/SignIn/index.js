import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser, signInWithGoogle, resetAllAuthForms } from './../../redux/User/user.actions';
import userTypes from './../../redux/User/user.types';
import './styles.scss';
import Buttons from './../forms/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import FormInput from './../forms/FormInput';
import AuthWrapper from '../AuthWrapper';

const mapState = ({ user }) => ({
    signInSuccess: user.signInSuccess
})

const initialState = {
    email: '',
    password: ''
}

const SignIn = (props) => {
    const dispatch = useDispatch();
    const { signInSuccess } = useSelector(mapState);
    const [ state, setState ]  = useState(initialState);
    const { email, password } = state;
    const navigate = useNavigate();
    const configAuthWrapper = {
        headline: 'Login'
    };
    
    useEffect(() => {
        if (signInSuccess) {
            setState({
                ...initialState
            });
            dispatch(resetAllAuthForms());
            navigate('/');
        }

    }, [signInSuccess]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        })
    }
    
    const handleGoogleSignIn = () => {
         dispatch(signInWithGoogle());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signInUser({ email, password }));
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