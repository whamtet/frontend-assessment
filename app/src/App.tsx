import React from 'react';
import './App.css';
import * as Widgets from './widgets';

function App() {
  return (
    <div className="App">
      {Widgets.unavailableButton}
    </div>
  );
}

export default App;
