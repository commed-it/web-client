import React from 'react';
import { remove } from '../../../utils';
import { useNavigate } from 'react-router-dom';


function DeleteProductModal(props) {
    const navigate = useNavigate();

    const handleDelete = (product) => {
        remove('/product/'+product+"/");
        navigate(-1);
    }

    return (
        <div>
            <div role="document" borderRadius="0.8rem">
                <div className="window ">
                    <div className="modal-header text-center">
                        <h4 color="#007a6e" className="modal-title w-100 font-weight-bold">
                            Delete Product
                        </h4>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                    <button className="registerButton btn btn-default" type="submit" onClick={() => handleDelete(props.productId)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteProductModal;