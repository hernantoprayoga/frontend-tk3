import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditProduct = () => {
  const [name, setName] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [file, setFile] = useState("");
  const [hargabeli, setHargabeli] = useState("");
  const [hargajual, setHargajual] = useState("");
  const [preview, setPrivew] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPrivew(URL.createObjectURL(image));
  };

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setName(response.data.name);
        setDeskripsi(response.data.deskripsi);
        setHargabeli(response.data.hargabeli);
        setHargajual(response.data.hargajual);
        setFile(response.data.file);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/products/${id}`, {
        name: name,
        deskripsi: deskripsi,
        hargabeli: hargabeli,
        hargajual: hargajual,
        file: file,
      });
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">Edit Product</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateProduct}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" />
                </div>
              </div>
              <div className="field">
                <label className="label">Deskripsi</label>
                <div className="control">
                  <input type="text" className="input" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} placeholder="Deskripsi" />
                </div>
              </div>
              <div className="field">
                <label className="label">Harga Beli</label>
                <div className="control">
                  <input type="text" className="input" value={hargabeli} onChange={(e) => setHargabeli(e.target.value)} placeholder="Rp." />
                </div>
              </div>
              <div className="field">
                <label className="label">Harga Jual</label>
                <div className="control">
                  <input type="text" className="input" value={hargajual} onChange={(e) => setHargajual(e.target.value)} placeholder="Rp." />
                </div>
              </div>
              <div className="field">
                <label className="label">Image</label>
                <div className="control">
                  <div className="file">
                    <label className="file-label">
                      <input type="file" className="file-input" onChange={loadImage} />
                      <span className="file-cta">
                        <span className="file-label"> Choose a file... </span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
                  </button>
                </div>
              </div>
              {preview ? (
                <figure className="image is-128x128">
                  <img src={preview} alt="Preview Image" />
                </figure>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditProduct;
