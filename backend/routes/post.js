var mongo = require('mongodb');
var zeusapi = require('../lib/zeusfw/zeusfw-min.js');


exports.getRandomx = function(req, res) {
    
    zeusapi.decode(req.body.data_string, function(input){ 
    	db.collection('posts', function(err, collection) {
    		collection.find({"isConfirmed": false}).toArray(function(err, result){
				res.header('Access-Control-Allow-Origin', input.api.uri);
        		res.send(zeusapi.encode(result, input.api.key));
    		});
    	});

    });
};