const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      swagger: "2.0",
      version: "1.0.0",
      title: "User Details API",
      description: "It contains information of the traveller ",
      contact: {
        name: "Pranav Karmarkar",
      },
      servers: ["http://localhost:" + process.env.PORT],
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

mongoose.set("useFindAndModify", false);

const userDetailsRouter = require("./routes/userDetails");

app.use("/users", userDetailsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
