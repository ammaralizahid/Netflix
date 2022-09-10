const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 3001;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=> {
    res.redirect("/netly")
});

app.get("/netly", (req, res)=> {
    res.render("home")
});

app.get("/movies", (req, res)=> {
    const query = req.query.search;
    request("http://www.omdbapi.com/?apikey=575abd82&s=" + query, (error, response, body)=> {
        if(!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            res.render("result", {data: data})
        }
    })
});

app.get("/movie_description/:id", (req, res)=> {
    const id = req.params.id;
    request("http://www.omdbapi.com/?apikey=575abd82&i=" + id, (error, response, body)=> {
        if(!error && response.statusCode == 200) {
            const film = JSON.parse(body);
            res.render("movie", {film: film});
        } else {
            console.log(error)
        }
    })
})

app.listen(port, ()=> {
    console.log(`Netly App running on port: ${port}`)
});