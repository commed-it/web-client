import React from "react";
import { useParams } from "react-router-dom";
import "./Product.css";
import { useNavigate } from "react-router-dom";
import { get } from "../../utils.js";
import EditProductModal from "./EditProductModal/EditProductModal";
import DeleteProductModal from "./DeleteProductModal/DeleteProductModal";
import { Modal } from "react-bootstrap";
import { Carousel } from "react-bootstrap";

function Product(props) {
  const { productId } = useParams();

  const [showEdit, setShowEdit] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);
  const [productDetails, setProductDetails] = React.useState([]);
  const [logedUser, setLogedUser] = React.useState(false);

  const handleCloseEdit = () => {
    setShowEdit(false);
  };
  const handleShowEdit = () => {
    setShowEdit(true);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleShowDelete = () => {
    setShowDelete(true);
  };
  const getProductDetails = async () => {
    const result = await get("/product/" + productId + "/", false);
    const result_json = await result.json();
    setProductDetails(result_json);
  };
  const getUserDetails = async () => {
    const result = await get("/auth/user/", true);
    const result_json = await result.json();
    setLogedUser(result_json);
  };
  React.useEffect(() => {
    getProductDetails();
    getUserDetails();
  }, []);

  return (
    <div className="parent2 row">
      <div className="container2">
        <div className="cardDescription col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex">
          <div className="withPicture col-xs-12 col-sm-12 col-md-6 col-lg-6 d-flex ">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 align-self-center card-img2">
              <Carousel>
                {productDetails.images &&
                  productDetails.images.map((image) => {
                    return (
                      <Carousel.Item>
                        <img className="d-block w-100" src={image.image} />
                      </Carousel.Item>
                    );
                  })}
              </Carousel>
            </div>
          </div>
          <div className="card-body2 col-xs-12 col-sm-12 col-md-6 col-lg-6 d-flex justify-content-end">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <h1 className="card-title2 col-xs-12 col-sm-12 col-md-12 col-lg-12">
                {productDetails.title}
              </h1>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <h6 className="card-subtitle2 col-xs-12 col-sm-12 col-md-12 col-lg-12 text-muted ">
                Category
              </h6>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <p className="card-text col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
                {productDetails.description}
              </p>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex">
              {productDetails.tag &&
                productDetails.tag.map((tag) => {
                  return (
                    <span className="badge badge-pill badge-secondary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        fill="currentColor"
                        className="bi bi-tag-fill "
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                      </svg>
                      {tag.name}
                    </span>
                  );
                })}
            </div>
            <div className="d-flex align-items-center col-xs-12 col-sm-12 col-md-12 col-lg-12 linkRow">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 enterprise">
                <a href={"/profile/"+productDetails.owner}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="#373843"
                  className="bi bi-person-circle centerIcon"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
                </a>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 justify-content-end">
                <button className="buttonProduct2 btn btn-danger mt-3">
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
        {productDetails.owner == logedUser.pk &&
          productDetails.owner != undefined &&
          logedUser.pk != undefined && (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-start">
              <button
                className="buttonProduct2 btn btn-danger mt-3"
                onClick={handleShowEdit}
              >
                Edit
              </button>
              <button
                className="buttonProduct2 btn btn-danger mt-3"
                onClick={handleShowDelete}
              >
                Delete
              </button>
            </div>
          )}
      </div>
      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        id="editFrom"
        role="dialog"
        aria-labelledby="myModalLabel"
        width="50%"
      >
        <EditProductModal
          productId={productId}
          close={handleCloseEdit}
        ></EditProductModal>
      </Modal>
      <Modal
        show={showDelete}
        onHide={handleCloseDelete}
        id="editFrom"
        role="dialog"
        aria-labelledby="myModalLabel"
        width="50%"
      >
        <DeleteProductModal
          productId={productId}
          close={handleCloseDelete}
        ></DeleteProductModal>
      </Modal>
    </div>
  );
}

export default Product;
