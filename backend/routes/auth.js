var mongo = require('mongodb');
var zeusapi = require('../lib/zeusfw/zeusfw-min.js');



//show all users
//JUST FOR TEST, REMOVE BEFORE PUT IN PRODUCTION!!!!
exports.findAll = function(req, res) {
    db.collection('users', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};


//login and return auth token
exports.login = function(req, res) {

    zeusapi.decode(req.body.data_string, function(input){
        //console.log(input.device);     
        
        db.collection('users', function(err, collection) {
            collection.findOne({"username": input.device.username, "password": input.device.password}, function(err, item) {
                if(err){
                    console.log(err);
                }
                
                if(!item){
                    res.header('Access-Control-Allow-Origin', input.api.uri);
                    res.send(zeusapi.encode({error: 1000, message: "Invalid username or password"}, input.api.key));
                }
                else{
                    var user = {};
                        user._id = item._id;
                        user.username = item.username;
                        user.name = item.name;
                        user.email = item.email;
                        user.registeredIn = item.registeredIn;
                    
                    //tenta verificar se este usuário já possui um token de autenticacao
                    db.collection('api_auth', function(err, collection){
                        collection.findOne({"username": item.username}, function(err, result){
                            //se ja tem token
                            if(result){
                                user.auth_token = result.auth_token;
                                res.header('Access-Control-Allow-Origin', input.api.uri);
                                res.send(zeusapi.encode(user, input.api.key));
                            }
                            //se nao tem token
                            else{
                                var user_auth = {
                                    username: item.username, 
                                    auth_token: new mongo.ObjectID(),
                                    createdAt: new Date()
                                };
                                
                                collection.insert(user_auth, {safe:true}, function(err, result){
                                    //cria o indice de expiracao do token
                                    collection.ensureIndex( { "createdAt": 1 }, { expireAfterSeconds: 2592000 } );
                                    
                                    user.auth_token = user_auth.auth_token;
                                    
                                    res.header('Access-Control-Allow-Origin', input.api.uri);
                                    res.send(zeusapi.encode(user, input.api.key));
                                }); 
                            }
                        });    
                    });
                }
            });
        });    
    });
};

//get auth
exports.getAuth = function(req, res) {

    zeusapi.decode(req.body.data_string, function(input){
        
        db.collection('api_auth', function(err, collection) {
            collection.findOne({"auth_token": input.device.auth_token}, function(err, item) {
                if(err){
                    console.log(err);
                }
                
                if(!item){
                    res.header('Access-Control-Allow-Origin', input.api.uri);
                    res.send(zeusapi.encode({error: 1010, message: "Invalid auth token"}, input.api.key));
                }
                else{

                    db.collection('users', function(err, collection){
                        collection.findOne({"username": item.username}, function(err, result){
                            if(err){
                                console.log(err);
                            }
                            else{
                                var user = {};
                                    user._id = result._id;
                                    user.username = result.username;
                                    user.name = result.name;
                                    user.email = result.email;
                                    user.registeredIn = result.registeredIn;
                                    user.auth_token = input.device.auth_token;

                                res.header('Access-Control-Allow-Origin', input.api.uri);
                                res.send(zeusapi.encode(user, input.api.key));    
                            }
                        });
                    });
                }
            });
        });    
    });
};



exports.getUploadSign = function(req, res){

    //User Name,Access Key Id,Secret Access Key
    //"randomx",AKIAJT7HZG56NLFXHZMA,OKfzqqWlkJKlozEPL4a0/LzJk/oDXgHNWS3Z1fIc
    var crypto = require('crypto'),
        bucket = "rndmx-photos",
        awsKey = "AKIAJT7HZG56NLFXHZMA",
        secret = "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";

    zeusapi.decode(req.body.data_string, function(input){

        var user = input.device.user; //user credetials
        var fileName = input.device.filename,
            expiration = new Date(new Date().getTime() + 1000 * 60 * 5).toISOString(); // expire in 5 minutes

        var policy =
        { "expiration": expiration,
            "conditions": [
                {"bucket": bucket},
                {"key": fileName},
                {"acl": 'public-read'},
                ["starts-with", "$Content-Type", ""],
                ["content-length-range", 0, 524288000]
            ]};

        policyBase64 = new Buffer(JSON.stringify(policy), 'utf8').toString('base64');
        signature = crypto.createHmac('sha1', secret).update(policyBase64).digest('base64');    

        var file_register = {
            username: user.username,
            user_id: user._id,
            auth_token: user.auth_token,
            title: input.device.title,
            mimetype: input.device.mimetype,
            filename: fileName,
            thumbnail: "thumb_" + fileName,
            width: input.device.width,
            height: input.device.height,
            bucket: bucket,
            upload_date: new Date().getTime(),
            isConfirmed: false,
            isPublic: false,
            likes_count: 0,
            unlikes_count: 0,
            comments_count: 0,
            reports_count: 0,
            shares_count: 0
        }

        db.collection('posts', function(err, collection) {
            collection.insert(file_register, {safe:true}, function(err, result) {

                if (err) {
                    console.log('Error on storing picture metadata...');
                }
                else{
                    res.header('Access-Control-Allow-Origin', input.api.uri);
                    res.send(zeusapi.encode(
                    { 
                        "filename": fileName, 
                        "fileuri": input.device.fileuri, 
                        "mimetype": input.device.mimetype, 
                        "bucket": bucket, 
                        "awsKey": awsKey, 
                        "policy": policyBase64, 
                        "signature": signature
                    }
                    , input.api.key));
                }

            });
        });
    });
};


/*
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving wine: ' + id);
    db.collection('wines', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};


exports.addWine = function(req, res) {
    var wine = req.body;
    console.log('Adding wine: ' + JSON.stringify(wine));
    db.collection('wines', function(err, collection) {
        collection.insert(wine, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateWine = function(req, res) {
    var id = req.params.id;
    var wine = req.body;
    console.log('Updating wine: ' + id);
    console.log(JSON.stringify(wine));
    db.collection('wines', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, wine, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(wine);
            }
        });
    });
}

exports.deleteWine = function(req, res) {
    var id = req.params.id;
    console.log('Deleting wine: ' + id);
    db.collection('wines', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
*/

/*--------------------------------------------------------------------------------------------------*/
// Populate database with sample data
var populateUsersCollection = function() {

    var users = {
        username: "dev",
        password: "xpto",
        email: "marcoslucas@me.com",
        name: "Development Username",
        registeredIn: new Date(),
    };

    db.collection('users', function(err, collection) {
        collection.insert(users, {safe:true}, function(err, result) {});
    });
};