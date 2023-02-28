import { useState } from "react";
import Weapons from "./components/Weapons";
import Attachments from "./components/Attachments";
import "./App.css";
import { slugger } from "./libs/slugger";

const initialConfig = { weapon: null, attachments: [] };

function App() {
  const [config, setConfig] = useState({ ...initialConfig });
  const appendConfig = udpates => {
    const newConfig = { ...config, ...udpates };
    console.log(slugger(newConfig));
    setConfig({ ...newConfig });
  };
  return (
    <div className="App">
      {/* <input onChange={e => console.log(fromSlug(e.target.value))} /> */}
      {Boolean(config.weapon) && (
        <>
          <button onClick={() => setConfig({ ...initialConfig })}>🗑️</button>
          <h3>{slugger(config)}</h3>
        </>
      )}
      <Weapons onSelect={({ value: weapon }) => appendConfig({ weapon, attachments: [] })} config={config} />
      <Attachments config={config} onSet={appendConfig} />
    </div>
  );
}

export default App;
