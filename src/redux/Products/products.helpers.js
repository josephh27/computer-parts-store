import { firestore } from './../../firebase/utils';
import { collection, doc, setDoc, onSnapshot, getDocs, getDoc, deleteDoc, orderBy, query, where } from 'firebase/firestore';

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

export const handleFetchProducts = ({ filterType }) => {
    return new Promise((resolve, reject) => {
        let ref = collection(firestore, 'products');
        if (filterType) {
            ref = query(ref, where('productCategory', '==', filterType));
        }

        getDocs(ref, orderBy('productPrice')).then(snapshot => {
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
