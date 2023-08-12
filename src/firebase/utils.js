import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import  { firebaseConfig } from './config';

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

export const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });



export const handleUserProfile = async ({ userAuth, additionalData }) => {
    if (!userAuth) return;
    const { uid } = userAuth;

    const userRef = doc(collection(firestore, "users"), `${uid}`);
    const snapshot = await getDoc(userRef);

    if (snapshot.exists) {
        const { displayName, email } = userAuth;
        const timestamp = new Date();

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdDate: timestamp,
                ...additionalData
            })
        } catch(err) {
            console.log(err);
        }
    }
    return userRef;
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, userAuth => {
            console.log(userAuth)
            unsubscribe();
            resolve(userAuth);
        }, reject);
    })
}