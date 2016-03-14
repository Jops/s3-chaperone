var route = require('./route'),
    config = require('config')

    routesList = [
        route.build(
            config.routes.index,
            'get',
            function( req, res ) {
                res.redirect('/status');
            }
        ),
        route.build(
            config.routes.status,
            'get',
            function( req, res ) {
                res.status(200).send(
                    'OK'
                );
            }
        )
    ];

module.exports = routesList;
