import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsStart } from '../../redux/Products/products.actions';
import Product from './Product';
import FormSelect from '../forms/FormSelect';
import './styles.scss'
import { useNavigate, useParams } from 'react-router-dom';

const mapState = ({ productsData }) => ({
    products: productsData.products
})

const ProductResults = ({}) =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products } = useSelector(mapState); 
    const { filterType } = useParams();

    useEffect(() => {
        dispatch(
            fetchProductsStart({ filterType }) 
        )
    }, [filterType]);

    const handleFilter = (e) => {
        const nextFilter = e.target.value;
        navigate(`/search/${nextFilter}`); 
    };

    if (!Array.isArray(products)) return null;
    if (products.length < 1) {
        <div className="products">
            <p>
                No search results.
            </p>
        </div>
    }

    const configFilters = {
        defaultValue: filterType,
        options: [{
            name: 'Show all',
            value: ''
        }, {
            name: 'Laptop',
            value: 'laptop'
        }, {
            name: 'Desktop',
            value: 'desktop'
        }],
        handleChange: handleFilter
    };

    return (
        <div className="products">
            <h1>Browse Products</h1>
            <FormSelect {...configFilters}/>
            <div className="productResults">
                {products.map((product, pos) => {
                    const { productThumbnail, productName, productPrice } = product;
                    if (!productThumbnail || !productName ||
                        typeof productPrice === 'undefined') return null;

                    const configProduct = {
                        productThumbnail,
                        productName,
                        productPrice
                    }
                    return(
                        <Product {...configProduct} />
                    )
                })}
            </div>
        </div>
    );
};

export default ProductResults;