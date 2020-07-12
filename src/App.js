import React from 'react';
import logo from './logo.svg';
import cadena from './images/cadena.jpeg';
import FastaUpload from './components/FastaUpload';
import MapSequences from './components/mapsequences/mapsequences';
import './App.css';
import DisplayTree from './components/displaytree/displaytree';
import ExpansionPanel from './components/ExpansionPanel';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={cadena}  />

        <div className="panel">
            <h2>BIOINFORMATICA</h2>
            <p>TP final</p>
        </div>
        {/* <FastaUpload/>
        
        <DisplayTree/> */}

        <ExpansionPanel/>

        {/* <MapSequences/> */}
      </header>
    </div>
  );
}

export default App;
