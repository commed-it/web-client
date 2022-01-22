import React from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import  configData  from '../../config.json';
import { get } from '../../utils.js';
import { useParams } from "react-router-dom";
import './FormalOffer.css';


function FormalOffer(props) {

    const { foId } = useParams();
    const [logedUser, setLogedUser] = React.useState(false);
    const [formalOffers, setFormalOffers] = React.useState({});
    const [numPages, setNumPages] = React.useState(1);
    const [pageNumber, setPageNumber] = React.useState(1);


    const getLoggedUser = async () => {
        const result = await get("/auth/user/", true);
        const result_json = await result.json();
        setLogedUser(result_json);
    };
    
    const getFormalOffers = async () => {
        const result = await get("/offer/formaloffer/fromFo/" + foId, true);
        const result_json = await result.json();
        setFormalOffers(result_json);
    };

    React.useEffect(() => {
        getLoggedUser();
        getFormalOffers();
    }, []);

    return (
        <div className='container-fuild overflowProperty'>
            <div className='row'>
                { logedUser && formalOffers != {} && 
                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                    <div className='row'>
                        <div className='col-xs-5 col-sm-5 col-md-5 col-lg-5 foInfo'>
                            <div className='d-flex justify-content-between col-xs-12 col-sm-12 col-md-12 col-lg-12'>
                                <h1>{formalOffers.formalOffer.contract}</h1>
                                { (formalOffers.formalOffer.state === "SI")  &&
                                    <span class="d-flex justify-content-between align-items-center badge bg-success">Signed</span>
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xs-7 col-sm-7 col-md-7 col-lg-7 pdfViewer'>
                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center align-items-center divPagesAndButtons'>
                                <button className='btn buttonPages'>Previous</button>
                                <div className='labelPages d-flex justify-content-center align-items-center'>
                                    Page {pageNumber} of {numPages}
                                </div>
                                <button className='btn buttonPages'>Next</button>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center">
                                <Document
                                    file={configData.SERVER_URL + formalOffers.formalOffer.pdf}
                                >
                                    <Page pageNumber={pageNumber} />
                                </Document>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    );
}

export default FormalOffer;