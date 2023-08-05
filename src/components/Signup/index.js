import React, { useState, setState } from 'react';
import './styles.scss';
import  FormInput from './../forms/FormInput';
import Button from './../forms/Button';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, handleUserProfile } from './../../firebase/utils';

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
};

const Signup = (props) => {
    const [state, setState] = useState(initialState);
    const { displayName, email, password, confirmPassword, errors } = state;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value, 
        });
    }    

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            const err = ['Password Don\'t Match'];
            setState({
                errors: err
            })
            return;
        }

        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await handleUserProfile(user, { displayName });
            setState({
                ...initialState
            })
        } catch (err) {
            
        }
    }
    
    return (
        <div className="signup">
            <div className="wrap">
                <h2>
                    Signup
                </h2>
                
                <div className="formWrap">
                    {errors.length > 0 && (
                        <ul>
                            {errors.map((err, index) => {
                                return (
                                <li key={index}>
                                    {err}
                                </li>
                                )
                            })}
                        </ul>
                    )}
                    <form onSubmit={handleFormSubmit}>
                        <FormInput 
                            type="text"
                            name="displayName"
                            value={displayName}
                            placeholder="Full name"
                            onChange={handleChange}
                        />

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

                        <FormInput 
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            onChange={handleChange}
                        />

                        <Button type="submit"> 
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;