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
import SidebarLayout from "./components/Home";
// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route path="/" element={<SidebarLayout />} />
//           {/* <Route path="*" element={<HomePage />} /> */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;



function App() {
  return <SidebarLayout />
}

export default App