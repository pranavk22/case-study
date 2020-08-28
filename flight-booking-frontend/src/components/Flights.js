import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";

const api = axios.create({
  baseURL: `http://localhost:9000/flights`,
});

function Flights() {
  //   console.log(fetchFlights);

  var columns = [
    {
      title: "Airlines Company",
      field: "airlines",
    },
    { title: "Flight Name", field: "name" },

    {
      title: "Source",
      field: "from",
    },
    {
      title: "Destination",
      field: "to",
    },
    { title: "Date", field: "date", type: "date" },

    { title: "Fare", field: "fare", type: "numeric" },
    // {
    //   title: "Birth Place",
    //   field: "birthCity",
    //   lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
    // },
  ];

  const [data, setData] = useState([]);

  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    api
      .get("/")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log("Error");
      });
  }, []);

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = [];
    if (newData.airlines === "") {
      errorList.push("Please enter airlines company name");
    }
    if (newData.name === "") {
      errorList.push("Please enter flight name");
    }
    if (newData.from === "") {
      errorList.push("Please enter source");
    }
    if (newData.to === "") {
      errorList.push("Please enter destination");
    }
    if (newData.date === "") {
      errorList.push("Please enter date");
    }
    if (newData.fare === "") {
      errorList.push("Please enter fare");
    }

    if (errorList.length < 1) {
      api
        .patch("/" + newData._id, newData)
        .then((res) => {
          const dataUpdate = [...data];
          const index = oldData.tableData._id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
        })
        .catch((error) => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = [];
    if (newData.airlines === "") {
      errorList.push("Please enter airlines company name");
    }
    if (newData.name === "") {
      errorList.push("Please enter flight name");
    }
    if (newData.from === "") {
      errorList.push("Please enter source");
    }
    if (newData.to === "") {
      errorList.push("Please enter destination");
    }
    if (newData.date === "") {
      errorList.push("Please enter date");
    }
    if (newData.fare === "") {
      errorList.push("Please enter fare");
    }

    if (errorList.length < 1) {
      //no error
      api
        .post("/", newData)
        .then((res) => {
          let dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve();
          setErrorMessages([]);
          setIserror(false);
        })
        .catch((error) => {
          setErrorMessages(["Cannot add data. Server error!"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowDelete = (oldData, resolve) => {
    console.log(oldData);
    api
      .delete("/" + oldData._id)
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData._id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
      })
      .catch((error) => {
        setErrorMessages(["Delete failed! Server error"]);
        setIserror(true);
        resolve();
      });
  };

  return (
    <div className="App">
      <Grid container spacing={1}>
        <Grid item xs={1}></Grid>
        <Grid item xs={0}>
          <div>
            {iserror && (
              <Alert severity="error">
                {errorMessages.map((msg, i) => {
                  return <div key={i}>{msg}</div>;
                })}
              </Alert>
            )}
          </div>
          <MaterialTable
            title="Manage flights"
            columns={columns}
            data={data}
            // icons={tableIcons}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve) => {
                  handleRowUpdate(newData, oldData, resolve);
                }),
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  handleRowAdd(newData, resolve);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve) => {
                  handleRowDelete(oldData, resolve);
                }),
            }}
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
}
export default Flights;
