import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Createpost from "./Pages/Createpost/Createpost";

import Login from "./Pages/Login";
import Main from "./Pages/Main";

function App() {

  return (
    <div className="flex flex-col justify-center content-center items-center">
      <Router >
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/createpost" element={<Createpost/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
