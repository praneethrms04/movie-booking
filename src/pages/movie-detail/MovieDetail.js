import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../../api/movies";
import ReactPlayer from "react-player";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import "./moviedetail.css";

const MovieDetail = () => {
  const params = useParams();
  const [movieDetail, setMovieDetail] = useState({});
  const { movieId } = params;

  useEffect(() => {
    //componentDidMount
    fetchMovieDetail(movieId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMovieDetail = (movieId) => {
    getMovieDetails(movieId)
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          setMovieDetail(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // default empty string values to variables if they are undefined
  const {
    trailerUrl = "",
    // posterUrl = "",
    name = "",
    description = "",
    director = "",
    releaseDate = "",
    language = "",
    casts = [],
    _id = "",
    releaseStatus,
  } = movieDetail;

  const buttonText =
    releaseStatus === "RELEASED" ? "BOOK TICKETS" : "COMING SOON";

  const buttonUrl =
    releaseStatus === "RELEASED" ? `/buy-tickets/${name}/${_id}` : "#";

  return (
    <>
      <Navbar />
      <div
        className="movie-detail"
        style={{
          // backgroundImage: `url(${posterUrl})`,
          backgroundColor: "#000",
          width: "100%",
          height: "100%",
        }}
      >
        <div className="container movie-data m-5">
          <div className="row">
            <div className="col">
              <ReactPlayer
                url={trailerUrl}
                controls={true}
                className="trailer"
                width="70%"
                height="450px"
              />
            </div>
            <div className="col pt-3 movie-content">
              <h2>{name}</h2>
              <h4 className="description">{description}</h4>
              <hr />
              <div className="d-flex">
                <p>Directed by - </p>
                <h5> {director}</h5>
              </div>
              <div className="d-flex">
                <p>Languages - </p>
                <h5> {language}</h5>
              </div>
              <div className="d-flex">
                <p>Release Date - </p>
                <h5> {releaseDate}</h5>
              </div>
              <hr />
              <h4 className="description w-25 text-center">Casts</h4>
              {casts.map((cast) => {
                return <h5 key={cast}>{cast}</h5>;
              })}
              <hr />
              <Link className="btn btn-danger" to={buttonUrl}>
                {buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MovieDetail;
