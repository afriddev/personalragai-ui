import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import ProtectedRoute from "./apputils/ProtectedRoute";
import ChatMain from "./features/chat/ChatMain";

function App() {
  return (
    <div className="w-full h-[100vh] flex bg-background text-foreground">
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ChatMain />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
