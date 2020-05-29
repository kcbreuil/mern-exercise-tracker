/* these lines load the libraries and create variables that give us access to all
of the methods that are built into each library */
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./backend/routes/users");
const exerciseRouter = require("./backend/routes/exercises");
/* loads the dotenv library and calls the config() method, which loads the 
variables declared in the .env file into process.env */
require("dotenv").config();
/* calls the express() function from the express library, creating your 
Express app */

const app = express();
/* declares the port as either whatever it is saved as within the .evn file, 
or otherwise defaults to port 5000 */
const port = process.env.PORT || 5000;
/* enables the Express server to respond to requests, makes your server 
accessible to any domain that requests a resource from your server via a browser */

app.use(cors());
/* a method that is built into Express to recognize the incoming requests 
as JSON Objects. This method is called as a middleware in your application, 
which means it is a method/function/operation that is called between processing
an incoming request and returning a response */
app.use(express.json());
app.use(userRouter);
app.use(exerciseRouter);
// what does this do?
const uri = process.env.ATLAS_URI;
/* tells your Mongoose library where your database lives and avoids 
deprecation warning errors */

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
/* accesses the .connection method within the Mongoose library to make a 
connection to your database */
const connection = mongoose.connection;
// what does this do?
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
// what does this do?
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
