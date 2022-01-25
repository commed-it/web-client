import React from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import  configData  from '../../config.json';
import { get, patch } from '../../utils.js';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { Carousel } from "react-bootstrap";

import './Signature.css'

function Signature(props) {

    const navigate = useNavigate();
    const { foId } = useParams();
    const [formalOffers, setFormalOffers] = React.useState(null);
    const [numPages, setNumPages] = React.useState(1);
    const [pageNumber, setPageNumber] = React.useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
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

    const handleSign = async () => {
        var data = {
            state : "SI"
        }
        var result = await patch("/offer/formaloffer/"+ foId +"/", data);
        if (result.ok){
            navigate("/chat/"+formalOffers.encounter.id)
        }
    }

    const getFormalOffers = async () => {
        const result = await get("/offer/formaloffer/fromFo/" + foId);
        const result_json = await result.json();
        setFormalOffers(result_json);
    };

    React.useEffect(() => {
        getFormalOffers();
    }, []);

    return (
        <div className='container-fluid divSignature'>
            <div className='row'>
            { formalOffers && 
                <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center' style={{ paddingTop: 20 }}>
                    <div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center align-items-center divPagesAndButtons'>
                            <button className='btn buttonPages d-flex justify-content-center align-items-center' onClick={handleSign} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{paddingRight: 5 }}class="bi bi-file-earmark-check" viewBox="0 0 16 16">
                                    <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                                </svg> 
                                Sign
                            </button>
                        </div>
                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center align-items-center divPagesAndButtons'>
                            <button className='btn buttonPages col-xs-4 col-sm-3 col-md-2 col-lg-2' onClick={handlePrevPage}>Previous</button>
                            <div className='labelPages d-flex justify-content-center align-items-center'>
                                Page {pageNumber} of {numPages}
                            </div>
                            <button className='btn buttonPages col-xs-4 col-sm-3 col-md-2 col-lg-2' onClick={handleNextPage} >Next</button>
                        </div>
                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center align-items-center divPagesAndButtons'>
                            <a href={configData.SERVER_URL + formalOffers.formalOffer.pdf} target="_blank" class="aDownload" >
                                Download File
                            </a>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center">
                            <Document
                                file={configData.SERVER_URL + formalOffers.formalOffer.pdf}
                                onLoadSuccess={onDocumentLoadSuccess}
                            >
                                <Page pageNumber={pageNumber} />
                            </Document>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    );
}

export default Signature;