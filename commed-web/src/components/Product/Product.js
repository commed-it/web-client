import React from 'react';
import { Route } from 'react-router';
import { useParams } from 'react-router-dom'
import { get } from '../../utils.js';



function Product(props) {

    const {productId} = useParams();

    const [productDetails, setProductDetails] = React.useState([]);

    const getProductDetails = async () => {
        console.log(productId)
        const result = await get('/product/'+productId+'/', false);
        const result_json = await result.json();
        setProductDetails(result_json);
    }

    React.useEffect(() => {
        getProductDetails();
      }, []);

    return (
        <div>
            {JSON.stringify(productDetails)}
        </div>
    );
}

export default Product;