import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Card, Col, Row } from "react-bootstrap";

import Navbar from "../../components/header/Navbar";
import Slider from "../../components/slider/Slider";
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loader/Loader";

import { getAllMovies } from "../../api/movies";

import img1 from "../../assets/images/img1.avif";
import img2 from "../../assets/images/img2.avif";
import img3 from "../../assets/images/img3.avif";
import img4 from "../../assets/images/img4.avif";
import img5 from "../../assets/images/img5.avif";

import "./home.css";
const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allmovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getAllMovies()
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          console.log(data);
          setMovies(data);
          setAllMovies(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  const handleGotoDetailPage = (movieId) => {
    navigate(`/movie-detail/${movieId}`);
  };
  const filterMoviesBySearch = (searchText) => {
    const filteredmovies = allmovies.filter((movie) => {
      return movie.name.toLowerCase().includes(searchText.toLowerCase());
    });
    setMovies(filteredmovies);
  };

  return (
    <div>
      <Navbar filterMoviesBySearch={filterMoviesBySearch} hideSearch={true} />
      <Slider images={[img1, img2, img3, img4, img5]} />
      <Container fluid>
        {isLoading ? (
          <Loader />
        ) : (
          <Row xs={1} md={5} className="g-4 py-5 mx-4">
            {movies.map((movie) => (
              <Col>
                <Card
                  onClick={() => {
                    handleGotoDetailPage(movie._id);
                  }}
                  key={movie._id}
                >
                  <Card.Img
                    variant="top"
                    src={movie.posterUrl}
                    alt={movie.name}
                    height={350}
                    width={150}
                  />
                  <Card.Body>
                    <Card.Title>{movie.name}</Card.Title>
                    <Card.Text>{movie.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <Footer />
    </div>
  );
};

export default Home;
