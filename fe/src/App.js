import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Create, Main, View } from "./pages";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/create" element={<Create />} />
      <Route path="/view/:slug" element={<View />} />
      <Route path="/edit/:slug" element={<Create />} />
      <Route path="*" element={<Main />} />
    </Routes>
  );
}

export default App;
