import React from 'react';
import './App.css';
import * as Rating from './widgets/rating';

function App() {
  return (
    <div className="App">
      {Rating.ratingWidget(80)}
    </div>
  );
}

export default App;
