import React from 'react';
import logo from './logo.svg';
import './App.css';
import Survey from './Survey';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the Survey App
        </p>
      </header>
    <Survey />
    </div>

  );
}

export default App;
