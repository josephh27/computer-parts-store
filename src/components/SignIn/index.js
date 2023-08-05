import React, { useState } from 'react';
import './styles.scss';
import Buttons from './../forms/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithGoogle, auth } from '../../firebase/utils';
import FormInput from './../forms/FormInput';

const initialState = {
    email: '',
    password: ''
}

const SignIn = (props) => {
    const [ state, setState ]  = useState(initialState);
    const { email, password } = state;

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
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="signin">
            <div className="wrap">
                <h2>
                    LogIn
                </h2>
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
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;