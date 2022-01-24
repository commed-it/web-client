import React from 'react';
import { Carousel } from 'react-bootstrap';
import './EditProfileModal.css';
import { get, put, convertBase64 } from '../../../utils';
import { useNavigate } from 'react-router';

function EditProfileModal(props) {

    const navigate = useNavigate();

    const [enterprise, setEnterprise] = React.useState("");
    const [name, setName] = React.useState("");
    const [nif, setNif] = React.useState("");
    const [contactInfo, setContactInfo] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [profileImage, setProfileImage] = React.useState([]);
    const [bannerImage, setBannerImage] = React.useState([]);
    const [formResult, setFormResult] = React.useState(0);
    const [msgError, setMsgError] = React.useState("");

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
              Product Succesfully updated! :)
            </div>
          );
        } else {
          return (
            <div
              class="alert alert-danger col-xs-12 col-sm-12 col-md-12 col-lg-12"
              role="alert"
            >
              Error Updating Product. Check the data is correct.{msgError}
            </div>
          );
        }
      };

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleNifChange = (event) => {
        setNif(event.target.value)
    }
    
    const handleContactInfoChange = (event) => {
        setContactInfo(event.target.value)
    }
    
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleProfileImage = (event) => {
        console.log(event.target.files[0])
        setProfileImage(event.target.files[0])
    }

    const handleBannerImage = (event) => {
        console.log(event.target.files[0])
        setBannerImage(event.target.files[0])
    }

    const handleEdit = async () => {
        var data = {
            owner : props.userId,
            NIF : nif,
            name : name,
            contactInfo : contactInfo,
            description : description,
        };
        if(bannerImage != ""){
            var b64Banner = await convertBase64(bannerImage)
            data.bannerImage = b64Banner
        }
        if(profileImage != ""){
            var b64Profile = await convertBase64(profileImage)
            data.profileImage = b64Profile
        }
        var result = await put('/enterprise/'+enterprise.id+'/', data);
        if (result.ok){
            window.location.reload()
        }else{
          var error_json = await result.json()
          var error_message = "";
          for(var key in error_json) {
            error_message += " "+ key + " : "+ error_json[key];
          }
          setMsgError(error_message);
          setFormResult(-1)
        }
    }

    const getEnterpriseDetails = async () => {
        const result = await get("/enterprise/user/" + props.userId, false);
        const result_json = await result.json();
        return result_json;
    };


    React.useEffect(async () => {
        var enterprise = await getEnterpriseDetails();
        setName(enterprise.name);
        setNif(enterprise.NIF);
        setContactInfo(enterprise.contactInfo);
        setDescription(enterprise.description);
        setEnterprise(enterprise)
      }, []);

    return (
    <div role="document" borderRadius="0.8rem">
      <div className="window ">
            <div className="modal-header text-center">
                <h4 color="#007a6e" className="modal-title w-100 font-weight-bold">
                    Edit Profile
                </h4>
                </div>
                {getComponent()}
                <div className="modal-body mx-3 border-0">
                    Name:
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
                        id="defaultForm-name"
                        className="inputs form-control validate"
                        onChange={handleNameChange}
                        value = {name}
                        />
                    </div>
                    NIF:
                    <div className="md-form mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ced4da" class="bi bi-credit-card icons" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
                    </svg>
                        <input
                        type="text"
                        id="defaultForm-nif"
                        className="inputs form-control validate"
                        onChange={handleNifChange}
                        value = {nif}
                        />
                    </div>
                    Contact Info:
                    <div class="md-form mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ced4da" class="bi bi-sticky icons" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>            
                        </svg>
                        <input
                        type="text"
                        id="defaultForm-contactinfo"
                        class="inputs form-control validate"
                        onChange={handleContactInfoChange}
                        value = {contactInfo}
                        ></input>
                    </div>
                    Description:
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
                        id="defaultForm-description"
                        class="inputs form-control validate"
                        onChange={handleDescriptionChange}
                        value = {description}
                        ></textarea>
                    </div>
                    Profile Image:
                    <div class="md-form mb-5">
                        <input
                        type="file"
                        id="defaultForm-description"
                        class="inputs form-control validate"
                        onChange={handleProfileImage}
                        ></input>
                    </div>
                    Banner Image:
                    <div class="md-form mb-5">
                        <input
                        type="file"
                        id="defaultForm-description"
                        class="inputs form-control validate"
                        onChange={handleBannerImage}
                        ></input>
                    </div>
                    {getComponent()}
                    <div className="modal-footer d-flex justify-content-center">
                        <button className="registerButton btn btn-default" type="submit" onClick={handleEdit}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfileModal;