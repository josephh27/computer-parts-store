import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup  } from 'firebase/auth';
import  { firebaseConfig } from './config';

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => {
    signInWithPopup(auth, GoogleProvider);
}

export const handleUserProfile = async (userAuth, additionalData) => {
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