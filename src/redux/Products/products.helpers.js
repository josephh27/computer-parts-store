import { firestore } from './../../firebase/utils';
import { collection, doc, setDoc, onSnapshot, getDocs, getDoc, deleteDoc, orderBy, query } from 'firebase/firestore';

export const handleAddProduct = product => {
    return new Promise((resolve, reject) => {
        setDoc(doc(collection(firestore, 'products')), 
            product
        ).then(() => {
            resolve();
        }).catch((err) => {
            reject(err);
        })
    })
}

export const handleFetchProducts = () => {
    return new Promise((resolve, reject) => {
        getDocs(query(collection(firestore, 'products'), orderBy('productPrice'))).then(snapshot => {
            const productsArray = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    documentID: doc.id
                }
            });
            resolve(productsArray)
        })
        .catch(err => {
            reject(err)
        })
        
    })
}

export const handleDeleteProduct = documentID => {
    return new Promise((resolve, reject) => {
        const docRef = doc(collection(firestore, 'products'), documentID);
        deleteDoc(docRef).then(() => {
            resolve();
        })
        .catch(err => {
            reject(err);
        })
    })
}
