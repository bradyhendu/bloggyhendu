import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Create from "./components/Create";
import Profile from "./components/Profile";
import HomePage from "./components/HomePage";
import SpecificPost from "./components/SpecificPost";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<Create />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post/:id" element={<SpecificPost />} />
      </Routes>
    </Router>
  );
}

export default App;
