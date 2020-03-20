import React from 'react';
import './App.css';
import CovidMap from './components/CovidMap/CovidMap';
import CovidHeader from './components/CovidHeader/CovidHeader'

function App() {
  return (
    <div>
      <CovidHeader/>
      <CovidMap />
    </div>
  );
}

export default App;
