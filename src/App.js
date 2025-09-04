// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
// import ObservationForm from "./components/ObservationForm";
// import ObservationList from "./components/ObservationList";
// import Reports from "./components/Reports";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "animate.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ Add this


// function App() {
//   const [refresh, setRefresh] = useState(0);

//   return (
//     <Router>
//       <div className="App bg-light min-vh-100 d-flex flex-column">
//         {/* Navbar */}
//         <nav
//   className="navbar navbar-expand-lg navbar-dark shadow-lg"
//   style={{
//     background: "linear-gradient(90deg, #4e6788ff, #9f9c3dff)",
//     padding: "1rem 1rem",
//     fontSize: "1.3rem",
//   }}
// >
//   <div className="container-fluid">
//     {/* Brand */}
//     <NavLink
//       className="navbar-brand fw-bold d-flex align-items-center"
//       to="/"
//       style={{ fontSize: "1.8rem", letterSpacing: "1px" }}
//     >
//       <i className="bi bi-shield-check me-2" style={{ fontSize: "1.5rem" }}></i>
//       Safety Observation System
//     </NavLink>

//     {/* Toggler for Mobile */}
//     <button
//       className="navbar-toggler"
//       type="button"
//       data-bs-toggle="collapse"
//       data-bs-target="#navbarNav"
//       aria-controls="navbarNav"
//       aria-expanded="false"
//       aria-label="Toggle navigation"
//     >
//       <span className="navbar-toggler-icon"></span>
//     </button>

//     {/* Collapsible Menu */}
//     <div className="collapse navbar-collapse" id="navbarNav">
//       <ul className="navbar-nav ms-auto">
//         <li className="nav-item mx-2">
//           <NavLink
//             className={({ isActive }) =>
//               `nav-link ${isActive
//                 ? "fw-bold text-warning border-bottom border-2 border-warning"
//                 : "fw-semibold"}`
//             }
//             to="/"
//           >
//             Home
//           </NavLink>
//         </li>
//         <li className="nav-item mx-2">
//           <NavLink
//             className={({ isActive }) =>
//               `nav-link ${isActive
//                 ? "fw-bold text-warning border-bottom border-2 border-warning"
//                 : "fw-semibold"}`
//             }
//             to="/add"
//           >
//             Add Observation
//           </NavLink>
//         </li>
//         <li className="nav-item mx-2">
//           <NavLink
//             className={({ isActive }) =>
//               `nav-link ${isActive
//                 ? "fw-bold text-warning border-bottom border-2 border-warning"
//                 : "fw-semibold"}`
//             }
//             to="/reports"
//           >
//             Reports
//           </NavLink>
//         </li>
//       </ul>
//     </div>
//   </div>
// </nav>


//         {/* Routes */}
//         <div className="container flex-grow-1 py-3">
//           <Routes>
//             {/* Home */}
//             <Route
//               path="/"
//               element={
//                 <div className="card shadow-lg p-4 animate__animated animate__fadeIn">
//                   <h3>Welcome to Safety Observation System</h3>
//                   <p>Home Page.</p>
//                 </div>
//               }
//             />

//             {/* Add Observation Page */}
//             <Route
//               path="/add"
//               element={
//                 <div className="row g-4">
//                   {/* Observation Form */}
//                   <div className="col-lg-12 animate__animated animate__fadeInLeft">
//                       <div
//                         className="card-header text-white"
//                         style={{
//                           background: "linear-gradient(90deg, #4e6788ff, #4e6788ff)",
//                         }}
//                       >
//                         <h5 className="mb-0">
                          
//                         </h5>
//                       <div className="card-body">
//                         <ObservationForm onSuccess={() => setRefresh((r) => r + 1)} />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Recent Observations */}
//                   <div className="col-lg-12 animate__animated animate__fadeInRight">
//                     <div className="card shadow-lg h-200">
//                       <div
//                         className="card-header text-white"
//                         style={{
//                           background: "linear-gradient(90deg, #55a669ff, #598892ff)",
//                         }}
//                       >
//                         <h5 className="mb-0"  style={{ fontSize: "1.2rem" }} >
//                           <i className="bi bi-journal-text me-2" ></i>
//                           Recent Observations
//                         </h5>
//                       </div>
//                       <div className="card-body" style={{ fontSize: "1rem" }}>
//                         <ObservationList refresh={refresh} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               }
//             />

//             {/* Reports */}
//             <Route path="/reports" element={<Reports refresh={refresh} />} />
//           </Routes>
//         </div>

//         {/* Footer */}
//         <footer className="bg-dark text-white text-center py-3 mt-auto">
//           <small>
//             <i className="bi bi-c-circle me-1"></i>
//             {new Date().getFullYear()} Safety System | All rights reserved
//           </small>
//         </footer>
//       </div>
//     </Router>
//   );
// }

