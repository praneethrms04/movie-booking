import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { theatrecolumns } from "../../constants/theatredata";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { Delete, Edit } from "@material-ui/icons";
import { getAllTheatres, updateTheatre } from "../../api/theatres";
import TheatresEditModal from "../theatres-edit-modal/TheatresEditModal";

const TheatreList = () => {
  const [theatres, setAllTheatres] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchTheatres();
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
  // Delete a Threatre
  const deleteTheatre = (rowData) => {
    const theatreId = rowData._id;
    let theatreListUpdated = theatres.filter((theatre) => {
      let { _id } = theatre;
      return _id !== theatreId;
    });
    if (window.confirm("Are you Delete Theatre ?")) {
      setAllTheatres(theatreListUpdated);
    }
  };

  // Edit Theatre

  const editTheater = (theatreDetail) => {
    setSelectedTheatre({ ...theatreDetail });
    setShowEditModal(true);
  };

  const handleTicketsChange = (e) => {
    const tempTheatre = { ...selectedTheatre };
    if (e.target.name === "name") {
      tempTheatre.name = e.target.value;
    } else if (e.target.name === "city") {
      tempTheatre.city = e.target.value;
    } else if (e.target.name === "description") {
      tempTheatre.description = e.target.value;
    } else if (e.target.name === "pinCode") {
      tempTheatre.pinCode = e.target.value;
    }
    setSelectedTheatre(tempTheatre);
  };

  const handleEditTheatreSubmit = (e) => {
    const id = selectedTheatre._id;

    try {
      updateTheatre(id, selectedTheatre)
        .then((res) => {
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
        .catch((err) => {
          setErrorMessage(err.message);
        });
    } catch (err) {
      setErrorMessage(err.message);
    }
    e.preventDefault();
  };

  return (
    <>
      <MaterialTable
        title="Theatres"
        columns={theatrecolumns}
        data={theatres}
        actions={[
          {
            icon: Edit,
            tooltip: "Edit Theater",
            onClick: (event, rowData) => editTheater(rowData),
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
      {showEditModal && (
        <TheatresEditModal
          showEditModal={showEditModal}
          setErrorMessage={setErrorMessage}
          setShowEditModal={setShowEditModal}
          selectedTheatre={selectedTheatre}
          handleEditTheatreSubmit={handleEditTheatreSubmit}
          handleTicketsChange={handleTicketsChange}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
};

export default TheatreList;
