import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";

const api = axios.create({
  baseURL: `http://localhost:9100/bookings`,
});

function Flights() {
  //   console.log(fetchFlights);

  var columns = [
    {
      title: "Ticket no",
      field: "bookingId",
    },
    { title: "Flight Name", field: "flight.name" },

    {
      title: "Source",
      field: "flight.from",
    },
    {
      title: "Destination",
      field: "flight.to",
    },
    { title: "Date", field: "flight.date", type: "date" },

    { title: "Fare", field: "flight.fare", type: "numeric" },
    { title: "First name", field: "user.firstName" },
    { title: "Last name", field: "user.lastName" },
    { title: "Birthdate", field: "user.birthdate", type: "date" },

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

  return (
    <div className="App">
      <Grid container spacing={1}>
        <Grid item xs={0}></Grid>
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
            title="View all bookings"
            columns={columns}
            data={data}
            // icons={tableIcons}
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
}
export default Flights;