// export default App;








// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
// import ObservationForm from "./components/ObservationForm";
// import ObservationList from "./components/ObservationList";
// import Reports from "./components/Reports";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "animate.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ Add this
// import HomeChart from "./components/HomeChart";


// function App() {
//   const [refresh, setRefresh] = useState(0);

//   return (
//     <Router>
//       <div className="App bg-light min-vh-100 d-flex flex-column">
//         {/* Navbar */}
//         <nav
//           className="navbar navbar-expand-lg navbar-dark shadow-lg"
//           style={{
//             background: "linear-gradient(90deg, #4e6788ff, #9f9c3dff)",
//             padding: "1rem 1rem",
//             fontSize: "1.3rem",
//           }}
//         >
//           <div className="container-fluid">
//             {/* Brand */}
//             <NavLink
//               className="navbar-brand fw-bold d-flex align-items-center"
//               to="/"
//               style={{ fontSize: "1.8rem", letterSpacing: "1px" }}
//             >
//               <i className="bi bi-shield-check me-2" style={{ fontSize: "1.5rem" }}></i>
//               Safety Observation System
//             </NavLink>

//             {/* Toggler for Mobile */}
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarNav"
//               aria-controls="navbarNav"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>

//             {/* Collapsible Menu */}
//             <div className="collapse navbar-collapse" id="navbarNav">
//               <ul className="navbar-nav ms-auto">
//                 <li className="nav-item mx-2">
//                   <NavLink
//                     className={({ isActive }) =>
//                       `nav-link ${isActive
//                         ? "fw-bold text-warning border-bottom border-2 border-warning"
//                         : "fw-semibold"}`
//                     }
//                     to="/"
//                   >
//                     Home
//                   </NavLink>
//                 </li>
//                 <li className="nav-item mx-2">
//                   <NavLink
//                     className={({ isActive }) =>
//                       `nav-link ${isActive
//                         ? "fw-bold text-warning border-bottom border-2 border-warning"
//                         : "fw-semibold"}`
//                     }
//                     to="/add"
//                   >
//                     Add Observation
//                   </NavLink>
//                 </li>
//                 <li className="nav-item mx-2">
//                   <NavLink
//                     className={({ isActive }) =>
//                       `nav-link ${isActive
//                         ? "fw-bold text-warning border-bottom border-2 border-warning"
//                         : "fw-semibold"}`
//                     }
//                     to="/reports"
//                   >
//                     Reports
//                   </NavLink>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>


//         {/* Routes */}
//         <div className="container flex-grow-1 py-3">
//           <Routes>
//             {/* Home */}
//             <Route
//               path="/"
//               element={
//                 <div>
//                   <div className="card shadow-lg p-4 mb-4 animate__animated animate__fadeIn">
//                     <h3>Welcome to Safety Observation System</h3>
//                     <p className="mb-0">This dashboard gives you insights into safety observations.</p>
//                   </div>

//                   {/* Chart */}
//                   <HomeChart />
//                 </div>
//               }
//             />

//             {/* Add Observation Page */}
//             <Route
//               path="/add"
//               element={
//                 <div className="row g-4">
//                   {/* Observation Form */}
//                   <div className="col-lg-12 animate__animated animate__fadeInLeft">
//                     <div
//                       className="card-header text-white"
//                       style={{
//                         background: "linear-gradient(90deg, #4e6788ff, #4e6788ff)",
//                       }}
//                     >
//                       <h5 className="mb-0">

//                       </h5>
//                       <div className="card-body">
//                         <ObservationForm onSuccess={() => setRefresh((r) => r + 1)} />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Recent Observations */}
//                   <div className="col-lg-12 animate__animated animate__fadeInRight">
//                     <div className="card shadow-lg h-200">
//                       <div
//                         className="card-header text-white"
//                         style={{
//                           background: "linear-gradient(90deg, #55a669ff, #598892ff)",
//                         }}
//                       >
//                         <h5 className="mb-0" style={{ fontSize: "1.2rem" }} >
//                           <i className="bi bi-journal-text me-2" ></i>
//                           Recent Observations
//                         </h5>
//                       </div>
//                       <div className="card-body" style={{ fontSize: "1rem" }}>
//                         <ObservationList refresh={refresh} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               }
//             />

//             {/* Reports */}
//             <Route path="/reports" element={<Reports refresh={refresh} />} />
//           </Routes>
//         </div>

//         {/* Footer */}
//         <footer className="bg-dark text-white text-center py-3 mt-auto">
//           <small>
//             <i className="bi bi-c-circle me-1"></i>
//             {new Date().getFullYear()} Safety System | All rights reserved
//           </small>
//         </footer>
//       </div>
//     </Router>
//   );
// }

