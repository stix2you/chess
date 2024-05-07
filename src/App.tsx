import React from 'react';
import './App.css';
import Chessboard from './components/Chessboard/Chessboard';

function App() {
  return (
    <div id="app">
      <Chessboard key="chessboard" />
    </div>
  );
}

export default App;
