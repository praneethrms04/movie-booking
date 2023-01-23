import Navbar from "../../components/header/Navbar";
import TheatreList from "../../components/theatrelist/TheatreList";
import MoviesList from "../../components/movieslist/MoviesList";
import "./client.css";
const Client = () => {
  const name = localStorage.getItem("name");

  return (
    <>
      <Navbar />
      <div>
        <h3>welcome {name}</h3>
        <p>Please Lookat these products below </p>
      </div>
      <TheatreList />
      <MoviesList />
    </>
  );
};

export default Client;
