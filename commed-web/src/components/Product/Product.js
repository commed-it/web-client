import React from 'react';
import { Route } from 'react-router';
import { useParams } from 'react-router-dom'


function Product(props) {

    const {productId} = useParams();

    return (
        <div>
            {productId}
        </div>
    );
}

export default Product;