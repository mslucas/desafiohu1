var redis		   = require('redis');
var rdsclient 	   = redis.createClient(49153, '192.168.99.100', {}); //redis port,host,options	
var fs 			   = require('fs');
var places 		   = JSON.parse(fs.readFileSync('dataset/places.json', 'utf8'));
var hotels 		   = JSON.parse(fs.readFileSync('dataset/hotels.json', 'utf8'));
var availability   = JSON.parse(fs.readFileSync('dataset/disponibilidade.json', 'utf8'));

rdsclient.select(1, function() { /* ... */ });

rdsclient.on("error", function (err) {
    console.log(err);
});
/*
console.log('IMPORTANDO HOTEIS...');

for(var i = 0; i < hotels.length; i++){
	var hotel = hotels[i];
	rdsclient.set('hotels:' + hotel.id + ':name', hotel.hotel.trim());
	rdsclient.set('hotels:' + hotel.id + ':place', hotel.cidade.trim());
}

console.log('IMPORTANDO LOCAIS...');

for(var i = 0; i < places.length; i++){
	var place = places[i];
	rdsclient.set('places:' + place.id + ':name', place.cidade.trim());
}

console.log('IMPORTANDO DISPONIBILIDADE...');

for(var i = 0; i < availability.length; i++){
	var available = availability[i];
	rdsclient.set('availability:' + available.id + ':' + available.data.trim(), available.status);
}
*/

console.log('CRIANDO CHAVES DE AUTOCOMPLETE...');
/*
for(var i = 0; i < hotels.length; i++){
	var hotel = hotels[i];
	rdsclient.set('autoc-hotels:' + hotel.hotel.toLowerCase().trim(), hotel.id);
}*/

for(var i = 0; i < places.length; i++){
	var place = places[i];
	rdsclient.set('autoc-places:' + place.cidade.toLowerCase().trim(), place.id);
}

console.log('IMPORTACAO FINALIZADA!');