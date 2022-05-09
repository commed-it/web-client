import React from "react";
import { useParams } from "react-router-dom";
import "./Product.css";
import { useNavigate } from "react-router-dom";
import { get, post } from "../../utils.js";
import EditProductModal from "./EditProductModal/EditProductModal";
import DeleteProductModal from "./DeleteProductModal/DeleteProductModal";
import { Modal } from "react-bootstrap";
import { Carousel } from "react-bootstrap";
import configData from "../../config.json";
import lang from "../../lang/cat.json"


function Product(props) {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [showEdit, setShowEdit] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);
  const [productDetails, setProductDetails] = React.useState([]);
  const [logedUser, setLogedUser] = React.useState(false);
  const [enterprise, setEnterprise] = React.useState({});

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
  const getEnterprise = async (product) => {
    const result = await get("/enterprise/" + product.owner + "/");
    const result_json = await result.json();
    console.log(enterprise);
    setEnterprise(result_json);
  };
  const getProductDetails = async () => {
    const result = await get("/product/" + productId + "/", false);
    const result_json = await result.json();
    setProductDetails(result_json);
    return result_json;
  };
  const getUserDetails = async () => {
    const result = await get("/auth/user/", true);
    const result_json = await result.json();
    setLogedUser(result_json);
    console.log(logedUser);
  };
  React.useEffect(() => {
    async function loadOwner() {
      var product = await getProductDetails();
      await getEnterprise(product);
    }
    loadOwner();

    getUserDetails();
  }, []);

  const handleContact = async () => {
    var data = {
      client: logedUser.pk,
      product: productDetails.id,
    };
    var result = await post("/offer/encounter/create-if-not-exists", data);
    if (result.ok) {
      var result_json = await result.json();
      navigate("/chat/" + result_json.encounter.id);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <div className="topDiv col-xs-12 col-sm-12 col-md-12 col-lg-12">
    <div className="parent2 row">
      <div className="container2">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-start">
          <button className="btn btn-circle btn-sm goBackBtn d-flex justify-content-start align-items-center" onClick={handleGoBack}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          </button>
        </div>
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
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12"></div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <p className="card-text col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
                {productDetails.description}
              </p>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex linkRow">
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
            <div className="d-flex col-xs-6 col-sm-6 col-md-6 col-lg-6 linkRow">
              <div className=" enterprise">
                <a href={"/profile/" + productDetails.owner}>
                  <img
                    src={enterprise.profileImage}
                    className="enterpriseProfile"
                  />
                  <h5>{enterprise.name}</h5>
                </a>
              </div>
              {logedUser.pk != undefined &&
                logedUser.pk != productDetails.owner && (
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 row justify-content-end">
                    <button
                      className="btn2 btn col-xs-12 col-sm-12 col-md-12 col-lg-12"
                      onClick={handleContact}
                    >
                      {lang.product.contact}
                    </button>
                  </div>
                )}
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
                {lang.product.edit}
              </button>
              <button
                className="buttonProduct2 btn btn-danger mt-3"
                onClick={handleShowDelete}
              >
                {lang.product.delete}
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
        contentClassName="custom-modal-style"
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
          owner={logedUser.pk}
          close={handleCloseDelete}
        ></DeleteProductModal>
      </Modal>
    </div>
    </div>
  );
}

export default Product;
