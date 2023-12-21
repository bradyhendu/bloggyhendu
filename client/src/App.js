import NavBar from "./components/NavBar";
import Post from "./components/Post";
import Login from "./components/Login";
import Register from "./components/Register";
import Create from "./components/Create";
import Profile from "./components/Profile";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Post />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<Create />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
