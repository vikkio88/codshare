import { useState } from "react";
import Weapons from "./components/Weapons";
import Attachments from "./components/Attachments";
import "./App.css";
import { slugger, fromSlug } from "./libs/slugger";

function App() {
  const [config, setConfig] = useState({ weapon: null, attachments: [] });
  const appendConfig = udpates => {
    const newConfig = { ...config, ...udpates };
    console.log(slugger(newConfig));
    setConfig({ ...newConfig });

  };
  return (
    <div className="App">
      <input onChange={e => console.log(fromSlug(e.target.value))} />
      <Weapons onSelect={({ value: weapon }) => appendConfig({ weapon })} config={config} />
      <Attachments attachments={config.attachments} weapon={config.weapon} onSet={appendConfig} />
    </div>
  );
}

export default App;
