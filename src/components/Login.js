import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!form.email.trim() || !form.password.trim()) {
      setMessage("Email and password are required.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await loginUser({
        email: form.email.trim(),
        password: form.password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } catch (err) {
      const apiMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Login failed. Please check your email/password.";
      setMessage(apiMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        className="card shadow-lg border-0 p-4 p-md-5 animate__animated animate__fadeIn"
        style={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 20,
          background: "rgba(255,255,255,0.95)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <i
            className="bi bi-shield-lock-fill text-primary mb-2"
            style={{ fontSize: "3rem" }}
          ></i>
          <h3 className="fw-bold mb-1">Welcome Back</h3>
          <p className="text-muted mb-0">Sign in to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <div className="input-group shadow-sm">
              <span className="input-group-text bg-light">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                style={{ borderRadius: "0 8px 8px 0" }}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group shadow-sm">
              <span className="input-group-text bg-light">
                <i className="bi bi-key"></i>
              </span>
              <input
                type={showPw ? "text" : "password"}
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                style={{ borderRadius: "0 8px 8px 0" }}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPw((s) => !s)}
                tabIndex={-1}
              >
                <i className={`bi ${showPw ? "bi-eye-slash" : "bi-eye"}`}></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold shadow-sm mt-3"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Signing in…
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Optional social login */}
        {/* <div className="text-center mt-4">
          <p className="text-muted">or continue with</p>
          <div className="d-flex justify-content-center gap-2">
            <button className="btn btn-outline-danger btn-sm shadow-sm">
              <i className="bi bi-google me-1"></i> Google
            </button>
            <button className="btn btn-outline-primary btn-sm shadow-sm">
              <i className="bi bi-facebook me-1"></i> Facebook
            </button>
          </div>
        </div> */}

        {/* Message */}
        {message && (
          <div
            className={`alert mt-3 text-center ${
              /success|✅/i.test(message) ? "alert-success" : "alert-danger"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
