// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listening);

function listening() {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
};

app.post('/add', function (request, response) {
    let data = request.body;
    console.log(data);
});

let weatherData =[];

app.get('/retrive', (request,response) =>{
    response.send(WeatherData[0]);
});

app.post('/add', (request,response) => {
    WeatherData.push(request.body)
    response.send(weatherData[0]);
}
)