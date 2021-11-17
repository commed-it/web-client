import React from 'react';
import { Carousel } from 'react-bootstrap';
import './EditProductModal.css';
import { get, put } from '../../../utils';

function EditProductModal(props) {

    const [owner, setOwner] = React.useState("")

    const handleOwner = (event) => {
        setOwner(event.target.value);
    }

    const [title, setTitle] = React.useState("")

    const handleTitle = (event) => {
        setTitle(event.target.value);
    }

    const [description, setDescription] = React.useState("")

    const handleDescription = (event) => {
        setDescription(event.target.value);
    }

    const [images, setImages] = React.useState([]);

    const handleDeleteImage = () => {
        var newImages = []
        for(var i = 0; i<images.length; i++){
            if (i!=index){
                newImages.push(images[i]);
            }
        }
        setImages(newImages);
    }

    const [newImage, setNewImage] = React.useState("");

    const handleNewImage = (event) => {
        setNewImage(event.target.value);
    }

    const [newImages, setNewImages] = React.useState([]);

    const handleNewImages = (event) => {
        var uploadedImages = newImages;
        console.log(newImage)
        uploadedImages.push(newImage);
        console.log(uploadedImages)
        setNewImages(uploadedImages);
    }

    const [index, setIndex] = React.useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const [tags, setTags] = React.useState("")

    const handleTags = (event) => {
        setTags(event.target.value);
    }   

    const [latitude, setLatitude] = React.useState(0)

    const handleLatitude = (event) => {
        setLatitude(event.target.value)
    }

    const [longitude, setLongitude] = React.useState(0)

    const handleLongitude = (event) => {
        setLongitude(event.target.value)
    }

    const handleEdit = async () => {
        var formTags = tags.split(" ");
        var requestTags = []
        for (var i = 0; i<formTags.length; i++){
          requestTags.push({"name" : formTags[i]});
        }
        var data = {
            owner : owner,
            title : title,
            images : images,
            description : description,
            longitude : longitude,
            latitude : latitude,
            tag: requestTags
        };
        var result = await put('/product/'+props.productId+'/', data);
    }

    const getProductDetails = async () => {
        const result = await get("/product/" + props.productId + "/", true);
        const result_json = await result.json();
        return result_json
    };

    React.useEffect(async () => {
        var result = await getProductDetails();
        setOwner(result.owner);
        setTitle(result.title);
        setDescription(result.description);
        setImages(result.images);
        var tags_string = "";
        if (result.tag)
            result.tag.map((tag) => { tags_string += (tag.name+" ") })
        setTags(tags_string);
        setLatitude(result.latitude);
        setLongitude(result.longitude);
      }, []);

    return (
        <div>
    <div role="document" borderRadius="0.8rem">
      <div className="window ">
        <div className="modal-header text-center">
          <h4 color="#007a6e" className="modal-title w-100 font-weight-bold">
            Edit Product
          </h4>
        </div>
        <div className="modal-body mx-3 border-0">
          <div class="md-form mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ced4da" class="bi bi-sticky icons" viewBox="0 0 16 16">
            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>            </svg>
            <input
              type="text"
              id="defaultForm-username"
              class="inputs form-control validate"
              onChange={handleTitle}
              value = {title}
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
               <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
            </svg>
            <textarea
              type="text"
              id="defaultForm-number"
              class="inputs form-control validate"
              onChange={handleDescription}
              value = {description}
            ></textarea>
          </div>
          <div className="md-form mb-5">
            <Carousel activeIndex={index} onSelect={handleSelect}>
                { images && 
                    images.map((image) => {
                        return (
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src={image.image}
                                />
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
            <div className="d-flex justify-content-center imageProperties">
                <button className="registerButton btn btn-default" type="submit" onClick={handleDeleteImage}>Delete</button>
            </div>
            <div className="d-flex justify-content-center imageProperties">
                <input
                type="file"
                id="defaultForm-username"
                class="inputs form-control validate"
                onChange={handleNewImage}
                ></input>
                <button className="registerButton btn btn-default" onClick={handleNewImages}>
                  Upload
                </button>
            </div>
            <div className="justify-content-center imageProperties">
                { newImages &&
                    newImages.map((image) => {
                        return(
                            <div>
                                {image}
                            </div>
                        )
                    })
                }
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
            <path d="M2.5 1A1.5 1.5 0 0 0 1 2.5v11A1.5 1.5 0 0 0 2.5 15h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 15 8.586V2.5A1.5 1.5 0 0 0 13.5 1h-11zM2 2.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V8H9.5A1.5 1.5 0 0 0 8 9.5V14H2.5a.5.5 0 0 1-.5-.5v-11zm7 11.293V9.5a.5.5 0 0 1 .5-.5h4.293L9 13.793z"/>
            </svg>
            <input
              type="text"
              id="defaultForm-pass"
              className="inputs form-control validate"
              onChange={handleTags}
              value = {tags}
            />
            <label
              data-error="wrong"
              data-success="right"
              htmlFor="defaultForm-pass"
            ></label>
          </div>
          <div class="md-form mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ced4da" class="bi bi-sticky icons" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>            
            </svg>
            <input
              type="text"
              id="defaultForm-username"
              class="inputs form-control validate"
              onChange={handleLatitude}
              value = {latitude}
            ></input>
          </div>
          <div class="md-form mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ced4da" class="bi bi-sticky icons" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>            
            </svg>
            <input
              type="text"
              id="defaultForm-username"
              class="inputs form-control validate"
              onChange={handleLongitude}
              value = {longitude}
            ></input>
          </div>
        </div>
        <div className="modal-footer d-flex justify-content-center">
          <button className="registerButton btn btn-default" type="submit" onClick={handleEdit}>Update</button>
        </div>
      </div>
    </div>
    </div>
    );
}

export default EditProductModal;