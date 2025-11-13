import { useNavigate } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        &larr; Back to Home
      </button>

      <div className="notfound-form-wrapper">
        <h1>404</h1>
        <p>Oops! The page you are looking for doesn't exist.</p>
      </div>
    </div>
  );
}
