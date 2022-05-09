import React from "react";
import "./CreateProductModal.css";
import { get, post, convertBase64 } from "../../../utils";
import { map } from "jquery";
import { useNavigate } from "react-router";
import lang from "../../../lang/eng.json"



function CreateProductModal(props) {

  const navigate = useNavigate();
  const [msgError, setMsgError] = React.useState("");

  const [formResult, setFormResult] = React.useState(0);
  const [imagesCount, setImagesCount] = React.useState(0);

  const getComponent = () => {
    console.log(formResult);
    if (formResult == 0) {
      return <div></div>;
    } else if (formResult == 1) {
      return (
        <div
          class="alert alert-success col-xs-12 col-sm-12 col-md-12 col-lg-12"
          role="alert"
        >
          {lang.product.modal.create.succesfull}
        </div>
      );
    } else {
      return (
        <div
          class="alert alert-danger col-xs-12 col-sm-12 col-md-12 col-lg-12"
          role="alert"
        >
          {lang.product.modal.create.error}
          {msgError}
        </div>
      );
    }
  };

  const [owner, setOwner] = React.useState("");

  React.useEffect(async () => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const result = await get("/auth/user/", true);
    const result_json = await result.json();
    setOwner(result_json.pk);
  };

  const handleOwner = (event) => {
    setOwner(event.target.value);
  };

  const [title, setTitle] = React.useState("");

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const [description, setDescription] = React.useState("");

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const [newImage, setNewImage] = React.useState("");

  const handleNewImage = async (event) => {
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    setNewImage({name : file.name, image:base64});
  };

  const [newImages, setNewImages] = React.useState([]);

  const handleNewImages = (event) => {
    var uploadedImages = newImages;
    console.log(newImage);
    uploadedImages.push(newImage);
    console.log(uploadedImages);
    setNewImages(uploadedImages);
    setImagesCount(imagesCount + 1);
  };

  const [tags, setTags] = React.useState("");

  const handleTags = (event) => {
    setTags(event.target.value);
  };

  const [latitude, setLatitude] = React.useState("");

  const handleLatitude = (event) => {
    setLatitude(event.target.value);
  };

  const [longitude, setLongitude] = React.useState("");

  const handleLongitude = (event) => {
    setLongitude(event.target.value);
  };

  const handleCreate = async () => {
    var formTags = tags.split(" ");
    var requestTags = [];
    for (var i = 0; i < formTags.length; i++) {
      requestTags.push({ name: formTags[i] });
    }
    var data = {
      owner: owner,
      title: title,
      images: newImages,
      description: description,
      longitude: longitude,
      latitude: latitude,
      tag: requestTags,
    };
    var result = await post("/product/", data);
    if (result.ok) {
      setFormResult(1);
      navigate("/profile/"+owner+"/products");
      window.location.reload();
    } else {
      var error_json = await result.json()
      var error_message = "";
      for(var key in error_json) {
        error_message += " "+ key + " : "+ error_json[key];
      }
      setMsgError(error_message);
      setFormResult(-1);
    }
  };

  return (
    <div role="document" borderRadius="0.8rem" className="modal-window1">
      <div className="window ">
        <div className="modal-header text-center">
          <h4 color="#007a6e" className="modal-title w-100 font-weight-bold">
            {lang.product.modal.create.title}
          </h4>
        </div>
        {getComponent()}
        <div className="modal-body mx-3 border-0">
          <div class="md-form mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ced4da"
              class="bi bi-sticky icons"
              viewBox="0 0 16 16"
            >
              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />{" "}
            </svg>
            <input
              type="text"
              id="defaultForm-username"
              class="inputs form-control validate"
              onChange={handleTitle}
              value={title}
              placeholder={lang.product.modal.titles.title}
            ></input>
          </div>
          <div class="md-form mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ced4da"
              class="bi bi-telephone-fill icons"
              viewBox="0 0 16 16"
            >
              <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
              <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
            </svg>
            <textarea
              type="text"
              id="defaultForm-number"
              class="inputs form-control validate"
              onChange={handleDescription}
              value={description}
              placeholder={lang.product.modal.titles.title}
            ></textarea>
          </div>
          <div className="md-form mb-5">
            <div className="imageProperties">{lang.product.modal.titles.upload_img}</div>
            <div className="d-flex justify-content-center imageProperties">
              <input
                type="file"
                id="defaultForm-username"
                class="inputs form-control validate"
                onChange={handleNewImage}
              ></input>
              <button
                className="registerButton btn btn-default"
                onClick={handleNewImages}
              >
                {lang.product.modal.titles.upload}
              </button>
            </div>
            <div className="justify-content-center imageProperties">
              {newImages &&
                newImages.map((image) => {
                  return <div>{image.name}</div>;
                })}
            </div>
          </div>
          <div className="md-form mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ced4da"
              class="bi bi-lock-fill icons"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1A1.5 1.5 0 0 0 1 2.5v11A1.5 1.5 0 0 0 2.5 15h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 15 8.586V2.5A1.5 1.5 0 0 0 13.5 1h-11zM2 2.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V8H9.5A1.5 1.5 0 0 0 8 9.5V14H2.5a.5.5 0 0 1-.5-.5v-11zm7 11.293V9.5a.5.5 0 0 1 .5-.5h4.293L9 13.793z" />
            </svg>
            <input
              type="text"
              id="defaultForm-pass"
              className="inputs form-control validate"
              onChange={handleTags}
              value={tags}
              placeholder={lang.product.modal.titles.tags}
            />
            <label style={{fontSize: 11, color: "grey"}}>({lang.product.modal.titles.spaces})</label>
            <label
              data-error="wrong"
              data-success="right"
              htmlFor="defaultForm-pass"
            ></label>
          </div>
          <div class="md-form mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ced4da"
              class="bi bi-sticky icons"
              viewBox="0 0 16 16"
            >
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
            <input
              type="text"
              id="defaultForm-username"
              class="inputs form-control validate"
              onChange={handleLatitude}
              value={latitude}
              placeholder={lang.product.modal.titles.latitude}
            ></input>
          </div>
          <div class="md-form mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#ced4da"
              class="bi bi-sticky icons"
              viewBox="0 0 16 16"
            >
              <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
            <input
              type="text"
              id="defaultForm-username"
              class="inputs form-control validate"
              onChange={handleLongitude}
              value={longitude}
              placeholder={lang.product.modal.titles.longitude}
            ></input>
          </div>
        </div>
        {getComponent()}
        <div className="modal-footer d-flex justify-content-center">
          <button
            className="registerButton btn btn-default"
            type="submit"
            onClick={handleCreate}
          >
            {lang.product.modal.create.btn}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateProductModal;
