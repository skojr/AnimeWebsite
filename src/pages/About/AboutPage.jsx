import "./AboutPage.css";
import { useLocation} from "react-router-dom";

export const AboutPage = () => {
  const location = useLocation();
  const anime = location.state;

  return (
    <div className="about-container">
      <div className="about-overlay"></div>
      <div className="abt-content-container container-fluid text-center">
        <div className="row container-fluid">
          {" "}
          <div className="col">
            <h1 className="mb-4">{anime.title_english}</h1>
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title_english}
            />
          </div>
          <div className="col">
            <div className="about-detail">
              <p> {anime.synopsis}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
