const express = require("express");
const app = express();

app.set("view engine", "ejs");

const port = 8000;
const http = require("https");

app.get("/movies", (request, response) => {
  const options = {
    method: "GET",
    hostname: "imdb-top-100-movies.p.rapidapi.com",
    port: null,
    path: "/top100movies",
    headers: {
      "X-RapidAPI-Key": "4d238684ecmsh29829391eb68764p182ec8jsnd5bbba0abc15",
      "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
    },
  };
  const req = http.request(options, function (res) {
    const chunks = [];
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
    res.on("end", function () {
      const body = Buffer.concat(chunks);
      const moviesdata = JSON.parse(body);
      console.log(moviesdata);
      response.render("index.ejs", {
        movies: moviesdata,
      });
    });
  });
  req.end();
});

app.listen(port, () => {
  console.log("listening to port: " + port);
});
