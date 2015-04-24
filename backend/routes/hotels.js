exports.test = function(req, res) {
	res.send('show hotels');
}

exports.getAllHotels = function(req, res){
	
	var fs = require("fs");
	var hotels = JSON.parse(fs.readFileSync("./dataset/hotels.json", "utf8"));

	res.header('Access-Control-Allow-Origin', '*');
	res.json(hotels);
}

exports.getPreFetchedPlaces = function(req, res){
	
	var fs = require("fs");
	var hotels = JSON.parse(fs.readFileSync("./dataset/hotels.json", "utf8"));

	res.header('Access-Control-Allow-Origin', '*');
	res.json(hotels);
}

exports.getHotel = function(req, res){
	console.log(req.query.q);

	var fs = require("fs");
	var hotels = JSON.parse(fs.readFileSync("./dataset/hotels.json", "utf8"));

	res.header('Access-Control-Allow-Origin', '*');
	res.json(hotels);
}