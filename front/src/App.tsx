import React from 'react';
import './App.css';
import { NavigationBar } from './navigation/navigationBar';
import { Overview } from './overview';
import ScoreList from "./score"

function App() {
  return (
    <div style = {{height: "100%", width: "100% "}}>
      {/*<NavigationBar/>*/}
      <Overview/>
    </div>
  );
}
export default App;
