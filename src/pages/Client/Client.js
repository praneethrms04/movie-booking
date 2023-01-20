import React, { useEffect, useState } from "react";
import Navbar from "../../components/header/Navbar";
import MaterialTable from "material-table";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

import { Delete, Edit } from "@material-ui/icons";

import { getAllTheatres } from "../../api/theatres";
import { getAllMovies } from "../../api/movies";

import { theatrecolumns } from "../../constants/theatredata";

import { moviescolumns } from "../../constants/moviesdata";
import "./client.css";
const Client = () => {
  const [theatres, setAllTheatres] = useState([]);
  const [allmovies, setAllMovies] = useState([]);
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
    const deleteTheatre = (rowData) => {
      const theatreId = rowData._id;
      let theatreListUpdated = theatres.filter((theatre) => {
        let { _id } = theatre;
        return _id !== theatreId;
      });
      if(theatreListUpdated){
        alert("Are you sure to Delete Theatre ?")
        setAllTheatres(theatreListUpdated);
      }
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
              // onClick: (event, rowData) => editTheater(rowData)
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
    </>
  );
};

export default Client;
