import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-base-content">
        <ThemeToggle />
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
