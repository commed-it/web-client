import "../Profile.css";
import "./ProfileProduct.css";
import { get } from "../../../utils";
import { useParams } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
import { untilTherteeChars } from "../../../utils";
import { Carousel } from "react-bootstrap";
import configData from "../../../config.json";
import { Modal } from "react-bootstrap";
import CreateProductModal from "../../Product/CreateProductModal/CreateProductModal";


function ProfileProduct(props) {
  const { userId } = useParams();
  const [enterpriseDetails, setEnterpriseDetails] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [showCreateProduct, setShowCreateProduct] = React.useState(false);
  const navigate = useNavigate();

  const handleCloseCreateProduct = () => {
    setShowCreateProduct(false);
  };

  const handleShowCreateProduct = () => {
    setShowCreateProduct(true);
  };

  const getProducts = async () => {
    const result = await get("/product/user/" + userId, false);
    const result_json = await result.json();
    setProducts(result_json);
    console.log(result_json);
  };

  const getEnterpriseDetails = async () => {
    const result = await get("/enterprise/user/" + userId, false);
    const result_json = await result.json();
    console.log(result_json);
    setEnterpriseDetails(result_json);
  };
  const handleVisitProduct = (product) => {
    navigate({ pathname: "/product/" + product });
  };

  React.useEffect(() => {
    getEnterpriseDetails();
    getProducts();
  }, []);
  return (
    <div>
      <div>
        <div className="container4">
          <div className="top3">
            {products &&
              products.map((product) => {
                return (
                  <div class="card col-xs-12 col-sm-6 col-md-4 col-lg-3 productCard2">
                    <Carousel>
                      {product.images &&
                        product.images.map((image) => {
                          return (
                            <Carousel.Item>
                              <img
                                className="carouselImage d-block w-100"
                                src={configData.SERVER_URL + image.image}
                              />
                            </Carousel.Item>
                          );
                        })}
                    </Carousel>
                    <div class="d-flex flex-column card-body">
                      <h5 class="card-title">{product.title}</h5>
                      <p class="card-text">
                        {" "}
                        {product.description.length > 47
                          ? product.description.substring(0, 47) + "..."
                          : untilTherteeChars(product.description)}
                      </p>
                    </div>
                    <button
                      class="buttonProduct mt-auto btn btn-primary"
                      onClick={() => handleVisitProduct(product.id)}
                    >
                      Go to product
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        { props.logedUser.pk != undefined && props.logedUser.pk == userId &&
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center align-self-center">
              <button
                onClick={handleShowCreateProduct}
                className="button btn btn-sm rounded-pill d-flex justify-content-center align-self-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="#ffffff"
                  class="bi bi-plus-circle-fill icon d-flex justify-content-center align-self-center"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                </svg>
                <label style={{ color: "white", textDecoration: "none" , fontSize: 20}} className="d-flex justify-content-center align-self-center">Product</label>
              </button>
            </div>
          }
      </div>
      <Modal
        show={showCreateProduct}
        onHide={handleCloseCreateProduct}
        id="modalLoginForm"
        role="dialog"
        aria-labelledby="myModalLabel"
        contentClassName="custom-modal-style"
      >
        <CreateProductModal
          close={handleCloseCreateProduct}
        ></CreateProductModal>
      </Modal>
    </div>
  );
}

export default ProfileProduct;
