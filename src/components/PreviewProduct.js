import axios from "axios";
import React, { useState, useEffect } from "react";

const PreviewProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    setProducts(response.data);
  };
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/products/${productId}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="columns is-multiline">
        {products.map((product) => (
          <div className=" column is-one-quarter" key={product.id}>
            <div class="card">
              <div class="card-image">
                <figure class="image is-square">
                  <img src={product.url} alt="Image" />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p className="title is-5  pb-3 has-text-link	">{product.name}</p>
                    <p className="subtitle is-6">Harga Beli: Rp.{product.hargabeli}</p>
                    <p className="title is-5 has-text-danger pb-2">Harga Jual: Rp.{product.hargajual}</p>
                    <p className="title is-7">Description: </p>
                    <p className="subtitle is-7">{product.deskripsi}</p>
                  </div>
                </div>
              </div>
              <footer className="card-footer"></footer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewProduct;
