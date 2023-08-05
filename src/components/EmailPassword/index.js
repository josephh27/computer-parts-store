import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.scss';
import { auth } from './../../firebase/utils';
import { sendPasswordResetEmail } from 'firebase/auth';

import AuthWrapper from '../AuthWrapper';
import FormInput from '../forms/FormInput';
import Button from './../forms/Button';

const initialState = {
    email: '',
    errors: []
};

const EmailPassword = (props) => {
    const [state, setState] = useState(initialState);
    const { email, errors } = state;
    const navigate = useNavigate();

    const configAuthWrapper = {
        headline: 'Email Password'
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { email } = state; 
            await sendPasswordResetEmail(auth, email)
                .then(() => {
                    navigate("/login");
                })
                .catch(() => {
                    const err = ['Email not found. Please try again.'];
                    setState({
                        ...state,
                        errors: err
                    })
                })
        } catch(err) {

        }
    }

    return ( 
        <AuthWrapper {...configAuthWrapper}>
            <div className="formWrap">
                {errors.length > 0 && (
                    <ul>
                        {errors.map((e, index) => {
                            return (
                                <li key={index}>
                                    {e}
                                </li>
                            );
                        })}
                    </ul>
                )}

                <form onSubmit={handleSubmit}>
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={handleChange}
                    />

                    <Button type="submit">
                        Email Password
                    </Button>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default EmailPassword;