module.exports = {
    indexPage: {
        path: '/',
        method: 'get',
        callback: function( req, res ) {
            res.redirect('/status');
        }
    },
    statusPage: {
        path: '/status',
        method: 'get',
        callback: function( req, res ) {
            res.status(200).send(
                'OK'
            );
        }
    }
};
