import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/test")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch(() => {
        setMessage("Failed to connect to backend.");
      });
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "80px",
        fontFamily: "Arial",
      }}
    >
      <h1>Smart Personal Finance Tracker</h1>
      <h2>Frontend + Backend Connection</h2>
      <p>{message}</p>
    </div>
  );
}

export default App;