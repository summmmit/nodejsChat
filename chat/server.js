var mongo = require('mongodb').MongoClient;
var client = require('socket.io').listen(8080).sockets;

mongo.connect('mongodb://127.0.0.1/chat', function (err, db) {

    if (err)
        throw err;

    client.on('connection', function (socket) {

        console.log('some is helre');

        var col = db.collection('messages');
        var sendStatus = function(s){
            socket.emit('status', s);
        }

        // wait for input
        socket.on('input', function (data) {
            console.log('1');
            console.log(data);

            var name = data.name;
            var message = data.message;
            var whiteSpacePattern = /^\s*$/;

            if(whiteSpacePattern.test(name) || whiteSpacePattern.test(message)){
                sendStatus("Name and Message is Required.");
            }else {

                col.insert({name: name, message: message}, function(){
                    console.log("Inserted");
                })
            }
        })

    });
});