import NavBar from "./components/NavBar";
import Post from "./components/Post";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Post />} />
        
      </Routes>
    </Router>
  );
}

export default App;
