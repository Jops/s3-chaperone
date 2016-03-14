var Controller = require('./controller'),
    route = require('../routes/route'),
    awsClient = require('../adapters/aws-client'),
    bucketHelper = require('./helpers/bucket'),
    certificateHelper = require('./helpers/certificate');

(function() {

    module.exports = require('../../lib/_class').create(
        {
            name: 's3-chaperone API',

            constructor: function( pathPrefix )
            {
                this.addEndpoints(
                    [
                        route.build(
                            pathPrefix + '/:filename',
                            'get',
                            this.getSignedUrl
                        )
                    ]
                );
                Controller.call( this, pathPrefix );
            },

            getSignedUrl: function( req, res, next ) {
                return requestSignedUrl( req, 'get' ).then(
                    function( url ) {
                        res.send( 'getObject url = ' + url );
                        next();
                    }
                );
            },

            requestSignedUrl: function( req, method ) {
                return awsClient.signedUrl(
                    method,
                    bucketHelper.createBucketKeyFromCert(
                        certificateHelper.obtainClientCertFromRequest( req ),
                        req.params.filename
                    )
                );
            }

        },
        Controller
    );

}());

