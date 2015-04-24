var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var app            = express();
var hotels  = require('./routes/hotels');


app.use(morgan('dev'));  //
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());


app.get('/v1/hotels', hotels.test);
app.get('/v1/gethotels', hotels.getAllHotels);
app.get('/v1/gethotel', hotels.getHotel);
app.get('/v1/getprefetchedplaces', hotels.getPreFetchedPlaces);


app.listen(8000);   
console.log('API Service running on port 8000!');