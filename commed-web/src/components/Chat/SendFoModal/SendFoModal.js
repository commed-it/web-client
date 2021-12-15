import React, { useState } from "react";
import "./SendFoModal.css";
import configData from "../../../config.json";
import { sessionService } from "redux-react-session";
import { post, convertBase64 } from "../../../utils.js";

function FoModal(props) {
  const [contract, setContract] = useState({});

  const handleContractUpload = (event) => {
    setContract(event.target.files[0]);
  };

  const handleSendFo = async () => {
    var b64Contract = await convertBase64(contract);
    var data = {
      contract: contract.name,
      encounterId: props.encounterId,
      pdf: b64Contract,
      state: "NS",
    };
    const result = await post("/offer/formaloffer/", data, true);
    var result_json = await result.json();
    if (result.ok) {
      data = {
        user: props.user,
        type: "formalOffer",
        formalOffer: result_json.id,
      };
      props.sendFO(JSON.stringify(data));
      props.close();
    }
  };

  return (
    <div>
      <div role="document" borderRadius="0.8rem">
        <div className="window ">
          <div className="modal-header text-center">
            <h4 color="#007a6e" className="modal-title w-100 font-weight-bold">
              Send Formal Offer
            </h4>
          </div>
          <div className="modal-body mx-3 border-0">
            <div className="md-form mb-5">
              <input
                type="file"
                id="contract"
                className="inputs form-control validate"
                placeholder="Contract"
                onChange={handleContractUpload}
              />
              <label
                data-error="wrong"
                data-success="right"
                htmlFor="defaultForm-email"
              ></label>
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button
              className="loginButton btn btn-default"
              onClick={handleSendFo}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoModal;
