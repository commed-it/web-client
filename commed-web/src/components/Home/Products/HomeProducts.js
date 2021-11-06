import React from 'react';
import './HomeProducts.css';
import configData from "../../../config.json";


function HomeProducts(props) {

  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    fetch(configData.SERVER_URL+"/product/",
      {
          method : 'GET',
      })
      .then(results => results.json())
      .then(data => {
        console.log(data.results);
        setProducts(data.results);
      });
    }, []);

    console.log(products);

    return (
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            {products.map((product) => { return(
                    <div class="card" style="width: 18rem;">
                      <img class="card-img-top" src={product.images[0]} alt="Product Card Image"></img>
                      <div class="card-body">
                        <h5 class="card-title">{product.title}</h5>
                        <p class="card-text">{product.description}</p>
                        <a href="#" class="btn btn-primary">Go to product</a>
                      </div>
                    </div>
                    );
                  }
                )
            }
        </div>
    );
}

export default HomeProducts;