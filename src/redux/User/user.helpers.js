import { auth } from './../../firebase/utils';
import { sendPasswordResetEmail } from 'firebase/auth';

export const handleResetPasswordAPI = (email) => {
    return new Promise((resolve, reject) => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            resolve();
        })
        .catch(() => {
            const err = ['Email not found. Please try again.'];
            reject(err);
        });
    })
}