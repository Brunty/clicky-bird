//disconnectFromGame = function (gameId) {
//    // increment the counter when button is clicked
//    Games.update(gameId, {
//        $inc: {players: -1}
//    });
//
//    //if (Meteor.isClient) {
//    //    toastr.error('Player quit');
//    //}
//};
//connectToGame = function (gameId) {
//    // increment the counter when button is clicked
//    Games.update(gameId, {
//        $inc: {players: 1}
//    });
//    //
//    //if (Meteor.isClient) {
//    //    toastr.success('A new player has joined');
//    //}
//};
setPlayers = function (gameId, players) {
    // increment the counter when button is clicked
    Games.update(gameId, {
        $set: {players: players}
    });
};
moveUp = function () {
    // increment the counter when button is clicked
    Games.update('game', {
        $inc: {position: 1}
    });
};
moveDown = function () {
    Games.update({
        _id: 'game',
        position: { $gt: 0 }
    }, {
        $inc: { position: -1, frame: 1 }
    });
};

if (Meteor.isClient) {
    connectedPlayers = 0;

    Template.bird.onRendered(function () {
        var instance = Template.instance();

        instance.subscribe('game', 'game', function() {
            var game = Games.findOne('game');

            console.log(game);
            instance.autorun(function() {
                var game = Games.findOne('game');

                console.log(game);

                if (document.getElementById('bird-canvas')) {
                    draw(game.position, game.frame, game.seed);
                }

                if (connectedPlayers != game.players) {
                    connectedPlayers = game.players;

                    if (connectedPlayers > 1) {
                        var players = 'are ' + connectedPlayers + ' players';
                    }
                    else {
                        var players = 'is ' + connectedPlayers + ' lonely player';
                    }

                    toastr.clear();
                    toastr.success('There ' + players + ' playing');
                }
            });
        });
    });

    //Template.bird.helpers({
    //    position: function () {
    //        return Games.findOne('game').position;
    //    },
    //    players:  function () {
    //        return Games.findOne('game').players;
    //    }
    //});

    Template.bird.events({
        'click': function () {
            moveUp();
        }
    });
}

if (Meteor.isServer) {
    Meteor.setInterval(function() {
        moveDown();
    }, 1000 / 30);

    Meteor.publish("game", function (gameId) {

        var connections = Meteor.server.stream_server.open_sockets;
        console.log(connections.length);

        setPlayers('game', connections.length);

        //if (this._session.socket._events.data.length === 1) {
        //    //this._session.socket.on("data",
        //    //    Meteor.bindEnvironment(function () {
        //            console.log('Connected');
        //            connectToGame(gameId);
        //        //})
        //    //);
        //
        //    // When they disconnect, remove them from the player count
        //    this._session.socket.on("close",
        //        Meteor.bindEnvironment(function () {
        //            console.log('Disconnected');
        //            disconnectFromGame(gameId);
        //        })
        //    );
        //}

        return Games.find(gameId);
    });

    Meteor.startup(function () {
        console.log(Games.findOne('game'));

        if (Games.findOne('game') === undefined) {
            Games.insert({
                _id:      'game',
                position: 0,
                players:  1,
                seed: Random.id()
            });
        }
    });

}
