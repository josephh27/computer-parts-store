import { firestore } from './../../firebase/utils';
import { collection, doc, setDoc, onSnapshot, getDocs, getDoc, deleteDoc, orderBy, query, where, limit, startAfter } from 'firebase/firestore';

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

export const handleFetchProducts = ({ filterType, startAfterDoc, persistProducts=[] }) => {
    return new Promise((resolve, reject) => {
        const pageSize = 6;

        let ref = collection(firestore, 'products');
        if (filterType) {
            if (startAfterDoc) {
                ref = query(ref, where('productCategory', '==', filterType), limit(pageSize), startAfter(startAfterDoc))
            } else {
                ref = query(ref, where('productCategory', '==', filterType), limit(pageSize))
            }
        

        } else {
            if (startAfterDoc) {
                ref = ref = query(ref, limit(pageSize), startAfter(startAfterDoc))
            } else {
                ref = query(ref, limit(pageSize));
            }
        }

        getDocs(ref, orderBy('productPrice')).then(snapshot => {
            let totalCount = snapshot.size;
            const data = [
                ...persistProducts,
                ...snapshot.docs.map(doc => {
                    return {
                        ...persistProducts,
                        ...doc.data(),
                        documentID: doc.id
                    }
                })
            ];
            
            console.log(snapshot.size);
            resolve({
                data,
                queryDoc: snapshot.docs[totalCount - 1],
                isLastPage: snapshot.size < 6
            })
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
