exports.getPreFetchedPlaces = function(req, res){
	
	var fs = require("fs");
	var places = JSON.parse(fs.readFileSync("./dataset/places.json", "utf8"));

	res.header('Access-Control-Allow-Origin', '*');
	res.json(places);
}

exports.getPlace = function(req, res){
	console.log(req.query.q);

	var fs = require("fs");
	var place = JSON.parse(fs.readFileSync("./dataset/places.json", "utf8"));

	res.header('Access-Control-Allow-Origin', '*');
	res.json(place);
}