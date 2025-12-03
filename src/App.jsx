import { useState } from "react";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SidebarLayout from "./components/Layout";
import FAQsPage from "./components/FAQs";
import Home from "./components/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        <Routes>
          <Route element={<SidebarLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/faqs" element={<FAQsPage />} />
          </Route>
            <Route path="/faqs1" element={<FAQsPage />} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;
