import React from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { get } from "../../utils.js";
import useWebSocket, { ReadyState } from "react-use-websocket";
import configData from "../../config.json";
import { getTokenFromSession } from "../../utils.js";

function Chat(props) {
  const [encounters, setEncounters] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [logedUser, setLogedUser] = React.useState({});
  const [chat, setChat] = React.useState("");
  const [newMessage, setNewMessage] = React.useState("");
  const [socketUrl, setSocketUrl] = React.useState("ws://echo.websocket.org");

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  const getLoggedUser = async () => {
    const result = await get("/auth/user/", true);
    const result_json = await result.json();
    console.log(result_json);
    setLogedUser(result_json);
    return result_json;
  };

  const getUsers = async () => {
    const result = await get("/enterprise/", true);
    const result_json = await result.json();
    console.log(result_json);
    setUsers(result_json);
    return result_json;
  };

  const handleChangeActiveChat = (id) => {
    setChat(id);
    getMessages(id);
    startSocket(id);
  };

  const startSocket = React.useCallback(
    (id) => setSocketUrl("ws://localhost:7000/ws/chat/" + id + "/"),
    []
  );

  const handleClickSendMessage = React.useCallback(
    (newMessage) => sendMessage({ user: logedUser.pk, text: newMessage }),
    []
  );

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const getEncounters = async (user) => {
    const result = await get("/offer/encounter/user/" + user.pk);
    const result_json = await result.json();
    console.log(result_json);
    setEncounters(result_json);
  };

  const getMessages = async (id) => {
    const result = await get("/chat/encounter/" + id + "/messages/", true);
    const result_json = await result.json();
    setMessages(result_json);
    console.log(result_json);
  };

  const handleInitChat = async () => {};

  React.useEffect(() => {
    async function initChat() {
      var user = await getLoggedUser();
      await getEncounters(user);
    }
    initChat();
    getUsers();
    console.log(users);
  }, []);

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
        {chat != "" &&
          encounters &&
          encounters.map((encounter) => {
            if (
              encounter.id == chat &&
              encounter.product.owner == logedUser.pk
            ) {
              return (
                <div className="partner">
                  <h5>{encounter.client.name}</h5>
                  <button class="formalOfferButton mt-auto btn btn-primary">
                    Formal offer
                  </button>
                </div>
              );
            }
            if (
              encounter.id == chat &&
              encounter.client.owner == logedUser.pk
            ) {
              var i = encounter.product.owner;
              return (
                <div className="partner">
                  <h5>{users[i - 1].name}</h5>
                </div>
              );
            }
          })}
      </div>
      <div className="chatContent">
        <div className="chatContentLeft">
          {encounters &&
            encounters.map((encounter) => {
              console.log(encounter);
              if (encounter.id == chat) {
                return (
                  <button className="chatBubbleActive" value={encounter.id}>
                    {" "}
                    <strong>
                      {encounter.client.name + " - " + encounter.product.title}
                    </strong>
                  </button>
                );
              } else {
                console.log(encounter);
                console.log(encounter.client.name);
                console.log(encounter.product.title);
                return (
                  <button
                    className="chatBubble"
                    onClick={() => handleChangeActiveChat(encounter.id)}
                    value={encounter.id}
                  >
                    {" "}
                    <strong>
                      {encounter.client.name + " - " + encounter.product.title}
                    </strong>
                  </button>
                );
              }
            })}
        </div>
        <div className="chatContentRight">
          {messages &&
            messages.map((message) => {
              var isAuthor = message.author == logedUser.pk;
              console.log(isAuthor);
              return (
                <div>
                  {isAuthor ? (
                    <div className="alignSender">
                      <div className="sender">{message.msg}</div>
                    </div>
                  ) : (
                    <div className="receiver">{message.msg}</div>
                  )}
                </div>
              );
            })}
          <div className="inputPart">
            <input
              className="messageInput"
              onChange={handleInputChange}
            ></input>
            <button
              className="sendButton"
              onClick={handleClickSendMessage}
              disabled={readyState !== ReadyState.OPEN}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
