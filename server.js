const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const env = require("dotenv");
const app = express();
const port = 3000;
const fileUpload = require("express-fileupload");
app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname));
app.set("view cache", false);
/**
 * Config .env file
 */
env.config({
  path: "./.env"
});
/**
 * Read all routes from route folder
 * @return void
 */
const Routes = fs.readdirSync(`${__dirname}/routes`);
Routes.map(route => require(`./routes/${route}`)(app));

app.listen(
  port,
  () => (
    require("./utils/db"),
    console.log(`listening on - http://localhost:${port}`)
  )
);
