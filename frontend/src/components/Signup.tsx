import { useState } from "react";
import { signup } from "../services/api";

interface Props {
  onGoToLogin: () => void;
}

function Signup({ onGoToLogin }: Props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const data = await signup(username.trim(), email.trim(), password);

      setSuccess(data.message);

      setUsername("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        onGoToLogin();
      }, 1000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Signup failed."
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

          <p className="auth-tagline">Start your ledger today</p>

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

      {/* Right side - Signup */}
      <main className="auth-main">
        <div className="auth-card">
          <div className="auth-card-header">
            <span className="mobile-brand-mark">৳</span>

            <h2>Create your account</h2>

            <p className="auth-subtitle">
              Start tracking your finances today
            </p>
          </div>

          {error && (
            <div className="banner banner-error" role="alert" aria-live="polite">
              {error}
            </div>
          )}

          {success && (
            <div className="banner banner-success" role="status" aria-live="polite">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="signup-username">Username</label>
              <input
                id="signup-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                autoComplete="username"
                autoFocus
              />
            </div>

            <div className="field">
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>

            <div className="field">
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                autoComplete="new-password"
              />
            </div>

            <button type="submit" className="button-block" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <p className="auth-switch">
            Already have an account?{" "}
            <button
              type="button"
              className="link-button"
              onClick={onGoToLogin}
            >
              Login
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Signup;
