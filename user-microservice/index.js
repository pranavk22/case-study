const app = require("./app");

// Start the server
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Server listening at ${port}`);
