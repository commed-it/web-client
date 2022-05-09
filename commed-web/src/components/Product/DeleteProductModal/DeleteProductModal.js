import React from 'react';
import { remove } from '../../../utils';
import { useNavigate } from 'react-router-dom';
import lang from "../../../lang/cat.json"


function DeleteProductModal(props) {
    const navigate = useNavigate();

    const handleDelete = (product) => {
        remove('/product/'+product+"/");
        navigate("/profile/"+props.owner+"/products");
    }

    return (
        <div>
            <div role="document" borderRadius="0.8rem">
                <div className="window ">
                    <div className="modal-header text-center">
                        <h4 color="#007a6e" className="modal-title w-100 font-weight-bold">
                            {lang.product.modal.delete.title}
                        </h4>
                    </div>
                    <div className='text-center'>
                        <p>
                            {lang.product.modal.delete.body}
                        </p>
                    </div>
                        
                    <div className="modal-footer d-flex justify-content-center">
                    <button className="registerButton btn btn-default" type="submit" onClick={() => handleDelete(props.productId)}>{lang.product.modal.delete.btn}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteProductModal;