var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const { default: Axios } = require("axios");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: "https://jobsatgit.netlify.app",
  }));

var router = express.Router();
router.get(`/positions/currentLocation`, function (req, res) {
  var lat = req.query.latitude;
  var long = req.query.longitude;

  Axios.get(
    `https://jobs.github.com/positions.json?lat=${lat}&long=${long}`
  ).then((x) => {
    res.json(x.data);
  });
});

router.get(`/positions`, function (req, res) {
  let githubJobUrl = new URL("https://jobs.github.com/positions.json");

  for (key of Object.keys(req.query)) {
    githubJobUrl.searchParams.append(key, req.query[key]);
    console.log(key);
  }
  Axios.get(githubJobUrl.href).then((x) => {
    res.json(x.data);
  });
});

router.get("/ID", function (req, res) {
  let githubJobUrl = new URL(
    `https://jobs.github.com/positions/${req.query.id}.json`
  );

  Axios.get(githubJobUrl.href).then((x) => {
    res.json(x.data);
  });
});

var port = process.env.PORT || 8080;
app.use("/api", router);
app.listen(port);
