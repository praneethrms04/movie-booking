import "./App.css";
// import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "../src/pages/authentication/Authentication";
import Admin from "./pages/admin/Admin";
import Client from "./pages/client/Client";
import Home from "../src/pages/home/Home";
import MovieDetail from "./pages/movie-detail/MovieDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Authentication />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/client" element={<Client />} />
          <Route path="/movie-detail/:movieId" element ={<MovieDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
