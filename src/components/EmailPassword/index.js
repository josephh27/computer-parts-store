import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userTypes from './../../redux/User/user.types';
import './styles.scss';
import { resetPassword, resetAllAuthForms } from '../../redux/User/user.actions';
import AuthWrapper from '../AuthWrapper';
import FormInput from '../forms/FormInput';
import Button from './../forms/Button';

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError
})

const initialState = {
    email: '',
    errors: []
};

const EmailPassword = (props) => {
    const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState(initialState);
    const { email, errors } = state;

    useEffect(() => {
        if (resetPasswordSuccess) {
            dispatch(resetAllAuthForms());
            navigate('/login');
        }
    }, [resetPasswordSuccess]);

    useEffect(() => {
        if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
            setState({
                ...state,
                errors: resetPasswordError
            })
        }
    }, [resetPasswordError]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword({ email }));
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