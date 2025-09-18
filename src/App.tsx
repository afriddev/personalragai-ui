import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./Chat";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