// export default App;





// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
// import ObservationForm from "./components/ObservationForm";
// import ObservationList from "./components/ObservationList";
// import Reports from "./components/Reports";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "animate.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ Add this
// import HomeChart from "./components/HomeChart";


// function App() {
//   const [refresh, setRefresh] = useState(0);

//   return (
//     <Router>
//       <div className="App bg-light min-vh-100 d-flex flex-column">
//         {/* Navbar */}
//         <nav
//           className="navbar navbar-expand-lg navbar-dark shadow-lg"
//           style={{
//             background: "linear-gradient(90deg, #4e6788ff, #9f9c3dff)",
//             padding: "1rem 1rem",
//             fontSize: "1.3rem",
//           }}
//         >
//           <div className="container-fluid">
//             {/* Brand */}
//             <NavLink
//               className="navbar-brand fw-bold d-flex align-items-center"
//               to="/"
//               style={{ fontSize: "1.8rem", letterSpacing: "1px" }}
//             >
//               <i className="bi bi-shield-check me-2" style={{ fontSize: "1.5rem" }}></i>
//               Safety Observation System
//             </NavLink>

//             {/* Toggler for Mobile */}
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarNav"
//               aria-controls="navbarNav"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>

//             {/* Collapsible Menu */}
//             <div className="collapse navbar-collapse" id="navbarNav">
//               <ul className="navbar-nav ms-auto">
//                 <li className="nav-item mx-2">
//                   <NavLink
//                     className={({ isActive }) =>
//                       `nav-link ${isActive
//                         ? "fw-bold text-warning border-bottom border-2 border-warning"
//                         : "fw-semibold"}`
//                     }
//                     to="/"
//                   >
//                     Home
//                   </NavLink>
//                 </li>
//                 <li className="nav-item mx-2">
//                   <NavLink
//                     className={({ isActive }) =>
//                       `nav-link ${isActive
//                         ? "fw-bold text-warning border-bottom border-2 border-warning"
//                         : "fw-semibold"}`
//                     }
//                     to="/add"
//                   >
//                     Add Observation
//                   </NavLink>
//                 </li>
//                 <li className="nav-item mx-2">
//                   <NavLink
//                     className={({ isActive }) =>
//                       `nav-link ${isActive
//                         ? "fw-bold text-warning border-bottom border-2 border-warning"
//                         : "fw-semibold"}`
//                     }
//                     to="/reports"
//                   >
//                     Reports
//                   </NavLink>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>


//         {/* Routes */}
//         <div className="container flex-grow-1 py-3">
//           <Routes>
//             {/* Home */}
//             <Route
//               path="/"
//               element={
//                 <div>
//                   <div
//                     className="card shadow-lg border-0 animate__animated animate__fadeInDown"
//                     style={{
//                       borderRadius: "12px",
//                       overflow: "hidden",
//                       background: "linear-gradient(135deg, #3b5b67ff, #8c754eff)",
//                       color: "#fff",
//                     }}
//                   >
//                     <div className="card-body text-center p-5">
//                       <i
//                         className="bi bi-shield-check"
//                         style={{ fontSize: "3rem", marginBottom: "15px" }}
//                       ></i>
//                       <h2 style={{ fontWeight: "700", marginBottom: "10px" }}>
//                         Welcome to Safety Observation System
//                       </h2>
//                       <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
//                         Track, analyze, and improve workplace safety with smart insights 🚀
//                       </p>
//                     </div>
//                   </div>
//                   <br></br>

//                   {/* Chart */}
//                   <HomeChart />
//                 </div>
//               }
//             />

//             {/* Add Observation Page */}
//             <Route
//               path="/add"
//               element={
//                 <div className="row g-4">
//                   {/* Observation Form */}
//                   <div className="col-lg-12 animate__animated animate__fadeInLeft">
//                     <div
//                       className="card-header text-white"
//                       style={{
//                         background: "linear-gradient(90deg, #4e6788ff, #4e6788ff)",
//                       }}
//                     >
//                       <h5 className="mb-0">

//                       </h5>
//                       <div className="card-body">
//                         <ObservationForm onSuccess={() => setRefresh((r) => r + 1)} />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Recent Observations */}
//                   <div className="col-lg-12 animate__animated animate__fadeInRight">
//                     <div className="card shadow-lg h-200">
//                       <div
//                         className="card-header text-white"
//                         style={{
//                           background: "linear-gradient(90deg, #55a669ff, #598892ff)",
//                         }}
//                       >
//                         <h5 className="mb-0" style={{ fontSize: "1.2rem" }} >
//                           <i className="bi bi-journal-text me-2" ></i>
//                           Recent Observations
//                         </h5>
//                       </div>
//                       <div className="card-body" style={{ fontSize: "1rem" }}>
//                         <ObservationList refresh={refresh} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               }
//             />

