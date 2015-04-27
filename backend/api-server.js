var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();
var places 		   = require('./routes/places');
var hotels 		   = require('./routes/hotels');


app.use(morgan('dev'));  //
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//places
app.get('/v1/getPreFetchedPlaces', places.getPreFetchedPlaces);
app.get('/v1/getPlace', places.getPlace);
//hotels
app.get('/v1/getPreFetchedHotels', hotels.getPreFetchedHotels);
app.get('/v1/getHotel', hotels.getHotel);


app.listen(8000);   
console.log('API Service running on port 8000!');