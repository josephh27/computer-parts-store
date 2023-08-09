import userTypes from './user.types';
import { auth, handleUserProfile, GoogleProvider } from '../../firebase/utils';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup } from 'firebase/auth';

export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
})

export const resetAllAuthForms = () => ({
    type: userTypes.RESET_AUTH_FORMS,
})

export const signInUser = ({ email, password }) => async dispatch => {
    try {
        await signInWithEmailAndPassword(auth, email, password); 
        dispatch({
            type: userTypes.SIGN_IN_SUCCESS,
            payload: true
        });
    } catch(err) {
        console.log(err);
    }
}

export const signUpUser = ({ displayName, email, password, confirmPassword }) => async dispatch => {
    if (password !== confirmPassword) {
        const err = ['Password Don\'t Match'];
        dispatch({
            type: userTypes.SIGN_UP_ERROR,
            payload: err
        });
        return;
    }

    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await handleUserProfile(user, { displayName });
        dispatch({
            type: userTypes.SIGN_UP_SUCCESS,
            payload: true
        });
        
    } catch (err) {
        console.log(err);
    }
};

export const resetPassword = ({ email }) => async dispatch => {
    try {
        await sendPasswordResetEmail(auth, email)
            .then(() => {
                dispatch({
                    type: userTypes.RESET_PASSWORD_SUCCESS,
                    payload: true
                });
            })
            .catch(() => {
                const err = ['Email not found. Please try again.'];
                dispatch({
                    type: userTypes.RESET_PASSWORD_ERROR,
                    payload: err
                })
            });
    } catch(err) {

    }
}

export const signInWithGoogle = () => async dispatch => {

    try {
        await signInWithPopup(auth, GoogleProvider)
        .then(() => {
            dispatch({
                type: userTypes.SIGN_IN_SUCCESS,
                payload: true
            });
        })
    } catch (err) {
        console.log(err)
    }
}