//             {/* Reports */}
//             <Route path="/reports" element={<Reports refresh={refresh} />} />
//           </Routes>
//         </div>

//         {/* Footer */}
//         <footer className="bg-dark text-white text-center py-3 mt-auto">
//           <small>
//             <i className="bi bi-c-circle me-1"></i>
//             {new Date().getFullYear()} Safety System | All rights reserved
//           </small>
//         </footer>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
  useLocation,
} from "react-router-dom";
import ObservationForm from "./components/ObservationForm";
import ObservationList from "./components/ObservationList";
import Reports from "./components/Reports";
import HomeChart from "./components/HomeChart";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Navbar component
function Navbar() {
  const user = JSON.parse(localStorage.getItem("user")); // get logged-in user

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-lg"
      style={{
        background: "linear-gradient(90deg, #4e6788ff, #9f9c3dff)",
        fontSize: "1.3rem",
      }}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold d-flex align-items-center" to="/home">
          <i className="bi bi-shield-check me-2" style={{ fontSize: "1.5rem" }}></i>
          Safety Observation System
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            <li className="nav-item mx-2">
              <NavLink className="nav-link d-flex align-items-center" to="/home">
                <i className="bi bi-house-door me-1"></i> Home
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink className="nav-link d-flex align-items-center" to="/add">
                <i className="bi bi-plus-circle me-1"></i> Add Observation
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink className="nav-link d-flex align-items-center" to="/reports">
                <i className="bi bi-file-earmark-text me-1"></i> Reports
              </NavLink>
            </li>
            <li className="nav-item mx-2 d-flex flex-column align-items-center">
              <i className="bi bi-person-circle me-1 text-warning" style={{ fontSize: "1.5rem" }}></i>

              {/* Username */}
              <NavLink
                to="/login"
                className="fw-bold text-warning text-decoration-none"
                style={{ fontSize: "0.85rem" }}
              >
                {user?.name || "User"}
              </NavLink>

              {/* Logout */}
              {user && (
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    window.location.reload(); // or navigate to /login
                  }}
                  className="btn btn-link p-0 mt-1 text-white"
                  style={{ fontSize: "0.75rem" }}
                >
                  (Logout)
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

// Footer component
function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <small>
        <i className="bi bi-c-circle me-1"></i>
        {new Date().getFullYear()} Safety System | All rights reserved
      </small>
    </footer>
  );
}

// Main App component
function App() {
  const [refresh, setRefresh] = useState(0);
  const location = useLocation();

  return (
    <div className="App bg-light min-vh-100 d-flex flex-column">
      {/* Navbar */}
      {location.pathname !== "/login" && <Navbar />}

      <div className="container flex-grow-1 py-3">
        <Routes>
          {/* Default → Login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Login page */}
          <Route path="/login" element={<Login />} />

          {/* Home page */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <div>
                  <div
                    className="card shadow-lg border-0 animate__animated animate__fadeInDown"
                    style={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      background: "linear-gradient(135deg, #3b5b67ff, #8c754eff)",
                      color: "#fff",
                    }}
                  >
                    <div className="card-body text-center p-5">
                      <i
                        className="bi bi-shield-check"
                        style={{ fontSize: "3rem", marginBottom: "15px" }}
                      ></i>
                      <h2>Welcome to Safety Observation System</h2>
                      <p>Track, analyze, and improve workplace safety with smart insights 🚀</p>
                    </div>
                  </div>
                  <br />
                  <HomeChart />
                </div>
              </ProtectedRoute>
            }
          />

          {/* Add Observation page */}
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <div className="row g-4">
                  <div className="col-12 animate__animated animate__fadeInLeft">
                    <ObservationForm onSuccess={() => setRefresh((r) => r + 1)} />
                  </div>

                  <div className="col-lg-12 animate__animated animate__fadeInRight">
                    <div className="card shadow-lg h-200">
                      <div
                        className="card-header text-white"
                        style={{
                          background: "linear-gradient(90deg, #55a669ff, #598892ff)",
                        }}
                      >
                        <h5 className="mb-0" style={{ fontSize: "1.2rem" }} >
                          <i className="bi bi-journal-text me-2" ></i>
                          Recent Observations
                        </h5>
                      </div>
                      <div className="card-body" style={{ fontSize: "1rem" }}>
                        <ObservationList refresh={refresh} />
                      </div>
                    </div>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          {/* Reports */}
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports refresh={refresh} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      {/* Footer */}
      {location.pathname !== "/login" && <Footer />}
    </div>
  );
}

// Wrap App in Router
export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}




