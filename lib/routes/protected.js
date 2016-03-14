var config = require('config'),
    s3 = new (require('../controllers/s3'))(config.routes.s3),
    route = require('./route'),

    routesList = [
        route.build(
            config.routes.api + '/*',
            'all',
            function( req, res, next ) {
                if (!req.client.authorized) {
                    res.status(401).send(
                        'Certification Required'
                    );
                } else {
                    next();
                }
            }
        )
    ];

module.exports = routesList.concat(s3.endpoints);
