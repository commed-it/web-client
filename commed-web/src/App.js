import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import Product from "./components/Product/Product";
import Profile from "./components/Profile/Profile";
import Chat from "./components/Chat/Chat.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { combineReducers, createStore } from "redux";
import { sessionReducer, sessionService } from "redux-react-session";
import { sessionExist } from "./utils";

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
    <div className="fill-window App container-fluid">
      <div className="Header">
        <Header></Header>
      </div>
      <div className="Body">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route
              path="/chat"
              element={sessionExist() ? <Chat /> : <Navigate to="/" />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
