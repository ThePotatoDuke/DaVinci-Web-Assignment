import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Users from "./pages/Users";

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <BrowserRouter>
        <NavBar />

        <div className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/posts" element={<Posts />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
