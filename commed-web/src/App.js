import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App container-fluid">
      <div className="Header">
        <Header></Header>
      </div>
      <div className="Body">
        <Home></Home>
      </div>
    </div>
  );
}

export default App;
