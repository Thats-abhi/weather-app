/* The code you provided is a basic Express.js server that retrieves weather data from an API and sends
it to the client. */
const express = require("express");
const app = express();

const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.post("/", (req, res) => {
    const city = req.body.cityName;
    const url = "https://api.weatherapi.com/v1/current.json?q=london&key=f4db356fc19d4fb596b160532231407";
    https.get(url, (response) => {
        
        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const temperature = weatherData.current.temp_c;
            const icon = weatherData.current.condition.icon;
            res.write("<h1>The temperature in " + city + " is " + temperature + " degrees celcius<h1>");
            res.write("<img src=" + icon + ">");
            res.send();
        });
    });
});
app.listen(3000, () => {
    console.log("server is running on port 3000");
});
