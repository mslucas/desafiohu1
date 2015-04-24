/*var zeusapi = require('../lib/zeusfw/zeusfw-min.js');

exports.setdevicestartup = function(req, res) {
    
    zeusapi.decode(req.body.data_string, function(input){
        input.device.createdDate = new Date();
        
        db.collection('devices', function(err, collection) {
            collection.insert(input.device, {safe:true}, function(err, result) {});
        });    
        
        res.header('Access-Control-Allow-Origin', input.api.uri);
        res.send(zeusapi.encode(input.device, input.api.key));    
    });
}*/

exports.test = function(req, res) {
	res.send('yeah boy!');
}
