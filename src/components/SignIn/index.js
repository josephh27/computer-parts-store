import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
import Buttons from './../forms/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithGoogle, auth } from '../../firebase/utils';
import FormInput from './../forms/FormInput';
import AuthWrapper from '../AuthWrapper';

const initialState = {
    email: '',
    password: ''
}

const SignIn = (props) => {
    const [ state, setState ]  = useState(initialState);
    const { email, password } = state;
    const configAuthWrapper = {
        headline: 'Login'
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = state;
        try {
            await signInWithEmailAndPassword(auth, email, password); 
            setState({
                ...initialState
            });
            console.log("LOGGEDD IN")
        } catch(err) {
            console.log(err);
        }
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
                            <Buttons onClick={signInWithGoogle}>
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