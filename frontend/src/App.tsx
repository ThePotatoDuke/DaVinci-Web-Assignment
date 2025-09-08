import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import NavBar from "./components/Navbar";

function App() {
  // Define current user ID state
  const [currentUserId, setCurrentUserId] = useState(1);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <BrowserRouter>
        {/* NavBar spans full width */}
        <NavBar
          currentUserId={currentUserId}
          setCurrentUserId={setCurrentUserId}
        />

        {/* Page content takes full remaining space */}
        <div className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route
              path="/posts"
              element={<Posts currentUserId={currentUserId} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
