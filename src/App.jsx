import './App.css';
import CreateToken from './Components/CreateToken';
import MinimaLogo from "./Components/MinimaLogo";

function App() {
  return (
    <div className="App">
      <section className="container">
        <CreateToken />
      </section>
      <MinimaLogo />
    </div>
  );
}

export default App;
