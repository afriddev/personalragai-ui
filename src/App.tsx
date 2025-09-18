import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./Chat";
import { Toaster } from "./components/ui/toaster";
import ProtectedRoute from "./apputils/ProtectedRoute";

function App() {
  return (
    <div className="w-full h-[100vh] flex bg-background text-foreground">
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
