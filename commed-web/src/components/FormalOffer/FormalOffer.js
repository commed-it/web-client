import React from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import  configData  from '../../config.json';
import { get, post } from '../../utils.js';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { Carousel } from "react-bootstrap";
import './FormalOffer.css';
import { Modal } from "react-bootstrap";
import MailRedirectModal from "../Chat/MailRedirectModal/MailRedirectModal"


function FormalOffer(props) {

    const navigate = useNavigate();
    const { foId } = useParams();
    const [logedUser, setLogedUser] = React.useState(false);
    const [formalOffers, setFormalOffers] = React.useState(null);
    const [numPages, setNumPages] = React.useState(1);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [showModalRedirect, setShowModalRedirect] = React.useState(false);


    const getLoggedUser = async () => {
        const result = await get("/auth/user/", true);
        const result_json = await result.json();
        setLogedUser(result_json);
    };

    const handleVisitProduct = (product) => {
        navigate({ pathname: "/product/" + product });
      };
    
    const getFormalOffers = async () => {
        const result = await get("/offer/formaloffer/fromFo/" + foId, true);
        const result_json = await result.json();
        setFormalOffers(result_json);
    };

    const handleMoveToChat = (enconter) => {
        navigate("/chat/"+enconter)
    }

    const handleMoveToProfile = (userId) => {
        navigate("/profile/"+userId+"/")
    }

    const handleGoBack = () => {
        navigate(-1);
      }

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    const handleCloseMailRedirectModal = () => {
        setShowModalRedirect(false)
      }

    const handleSignature = async () => {
        post("/offer/formaloffer/start-signature",
        {
          fo: formalOffers.formalOffer.id
        },
        true)
        setShowModalRedirect(true);
      }

    const handleNextPage = () => {
        if (pageNumber + 1 <= numPages){
            setPageNumber(pageNumber+1)
        }
    }

    const handlePrevPage = () => {
        if (pageNumber - 1 >= 1){
            setPageNumber(pageNumber-1)
        }
    }

    React.useEffect(() => {
        getLoggedUser();
        getFormalOffers();
    }, []);

    return (
        <div className='container-fuild overflowProperty'>
            <div className='row'>
                { logedUser && formalOffers && 
                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                    <div className='row'>
                        <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6 foInfo'>
                            <div className='d-flex justify-content-between col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                <button className="btn btn-circle btn-sm goBackBtn d-flex justify-content-start align-items-center" onClick={handleGoBack}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                    </svg>
                                </button>
                                <h1>{formalOffers.formalOffer.contract}</h1>
                                { (formalOffers.formalOffer.state === "SI")  &&
                                    <span class="d-flex justify-content-between align-items-center rounded-pill badge bg-success">Signed</span>
                                }
                                { (formalOffers.formalOffer.state == "NS") &&
                                    <span class="d-flex justify-content-between align-items-center badge rounded-pill bg-warning text-dark">Pending</span>
                                }
                            </div>
                            <div className='row'>
                                <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                                    <div className="d-flex justify-content-center col-xs-12 col-sm-12 col-md-12 col-lg-12 cardTitle">
                                        Owner: { logedUser.pk == formalOffers.owner.id && 
                                            <label style={{ fontWeight: "bold" }}>(You)</label>
                                        }
                                    </div>
                                    <div className="d-flex justify-content-center col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <div className="card col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                            <img className="card-img-top" src={configData.SERVER_URL + formalOffers.owner.profileImage} alt="Card image cap"/>
                                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center divPagesAndButtons">
                                                {formalOffers.owner.name}
                                            </div>
                                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center divPagesAndButtons">
                                                {formalOffers.owner.contactInfo}
                                            </div>
                                            { logedUser.pk != formalOffers.owner.id && 
                                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center divPagesAndButtons">
                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 d-flex justify-content-center divPagesAndButtons">
                                                        <button className='btn col-xs-12 col-sm-12 col-md-12 col-lg-12 buttonPages' onClick={() => handleMoveToProfile(formalOffers.owner.id)}>Profile</button>
                                                    </div>
                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 d-flex justify-content-center divPagesAndButtons">
                                                        <button className='btn col-xs-12 col-sm-12 col-md-12 col-lg-12 buttonPages' onClick={() => handleMoveToChat(formalOffers.formalOffer.encounterId)}>Chat</button>
                                                    </div>
                                                </div>
                                            }
                                            { logedUser.pk == formalOffers.owner.id && 
                                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center divPagesAndButtons">
                                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center divPagesAndButtons">
                                                        <button className='btn col-xs-12 col-sm-12 col-md-12 col-lg-12 buttonPages' onClick={() => handleMoveToProfile(formalOffers.owner.id)}>Profile</button>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                                    <div className="d-flex justify-content-center col-xs-12 col-sm-12 col-md-12 col-lg-12 cardTitle">
                                        Client: { logedUser.pk == formalOffers.client.id && 
                                            <label style={{ fontWeight: "bold" }}> (You)</label>
                                        }
                                    </div>
                                    <div className="d-flex justify-content-center col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <div className="card  col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                            <img className="card-img-top" src={configData.SERVER_URL + formalOffers.client.profileImage} alt="Card image cap"/>
                                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center divPagesAndButtons">
                                                {formalOffers.client.name}
                                            </div>
                                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center divPagesAndButtons">
                                                {formalOffers.client.contactInfo}
                                            </div>
                                            { logedUser.pk != formalOffers.client.id && 
                                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center divPagesAndButtons">
                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 d-flex justify-content-center divPagesAndButtons">
                                                        <button className='btn col-xs-12 col-sm-12 col-md-12 col-lg-12  buttonPages' onClick={() => handleMoveToProfile(formalOffers.client.id)}>Profile</button>
                                                    </div>
                                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 d-flex justify-content-center divPagesAndButtons">
                                                        <button className='btn col-xs-12 col-sm-12 col-md-12 col-lg-12 buttonPages' onClick={() => handleMoveToChat(formalOffers.formalOffer.encounterId)}>Chat</button>
                                                    </div>
                                                </div>
                                            }
                                            { logedUser.pk == formalOffers.client.id && 
                                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center divPagesAndButtons">
                                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center divPagesAndButtons">
                                                        <button className='btn col-xs-12 col-sm-12 col-md-12 col-lg-12 buttonPages' onClick={() => handleMoveToProfile(formalOffers.client.id)}>Profile</button>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 productCardFO">
                                    <div class="d-flex justify-content-center col-xs-12 col-sm-12 col-md-12 col-lg-12 cardTitle">
                                        Product: 
                                    </div>
                                        <div class="card col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                            <Carousel>
                                            {formalOffers.product.images &&
                                                formalOffers.product.images.map((image) => {
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
                                            <h5 class="card-title">{formalOffers.product.title}</h5>
                                            <p class="card-text">
                                                {formalOffers.product.description}
                                            </p>
                                            <button
                                                class="buttonPages mt-auto btn col-xs-12 col-sm-12 col-md-12 col-lg-12"
                                                onClick={() => handleVisitProduct(formalOffers.product.id)}
                                            >
                                                Go to product
                                            </button>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6 pdfViewer'>
                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center align-items-center divPagesAndButtons'>
                                <button className='btn buttonPages col-xs-4 col-sm-3 col-md-2 col-lg-2' onClick={handlePrevPage}>Previous</button>
                                <div className='labelPages d-flex justify-content-center align-items-center'>
                                    Page {pageNumber} of {numPages}
                                </div>
                                <button className='btn buttonPages col-xs-4 col-sm-3 col-md-2 col-lg-2' onClick={handleNextPage} >Next</button>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center">
                                <Document
                                    file={configData.SERVER_URL + formalOffers.formalOffer.pdf}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                >
                                    <Page pageNumber={pageNumber} />
                                </Document>
                            </div>
                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center align-items-center divPagesAndButtons'>
                                <a href={configData.SERVER_URL + formalOffers.formalOffer.pdf} target="_blank" >
                                    Download File
                                </a>
                            </div>
                            { (formalOffers.formalOffer.state === "NS")  &&
                                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center align-items-center divPagesAndButtons'>
                                    <button class="btn buttonPages col-xs-4 col-sm-3 col-md-2 col-lg-2" onClick={handleSignature}>
                                        Sign
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                }
            </div>
            <Modal
            show={showModalRedirect}
            onHide={handleCloseMailRedirectModal}
            id="modalLoginForm"
            role="dialog"
            aria-labelledby="myModalLabel"
            width="50%"
        >
            <MailRedirectModal
            ></MailRedirectModal>
        </Modal>
        </div>
    );
}

export default FormalOffer;