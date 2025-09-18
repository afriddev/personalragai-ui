import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./Chat";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
