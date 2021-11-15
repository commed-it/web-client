import React from "react";
import "./Chat.css";

function Chat(props) {
  return (
    <div className="chatContainer">
      <div className="chatHeader">
        <div className="myProfile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="#373843"
            className="bi bi-person-circle centerIcon"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />{" "}
          </svg>{" "}
          <h5>My profile</h5>
        </div>
        <div className="partner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="#373843"
            className="bi bi-person-circle centerIcon"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />{" "}
          </svg>{" "}
          <button class="formalOfferButton mt-auto btn btn-primary">
            Formal offer
          </button>
        </div>
      </div>
      <div className="chatContent">
        <div className="chatContentLeft">
          <div className="chatBubble">
            <strong>Enterprise:</strong> A chat
          </div>
          <div className="chatBubble">
            {" "}
            <strong>Enterprise2:</strong> Another chat
          </div>
          <div className="chatBubble">
            {" "}
            <strong>Enterprise3:</strong> Another another chat
          </div>
          <div className="chatBubble">
            {" "}
            <strong>Enterprise4:</strong> Another another another chat
          </div>
          <div className="chatBubble">
            {" "}
            <strong>Enterprise5:</strong> Stack overflow
          </div>
          <div className="chatBubble">
            {" "}
            <strong>Enterprise6:</strong> Stack overflow 2.0
          </div>
          <div className="chatBubble">
            {" "}
            <strong>Enterprise7:</strong> buy pls
          </div>
        </div>
        <div className="chatContentRight">
          <div className="receiver">Hey, how are you?</div>
          <div className="alignSender">
            <div className="sender">Good, you?</div>
          </div>

          <div className="receiver">Good, you?</div>
          <div className="alignSender">
            <div className="sender">Good, you?</div>
          </div>
          <div className="receiver">Good, you?</div>
          <div className="alignSender">
            <div className="sender">Good, you?</div>
          </div>
          <div className="receiver">Good, and you?</div>
          <div className="inputPart">
            <input className="messageInput"></input>
            <button className="sendButton">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
