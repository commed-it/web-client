import React from "react";
import { useParams } from "react-router-dom";
import "./Product.css";
import { useNavigate } from "react-router-dom";
import { get } from "../../utils.js";

function Product(props) {
    
    const { productId } = useParams();

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
    <div className="parent2">
      <div className="container2">
        <div className="row2">
          <div class="cardDescription">
            <div class="justify-content-space-evenly">
              <div className="withPicture">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="#009688"
                  class="bi bi-caret-left-fill iconsHome"
                  viewBox="0 0 16 16"
                >
                  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
                </svg>
                <img
                  class="card-img2"
                  src={() => productDetails.images[0].image}
                  alt="Product image"
                ></img>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="#009688"
                  class="bi bi-caret-right-fill iconsHome"
                  viewBox="0 0 16 16"
                >
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
                </svg>
              </div>

              <div class="card-body2">
                <h1 class="card-title2">{productDetails.title}</h1>
                <h6 class="card-subtitle mb-2 text-muted">Category</h6>
                <p class="card-text">{productDetails.description}</p>
                <span class="badge badge-pill badge-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    fill="currentColor"
                    class="bi bi-tag-fill "
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                  </svg>
                  Tag1
                </span>
                <span class="badge badge-pill badge-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    fill="currentColor"
                    class="bi bi-tag-fill "
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                  </svg>
                  Tag2
                </span>
                <div class="buy d-flex align-items-center ">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill="#373843"
                      class="bi bi-person-circle justify-content-left align-items-left align-self-left "
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path
                        fill-rule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                      />{" "}
                    </svg>{" "}
                    <h6>Enterprise</h6>
                  </div>
                  <a class="buttonProduct2 btn btn-danger mt-3">Contact</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
