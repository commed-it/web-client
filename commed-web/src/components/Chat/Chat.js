import React from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { get, patch } from "../../utils.js";
import useWebSocket, { ReadyState } from "react-use-websocket";
import configData from "../../config.json";
import { getTokenFromSession } from "../../utils.js";
import ScrollToBottom from "react-scroll-to-bottom";
import { Modal } from "react-bootstrap";
import FoModal from "./SendFoModal/SendFoModal.js";

function Chat(props) {
  const [encounters, setEncounters] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [logedUser, setLogedUser] = React.useState({});
  const [chat, setChat] = React.useState("");
  const [newMessage, setNewMessage] = React.useState("");
  const [socketUrl, setSocketUrl] = React.useState("ws://echo.websocket.org");
  const [messageEvent, setMessageEvent] = React.useState(0);
  const [showFoModal, setShowFoModal] = React.useState(false);

  const handleShowFoModal = () => {
    setShowFoModal(true);
  };

  const handleCloseFoModal = () => {
    setShowFoModal(false);
  };

  const handleMessageEvent = () => {
    setMessageEvent(messageEvent + 1);
    getMessages(chat);
  };

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onMessage: () => {
      handleMessageEvent();
    },
  });

  const getLoggedUser = async () => {
    const result = await get("/auth/user/", true);
    const result_json = await result.json();
    setLogedUser(result_json);
    return result_json;
  };

  const getUsers = async () => {
    const result = await get("/enterprise/", true);
    const result_json = await result.json();
    setUsers(result_json);
    return result_json;
  };

  const handleChangeActiveChat = (id) => {
    setChat(id);
    getMessages(id);
    startSocket(id);
  };

  const startSocket = React.useCallback(
    (id) =>
      setSocketUrl("ws://" + configData.SERVER_HOST + "/ws/chat/" + id + "/"),
    []
  );

  const handleClickSendMessage = () => {
    var message = {
      user: logedUser.pk,
      type: "message",
      message: newMessage,
    };
    if (!(newMessage === null || newMessage.match(/^ *$/) !== null))
      sendMessage(JSON.stringify(message));
  };
  const handleEnterSendMessage = (e) => {
    if (e.keyCode == 13) {
      var message = {
        user: logedUser.pk,
        type: "message",
        message: newMessage,
      };
      if (!(newMessage === null || newMessage.match(/^ *$/) !== null))
        sendMessage(JSON.stringify(message));
      e.target.value = "";
    }
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSignature = async (message) => {
    var content = JSON.parse(message.msg)
    console.log(content)
    content.formalOffer.state="SI"
    message.msg = JSON.stringify(content)
    var result = await patch("/chat/encounter/"+message.channel_context+"/messages/"+message.id+"/", {msg: message.msg});
    var result = await patch("/offer/formaloffer/"+content.formalOffer.id+"/", {state : "SI"});
    setMessageEvent(messageEvent+1);
  }

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const getEncounters = async (user) => {
    const result = await get("/offer/encounter/fromUser/" + user.pk);
    const result_json = await result.json();
    setEncounters(result_json);
    console.log(encounters);
  };

  const getMessages = async (id) => {
    const result = await get("/chat/encounter/" + id + "/messages/", true);
    const result_json = await result.json();
    setMessages(result_json.reverse());
  };

  const createMessage = (message) => {
    var content = JSON.parse(message.msg)
    if (content.type == "message") {
      return content.message;
    } else {
        return (
          <div>
            <div className="messageDivision">
              <h5>{content.formalOffer.contract}</h5>
            </div>
            <div className="bottomMessage">
            { content.user == logedUser.pk && 
              <a href={configData.SERVER_URL + content.formalOffer.pdf}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-file-earmark-medical" viewBox="0 0 16 16">
                  <path d="M7.5 5.5a.5.5 0 0 0-1 0v.634l-.549-.317a.5.5 0 1 0-.5.866L6 7l-.549.317a.5.5 0 1 0 .5.866l.549-.317V8.5a.5.5 0 1 0 1 0v-.634l.549.317a.5.5 0 1 0 .5-.866L8 7l.549-.317a.5.5 0 1 0-.5-.866l-.549.317V5.5zm-2 4.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
                  <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                </svg>
                { (content.formalOffer.state === "SI")  &&
                  <span className="badge bg-light">Signed</span>
                }
                { (content.formalOffer.state == "NS") &&
                  <span className="badge rounded-pill bg-warning text-dark">Pending</span>
                }
            </a>
            }
            { content.user != logedUser.pk && 
              <a href={configData.SERVER_URL + content.formalOffer.pdf}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-file-earmark-medical" viewBox="0 0 16 16">
                  <path d="M7.5 5.5a.5.5 0 0 0-1 0v.634l-.549-.317a.5.5 0 1 0-.5.866L6 7l-.549.317a.5.5 0 1 0 .5.866l.549-.317V8.5a.5.5 0 1 0 1 0v-.634l.549.317a.5.5 0 1 0 .5-.866L8 7l.549-.317a.5.5 0 1 0-.5-.866l-.549.317V5.5zm-2 4.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
                  <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                </svg>
                { (content.formalOffer.state === "SI")  &&
                  <span className="badge bg-light">Contract Signed</span>
                }
            </a>
            }
            </div>
            { content.user != logedUser.pk && (content.formalOffer.state == "NS") &&
                <div className="bottomMessage">
                  <button className="btn btnSign" onClick={() => handleSignature(message)}>Sign</button>
                </div>
            }
          </div>
        )
    };
      }
      

  React.useEffect(() => {
    async function initChat() {
      var user = await getLoggedUser();
      await getEncounters(user);
    }
    initChat();
    getUsers();
  }, [messages]);

  return (
    <div className="chatContainer">
      <div className="chatHeader">
        <div className="myProfile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="#373843"
            class="bi bi-chat-text-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.5 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z" />
          </svg>{" "}
          <h5>My chats</h5>
        </div>
        {chat != "" &&
          encounters &&
          encounters.map((encounter) => {
            if (
              encounter.encounter.id == chat &&
              encounter.product.owner == logedUser.pk
            ) {
              return (
                <div className="partner">
                  <div className="partnerLeft">
                    <img
                      src={
                        configData.SERVER_URL +
                        encounter.theOtherClient.profileImage
                      }
                    />
                    <h5>{encounter.theOtherClient.name}</h5>
                  </div>
                  <button
                    class="formalOfferButton mt-auto btn btn-primary"
                    onClick={handleShowFoModal}
                  >
                    Formal offer
                  </button>
                </div>
              );
            }
            if (
              encounter.encounter.id == chat &&
              encounter.encounter.client == logedUser.pk
            ) {
              return (
                <div className="partner">
                  <div className="partnerLeft">
                    <img
                      src={
                        configData.SERVER_URL +
                        encounter.theOtherClient.profileImage
                      }
                    />
                    <h5>{encounter.theOtherClient.name}</h5>
                  </div>
                </div>
              );
            }
          })}
      </div>
      <div className="chatContent">
        <div className="chatContentLeft">
          {encounters &&
            encounters.map((encounter) => {
              if (encounter.encounter.id == chat) {
                return (
                  <button className="chatBubbleActive" value={encounter.id}>
                    {" "}
                    <img
                      src={
                        configData.SERVER_URL +
                        encounter.theOtherClient.profileImage
                      }
                      className="chatBubbleImage"
                    />
                    <strong>
                      {encounter.theOtherClient.name +
                        " - " +
                        encounter.product.title}
                    </strong>
                  </button>
                );
              } else {
                return (
                  <button
                    className="chatBubble"
                    onClick={() =>
                      handleChangeActiveChat(encounter.encounter.id)
                    }
                    value={encounter.encounter.id}
                  >
                    {" "}
                    <img
                      src={
                        configData.SERVER_URL +
                        encounter.theOtherClient.profileImage
                      }
                      className="chatBubbleImage"
                    />
                    <strong>
                      {encounter.theOtherClient.name +
                        " - " +
                        encounter.product.title}
                    </strong>
                  </button>
                );
              }
            })}
        </div>
        <div className="chatContentRight">
          <div className="inputPart">
            <input
              className="messageInput form-control"
              onChange={handleInputChange}
              onKeyUp={handleEnterSendMessage}
            ></input>
            <button
              className="sendButton btn"
              onClick={handleClickSendMessage}
              disabled={readyState !== ReadyState.OPEN}
            >
              Send
            </button>
          </div>
          <ScrollToBottom className="scrollable">
            {messages &&
              messages.map((message) => {
                var isAuthor = message.author == logedUser.pk;
                return (
                  <div>
                    {isAuthor ? (
                      <div className="alignSender">
                        <div className="sender">
                          {createMessage(message)}
                        </div>
                      </div>
                    ) : (
                      <div className="alignReceiver">
                        <div className="receiver">
                          {createMessage(message)}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </ScrollToBottom>
        </div>
      </div>
      <Modal
        show={showFoModal}
        onHide={handleCloseFoModal}
        id="modalLoginForm"
        role="dialog"
        aria-labelledby="myModalLabel"
        width="50%"
      >
        <FoModal
          close={handleCloseFoModal}
          encounterId={chat}
          sendFO={sendMessage}
          user={logedUser.pk}
        ></FoModal>
      </Modal>
    </div>
  );
}

export default Chat;
