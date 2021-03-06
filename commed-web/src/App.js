import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import Product from "./components/Product/Product";
import Profile from "./components/Profile/Profile";
import FormalOffer from "./components/FormalOffer/FormalOffer";
import Chat from "./components/Chat/Chat.js";
import Signature from "./components/Signature/Signature";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { combineReducers, createStore } from "redux";
import { sessionReducer, sessionService } from "redux-react-session";
import { sessionExist } from "./utils";
import NotFound from "./NotFound";

function App() {
  const reducers = {
    session: sessionReducer,
  };

  const reducer = combineReducers(reducers);

  const store = createStore(reducer);

  const options = {
    refreshOnCheckAuth: true,
    redirectPath: "/",
    driver: "COOKIES",
  };

  sessionService
    .initSessionService(store, options)
    .then(() =>
      console.log(
        "Redux React Session is ready and a session was refreshed from your storage"
      )
    )
    .catch(() =>
      console.log(
        "Redux React Session is ready and there is no session in your storage"
      )
    );

    
  return (
    <BrowserRouter>
    <div className="fill-window App container-fluid">
      <div>
        <Header></Header>
      </div>
      <div className="Body">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/search/:search" element={<Search />} />
            <Route path="/search/" element={<Search />} />
            <Route path="/signature/:foId" element={<Signature />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/profile/:userId/" element={<Profile />} />
            <Route path="/profile/:userId/:tab" element={<Profile />} />
            <Route path="/formaloffer/:foId" element={<FormalOffer />} />
            <Route path="/chat" element={sessionExist() ? <Chat /> : <Navigate to="/" />}/>
            <Route path="/chat/:encounterId" element={sessionExist() ? <Chat /> : <Navigate to="/" />}/>
            <Route path="*" element={<NotFound/>} />
          </Routes>

      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
