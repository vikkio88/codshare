import { useState } from "react";
import Weapons from "./components/Weapons";
import Attachments from "./components/Attachments";
import "./App.css";
import { slugger } from "./libs/slugger";

const initialConfig = { weapon: null, attachments: [], tuning: {} };

function App() {
  const [config, setConfig] = useState({ ...initialConfig });
  const appendConfig = udpates => {
    const newConfig = { ...config, ...udpates };
    console.log(slugger(newConfig), newConfig.tuning);
    setConfig({ ...newConfig });
  };
  return (
    <div className="App">
      {/* <input onChange={e => console.log(fromSlug(e.target.value))} /> */}
      <Weapons
        onSelect={({ value: weapon }) => appendConfig({ weapon, attachments: [] })}
        onReset={() => setConfig({ ...initialConfig })}
        config={config}
      />
      <Attachments
        config={config}
        appendConfig={appendConfig}
      />
    </div>
  );
}

export default App;
