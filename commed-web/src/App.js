import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import Product from './components/Product/Product';
import Profile from './components/Profile/Profile';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App container-fluid">
      <div className="Header">
        <Header></Header>
      </div>
      <div className="Body">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/product" element={<Product />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
