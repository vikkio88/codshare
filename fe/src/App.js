import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Create, View } from "./pages";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/view/:slug" element={<View />} />
        <Route path="/edit/:slug" element={<Create />} />
      </Routes>
      {/* <input onChange={e => console.log(fromSlug(e.target.value))} /> */}
    </div>
  );
}

export default App;
