import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Delete, Edit } from "@material-ui/icons";
import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  getAllMovies,
  removeMovie,
  updateMovieDetails,
} from "../../api/movies";
import { moviescolumns } from "../../constants/moviesdata";

const MoviesList = () => {
  const [allmovies, setAllMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [showMovieEditModal, setShowMovieEditModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    getAllMovies()
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          console.log(data);
          setAllMovies(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditMovieSubmit = (e) => {
    updateMovieDetails(selectedMovie._id, selectedMovie)
      .then((res) => {
        const { status } = res;
        if (status === 200) {
          setErrorMessage("");
          setSelectedMovie({});
          fetchMovies();
          setShowMovieEditModal(false);
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
    e.preventDefault();
  };

  const handleMovieChange = (e) => {
    const tempMovie = { ...selectedMovie };

    if (e.target.name === "name") {
      tempMovie.name = e.target.value;
    } else if (e.target.name === "releaseDate") {
      tempMovie.releaseDate = e.target.value;
    } else if (e.target.name === "releaseStatus") {
      tempMovie.releaseStatus = e.target.value;
    } else if (e.target.name === "director") {
      tempMovie.director = e.target.value;
    } else if (e.target.name === "description") {
      tempMovie.description = e.target.value;
    }

    setSelectedMovie(tempMovie);
  };

  const deleteMovie = (rowData) => {
    console.log(rowData);
    const movieId = rowData._id;

    removeMovie(movieId)
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          fetchMovies();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editMovie = (rowData) => {
    setSelectedMovie({ ...rowData });
    setShowMovieEditModal(true);
  };

  return (
    <div>
      <MaterialTable
        title="Movies"
        columns={moviescolumns}
        data={allmovies}
        actions={[
          {
            icon: Edit,
            tooltip: "Edit Theater",
            onClick: (event, rowData) => editMovie(rowData),
          },

          {
            icon: Delete,
            tooltip: "Delete Theater",
            onClick: (event, rowData) => deleteMovie(rowData),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          sorting: true,
          exportMenu: [
            {
              label: "Export PDF",
              exportFunc: (cols, datas) =>
                ExportPdf(cols, datas, "UserRecords"),
            },
            {
              label: "Export CSV",
              exportFunc: (cols, datas) =>
                ExportCsv(cols, datas, "userRecords"),
            },
          ],
          headerStyle: {
            backgroundColor: "#000",
            color: "#fff",
            marginRight: "50px",
          },
          rowStyle: {
            backgroundColor: "#eee",
          },
        }}
      />
      {showMovieEditModal && (
        <Modal
          show={showMovieEditModal}
          onHide={() => {
            setErrorMessage("");
            setShowMovieEditModal(false);
          }}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>EDIT THEATRE</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="p-1">
              <h4>TheatreId: {selectedMovie._id}</h4>
            </div>
            <hr />
            <form onSubmit={handleEditMovieSubmit}>
              <div className="input-group">
                <label>
                  Movie Name:
                  <input
                    type="text"
                    value={selectedMovie.name}
                    name="name"
                    className="form-control m-1"
                    onChange={handleMovieChange}
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  Release Date:
                  <input
                    type="text"
                    value={selectedMovie.releaseDate}
                    name="releaseDate"
                    className="form-control m-1"
                    onChange={handleMovieChange}
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  Release Status:
                  <input
                    type="text"
                    value={selectedMovie.releaseStatus}
                    name="releaseStatus"
                    className="form-control m-1"
                    onChange={handleMovieChange}
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  Director:
                  <input
                    type="text"
                    value={selectedMovie.director}
                    name="director"
                    className="form-control m-1"
                    onChange={handleMovieChange}
                  />
                </label>
              </div>
              <div className="input-group">
                <label>
                  Description:
                  <textarea
                    name="description"
                    className="form-control m-1"
                    onChange={handleMovieChange}
                  >
                    {selectedMovie.description}
                  </textarea>
                </label>
              </div>

              <div className="input-group">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setErrorMessage("");
                    setShowMovieEditModal(false);
                  }}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>

            {errorMessage && <div className="text-danger">{errorMessage}</div>}
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default MoviesList;
