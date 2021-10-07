import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2 className="text-3xl sm:text-5xl lg:text-6xl leading-none font-extrabold text-gray-50 tracking-tight mb-8">
          React + Tailwind CSS
        </h2>
      </header>
    </div>
  );
}

export default App;