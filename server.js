var mongo = require('mongodb').MongoClient;
var client = require('socket.io').listen(8080).sockets;

mongo.connect('mongodb://127.0.0.1/nodejsChat', function (err, db) {

    if (err)
        throw err;

    client.on('connection', function (socket) {

        console.log('some is helre');

        var col = db.collection('messages');

        // wait for input
        socket.on('input', function (data) {
            console.log('1');
            console.log(data);

            var name = data.name;
            var message = data.message;
            var whiteSpacePattern = /^\s*$/;

            if(whiteSpacePattern.test(name) || whiteSpacePattern.test(message)){
                console.log('Invalid data');
            }else {

                col.insert({name: name, message: message}, function(inputData){
                    console.log(inputData);
                })
            }
        })

    });
});