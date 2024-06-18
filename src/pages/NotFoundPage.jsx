import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div>
      <h1>404 Not Found.</h1>
      <h1>
        <Link to="/"> Return to home page.</Link>
      </h1>
    </div>
  );
};
