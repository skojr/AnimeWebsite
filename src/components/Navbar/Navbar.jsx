import { animateScroll } from "react-scroll";
import "./Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path, section) => {
    if (location.pathname === "/" && section) {
      animateScroll.scrollTo(section, {
        duration: 100,
        smooth: true,
      });
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark fixed-top p-3">
      <div className="container-fluid">
        <a
          className="navbar-brand mx-5"
          href="#"
          onClick={() => handleNavClick("/", "hero")}
        >
          <i className="fa-solid fa-square-rss"></i> YUKO!
        </a>
        <div className="navbar-phrase text-white">Find your anime</div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a
              className="nav-link active mx-3"
              aria-current="page"
              href="#"
              onClick={() => handleNavClick("/", "hero")}
            >
              Home
            </a>
            <a className="nav-link mx-3" href="#">
              Survey
            </a>
            <a className="nav-link mx-3" href="#">
              Profile
            </a>
            <a className="nav-link mx-3" href="#">
              Settings
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
