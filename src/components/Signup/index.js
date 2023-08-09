import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import userTypes from '../../redux/User/user.types';
// import { createSelector } from 'reselect';
import { signUpUser, resetAllAuthForms } from './../../redux/User/user.actions';
import './styles.scss';
import  FormInput from './../forms/FormInput';
import Button from './../forms/Button';
import AuthWrapper from '../AuthWrapper';

const mapState = ({ user }) => ({
    signUpSuccess: user.signUpSuccess,
    signUpError: user.signUpError
})

const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
};

const Signup = (props) => {
    const { signUpSuccess, signUpError } = useSelector(mapState);
    const dispatch = useDispatch();
    const [state, setState] = useState(initialState);
    const { displayName, email, password, confirmPassword, errors } = state;
    const navigate = useNavigate();
    const configAuthWrapper = {
        headline: 'Registration'
    };

    useEffect(() => {  
        if (signUpSuccess) {
            setState({
                ...initialState
             })
            dispatch(resetAllAuthForms());
            navigate('/')
        }
      
    }, [signUpSuccess]);

    useEffect(() => {
        if (Array.isArray(signUpError) && signUpError.length > 0) {
            setState({
                ...state,
                errors: signUpError
             })
        }
    }, [signUpError]);


    const handleChangeForm = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value, 
        });
    }    

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        dispatch(signUpUser({
            displayName,
            email,
            password,
            confirmPassword, 
        }));
    }
    
    return (
        <AuthWrapper {...configAuthWrapper}>
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
                        handleChange={handleChangeForm}
                    />

                    <FormInput 
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={handleChangeForm}
                    />

                    <FormInput 
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        handleChange={handleChangeForm}
                    />

                    <FormInput 
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        handleChange={handleChangeForm}
                    />

                    <Button type="submit"> 
                        Register
                    </Button>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default Signup;