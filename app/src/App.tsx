import React from 'react';
import './App.css';
import * as Search from './search';

function App() {
  return (
    <div className="App">
      {Search.searchBar}
    </div>
  );
}

export default App;
