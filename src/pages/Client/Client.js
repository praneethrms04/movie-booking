import React, { useEffect, useState } from "react";
import Navbar from "../../components/header/Navbar";
import { Modal } from "react-bootstrap";
import MaterialTable from "material-table";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

import { Delete, Edit } from "@material-ui/icons";

import { getAllTheatres, updateTheatre } from "../../api/theatres";
import { getAllMovies } from "../../api/movies";

import { theatrecolumns } from "../../constants/theatredata";
import { moviescolumns } from "../../constants/moviesdata";
import "./client.css";
const Client = () => {

  const [theatres, setAllTheatres] = useState([]);
  const [allmovies, setAllMovies] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState({});
  const [errorMessage, setErrorMessage] = useState("");


  const name = localStorage.getItem("name");

  useEffect(() => {
    fetchTheatres();
    fetchMovies();
  }, []);

  const fetchTheatres = () => {
    getAllTheatres()
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          // console.log(data);
          setAllTheatres(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
  // Delete a Threatre
    const deleteTheatre = (rowData) => {
      const theatreId = rowData._id;
      let theatreListUpdated = theatres.filter((theatre) => {
        let { _id } = theatre;
        return _id !== theatreId;
      });
      if(window.confirm("Are you Delete Theatre ?")){
        setAllTheatres(theatreListUpdated);
      }
    };

    // Edit Theatre

    const editTheater =(theatreDetail)=>{
      setSelectedTheatre({...theatreDetail})
      setShowEditModal(true);
    }

    const handleTicketsChange =(e)=>{
      
      const tempTheatre = {...selectedTheatre}
      if(e.target.name === "name"){
        tempTheatre.name = e.target.value
      }else if(e.target.name === "city"){
        tempTheatre.city = e.target.value
      }else if(e.target.name === "description"){
        tempTheatre.description = e.target.value
      }else if(e.target.name === "pinCode"){
        tempTheatre.pinCode = e.target.value
      }
      setSelectedTheatre(tempTheatre);
    }

    const handleEditTheatreSubmit = e => {
      const id = selectedTheatre._id;

      try {
          updateTheatre(id, selectedTheatre)
              .then(res => {
                  const { message, status } = res;
                  if (status === 200) {
                      setSelectedTheatre({});
                      setErrorMessage("");
                      setShowEditModal(false);
                      fetchTheatres();
                  } else if (message) {
                      setErrorMessage(message);
                  }
              })
              .catch(err => {
                  setErrorMessage(err.message);
              });
      } catch (err) {
          setErrorMessage(err.message);
      }
      e.preventDefault();
  };

  return (
    <>
      <Navbar />
      <div>
        <h3>welcome {name}</h3>
        <p>Please Lookat these products below </p>
      </div>

      <div>
        <MaterialTable
          title="Theatres"
          columns={theatrecolumns}
          data={theatres}
          actions={[
            {
              icon: Edit,
              tooltip: "Edit Theater",
              onClick: (event, rowData) => editTheater(rowData)
            },

            {
              icon: Delete,
              tooltip: "Delete Theater",
              onClick: (event, rowData) => deleteTheatre(rowData),
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
      </div>
      <div>
        <MaterialTable
          title="Movies"
          columns={moviescolumns}
          data={allmovies}
          options={{
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
      </div>
      {
        showEditModal && (
          <Modal
            show={showEditModal}
            onHide={() => {
                setErrorMessage("");
                setShowEditModal(false);
            }}
            backdrop='static'
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>EDIT THEATRE</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="p-1">
                    <h4>TheatreId: {selectedTheatre._id}</h4>
                </div>

                <hr />

                <form
                 onSubmit={handleEditTheatreSubmit}
                 >
                    <div className='input-group'>
                        <label>
                            Theatre Name:
                            <input
                                type='text'
                                value={selectedTheatre.name}
                                name='name'
                                className='form-control m-1'
                                onChange={handleTicketsChange}
                            />
                        </label>
                    </div>

                    <div className='input-group'>
                        <label>
                            Theatre City:
                            <input
                                type='text'
                                value={selectedTheatre.city}
                                name='city'
                                className='form-control m-1'
                                onChange={handleTicketsChange}
                            />
                        </label>
                    </div>

                    <div className='input-group'>
                        <label>
                            Theatre Pincode:
                            <input
                                type='text'
                                value={selectedTheatre.pinCode}
                                name='pinCode'
                                className='form-control m-1'
                                onChange={handleTicketsChange}
                            />
                        </label>
                    </div>

                    <div className='input-group'>
                        <label>
                            Theatre Description:
                            <textarea
                                name='description'
                                className='form-control m-1'
                                onChange={handleTicketsChange}
                            >
                                {selectedTheatre.description}
                            </textarea>
                        </label>
                    </div>

                    <div className='input-group'>
                        <button
                            type='button'
                            className='btn btn-secondary'
                            onClick={() => {
                                setErrorMessage("");
                                setShowEditModal(false);
                            }}
                        >
                            Cancel
                        </button>

                        <button type='submit' className='btn btn-primary'>
                            Update
                        </button>
                    </div>
                </form>
              
                {errorMessage && (
                    <div className='text-danger'>{errorMessage}</div>
                )} 
            </Modal.Body>
        </Modal>
        )

      }
    </>
  );
};

export default Client;
