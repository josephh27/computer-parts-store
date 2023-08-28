import { auth } from './../../firebase/utils';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import productTypes from './products.types';
import { setProducts, fetchProductsStart } from './products.actions'
import { handleAddProduct, handleFetchProducts, handleDeleteProduct } from './products.helpers';


export function* addProduct({ payload: {
    productCategory,
    productName,
    productThumbnail,
    productPrice
}}) {
    try {
        const timeStamp = new Date();
        yield handleAddProduct({
            productCategory,
            productName,
            productThumbnail,
            productPrice,
            productAdminUserUID: auth.currentUser.uid,
            createdDate: timeStamp
        });
        yield put(
            fetchProductsStart()
        );
    } catch(err) {
        console.log(err);
    }
}

export function* onAddProductStart() {
    yield takeLatest(productTypes.ADD_NEW_PRODUCTS_START, addProduct);
}

export function* fetchProducts({ payload: {
    filterType
}}) {
    try {
        const products = yield handleFetchProducts({ filterType });
        yield put(
            setProducts(products)
        )
    } catch(err) {
        console.log(err);
    }
}

export function* onFetchProductsStart() {
    yield takeLatest(productTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* deleteProduct({ payload }) {
    try {
        yield handleDeleteProduct(payload);
        yield put(
            fetchProductsStart()
        );
    } catch(err) {
        console.log(err);
    }
}

export function* onDeleteProductStart() {
    yield takeLatest(productTypes.DELETE_PRODUCT_START, deleteProduct)
}
export default function* productsSagas() {
    yield all([
        call(onAddProductStart), 
        call(onFetchProductsStart),
        call(onDeleteProductStart)
    ])
}

