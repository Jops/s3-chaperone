module.exports = {
    all: {
        path: '/api/*',
        method: 'all',
        callback: function( req, res, next ) {
            if (!req.client.authorized) {
                res.status(401).send(
                    'Certification Required'
                );
            } else {
                next();
            }
        }
    },
    index: {
        path: '/api/access',
        method: 'get',
        callback: function( req, res ) {
            res.status(200).json(
                {
                    message: 'Secure endpoint?'
                }
            );
        }
    }
};
