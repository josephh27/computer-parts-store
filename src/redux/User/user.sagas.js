import { takeLatest, call, all, put } from 'redux-saga/effects';
import userTypes from './user.types';
import { signInSuccess, signOutUserSuccess, resetPasswordSuccess, userError } from './user.actions';
import { auth, handleUserProfile, getCurrentUser, GoogleProvider } from '../../firebase/utils';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, signOut } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import { handleResetPasswordAPI } from './user.helpers';

export function* getSnapShopFromUserAuth(user, additionalData={}) {
    try {
        const userRef = yield call(handleUserProfile, { userAuth: user, additionalData });
        const snapshot = yield getDoc(userRef);
        yield put(
            signInSuccess({
                id: snapshot.id,
                ...snapshot.data()
            })
        );
        
    } catch(err) {
        console.log(err);
    }
}

export function* emailSignIn({ payload: { email, password }}) {
    try {
        const { user } = yield signInWithEmailAndPassword(auth, email, password); 
        yield getSnapShopFromUserAuth(user);
        
    } catch(err) {
        console.log(err);
    }
};

export function* onEmailSignInStart() {
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
};

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) {
            return
        }
        yield getSnapShopFromUserAuth(userAuth);
    } catch(err) {
        console.log(err);
    }
};

export function* onCheckUserSession() {
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutUser() {
    try {
        yield signOut(auth);
        yield put(
            signOutUserSuccess()
        )
    } catch(err) {
        console.log(err);
    }
}

export function* onSignOutUserStart() {
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* signUpUser({ payload: {
    displayName,
    email,
    password,
    confirmPassword
}}) {
    if (password !== confirmPassword) {
        const err = ['Password Don\'t Match'];
        yield put(
            userError(err)
        )
        return;
    }

    try {
        const { user } = yield createUserWithEmailAndPassword(auth, email, password);
        const additionalData = { displayName };
        yield getSnapShopFromUserAuth(user, additionalData);
        // yield call(handleUserProfile, { userAuth: user, additionalData: { displayName }});
    } catch (err) {
        console.log(err);
    }
}

export function* onSignUpUserStart() {
    yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}

export function* resetPassword({ payload: { email }}) {
    try {
        yield call(handleResetPasswordAPI, email);
        yield put(
            resetPasswordSuccess()
        )

    } catch(err) {
        yield put(
            userError(err)
        )
    }
}

export function* onResetPasswordStart() {
    yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword)
}

export function* googleSignIn() {
    try {
        const { user } = signInWithPopup(auth, GoogleProvider);
        yield getSnapShopFromUserAuth(user);

    } catch (err) {
        console.log(err)
    }
}










export function* onGoogleSignInStart() {
    yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

export default function* userSagas() {
    yield all([call(onEmailSignInStart),
        call(onCheckUserSession), 
        call(onSignOutUserStart), 
        call(onSignUpUserStart),
        call(onResetPasswordStart),
        call(onGoogleSignInStart)]);
}