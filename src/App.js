import React from 'react';
import './App.css';
import Calendar from './components/Calendar';

function App() {
  console.log('JSON.parse(localStorage.getItem(\'data\'))', JSON.parse(localStorage.getItem('data')))
  return (
    <div className="App">
      <h1>Mega-Calendar</h1>
      <Calendar state={JSON.parse(localStorage.getItem('data')) || null} />
    </div>
  );
}

export default App;
