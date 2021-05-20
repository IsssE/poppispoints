import React from 'react';
import './App.css';
import { NavigationBar } from './navigation/navigationBar';
import { Overview } from './overview';
import ScoreList from "./score"
import 'semantic-ui-css/semantic.min.css'

function App() {

  // Move to rexud state
  const [activeMenu, setActiveMenu] = React.useState<string>("Yhteenveto")

  return (
    <div style = {{height: "100%", width: "100% "}}>
      <NavigationBar
        active = {activeMenu}
        onChangeActive={setActiveMenu}
        />
      <Overview/>
    </div>
  );
}
export default App;
