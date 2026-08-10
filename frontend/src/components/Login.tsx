import { useState } from "react";
import { login } from "../services/api";

interface Props {
  onLogin: (username: string) => void;
  onGoToSignup: () => void;
}

function Login({ onLogin, onGoToSignup }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password) {
      setError("Username and password are required.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const data = await login(username.trim(), password);

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("username", data.username);

      onLogin(data.username);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left side - Branding */}
      <div className="auth-sidebar">
        <div className="auth-side-content">
          <div className="brand-mark">৳</div>

          <h1 className="auth-brand">
            Smart Personal
            <br />
            Finance Tracker
          </h1>

          <p className="auth-tagline">
            Welcome back to your Finance Tracker
          </p>

          <ul className="auth-features">
            <li>
              <span className="feature-dot" aria-hidden="true" />
              Track income and expenses in one place
            </li>

            <li>
              <span className="feature-dot" aria-hidden="true" />
              Visual breakdowns by category
            </li>

            <li>
              <span className="feature-dot" aria-hidden="true" />
              Only you can see your data
            </li>
          </ul>

          <span className="auth-side-footnote">
            A ledger for everyday finances — clear, simple, yours.
          </span>
        </div>
      </div>

      {/* Right side - Login */}
      <main className="auth-main">
        <div className="auth-card">
          <div className="auth-card-header">
            <span className="mobile-brand-mark">৳</span>

            <h2>Welcome back</h2>

            <p className="auth-subtitle">
              Log in to manage your finances
            </p>
          </div>

          {error && (
            <div
              className="banner banner-error"
              role="alert"
              aria-live="polite"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="login-username">
                Username
              </label>

              <input
                id="login-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                autoComplete="username"
                autoFocus
              />
            </div>

            <div className="field">
              <label htmlFor="login-password">
                Password
              </label>

              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="button-block"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <p className="auth-switch">
            Don't have an account?{" "}
            <button
              type="button"
              className="link-button"
              onClick={onGoToSignup}
            >
              Create an account
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;
