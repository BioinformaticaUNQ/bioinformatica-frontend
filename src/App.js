import React from 'react';
import logo from './logo.svg';
import cadena from './images/cadena.jpeg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={cadena}  />

        <div className="panel">
            <h2>BIOINFORMATICA</h2>
            <p>TP final</p>
        </div>


      </header>
    </div>
  );
}

export default App;
