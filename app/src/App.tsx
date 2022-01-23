import React from 'react';
import './App.css';
import * as Widgets from './widgets';
import {SearchBar} from "./search";

function App() {
  return (
    <div className="App">
      {Widgets.filterButton('Movies', true)}
    </div>
  );
}

export default App;
