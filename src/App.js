import "./App.css";
// import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "../src/pages/authentication/Authentication";
import Admin from "../src/pages/Admin/Admin";
import Client from "../src/pages/Client/Client";
import Home from "../src/pages/home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Authentication />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/client" element={<Client />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
