import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import ObservationForm from "./components/ObservationForm";
import ObservationList from "./components/ObservationList";
import Reports from "./components/Reports";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <Router>
      <div className="App bg-light min-vh-100 d-flex flex-column">
        {/* Navbar */}
        <nav
          className="navbar navbar-expand-lg navbar-dark shadow-lg"
          style={{
            background: "linear-gradient(90deg, #4e6788ff, #9f9c3dff)",
            padding: "1rem 1rem",
            fontSize: "1.3rem",
          }}
        >
          <div className="container-fluid">
            <NavLink
              className="navbar-brand fw-bold d-flex align-items-center"
              to="/"
              style={{
                fontSize: "1.8rem",
                letterSpacing: "1px",
              }}
            >
              <i className="bi bi-shield-check me-2" style={{ fontSize: "1.5rem" }}></i>
              Safety Observation System
            </NavLink>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item mx-2">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive
                        ? "fw-bold text-warning border-bottom border-2 border-warning"
                        : "fw-semibold"}`
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive
                        ? "fw-bold text-warning border-bottom border-2 border-warning"
                        : "fw-semibold"}`
                    }
                    to="/add"
                  >
                    Add Observation
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive
                        ? "fw-bold text-warning border-bottom border-2 border-warning"
                        : "fw-semibold"}`
                    }
                    to="/reports"
                  >
                    Reports
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <div className="container flex-grow-1 py-3">
          <Routes>
            {/* Home */}
            <Route
              path="/"
              element={
                <div className="card shadow-lg p-4 animate__animated animate__fadeIn">
                  <h3>Welcome to Safety Observation System</h3>
                  <p>Home Page.</p>
                </div>
              }
            />

            {/* Add Observation Page */}
            <Route
              path="/add"
              element={
                <div className="row g-4">
                  {/* Observation Form */}
                  <div className="col-lg-12 animate__animated animate__fadeInLeft">
                      <div
                        className="card-header text-white"
                        style={{
                          background: "linear-gradient(90deg, #4e6788ff, #4e6788ff)",
                        }}
                      >
                        <h5 className="mb-0">
                          
                        </h5>
                      <div className="card-body">
                        <ObservationForm onSuccess={() => setRefresh((r) => r + 1)} />
                      </div>
                    </div>
                  </div>

                  {/* Recent Observations */}
                  <div className="col-lg-12 animate__animated animate__fadeInRight">
                    <div className="card shadow-lg h-200">
                      <div
                        className="card-header text-white"
                        style={{
                          background: "linear-gradient(90deg, #55a669ff, #598892ff)",
                        }}
                      >
                        <h5 className="mb-0"  style={{ fontSize: "1.2rem" }} >
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
              }
            />

            {/* Reports */}
            <Route path="/reports" element={<Reports refresh={refresh} />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-dark text-white text-center py-3 mt-auto">
          <small>
            <i className="bi bi-c-circle me-1"></i>
            {new Date().getFullYear()} Safety System | All rights reserved
          </small>
        </footer>
      </div>
    </Router>
  );
}

export default App;
