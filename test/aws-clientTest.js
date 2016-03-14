var config = require('config'),
    putTTL = config.s3.put.ttl,
    getTTL = config.s3.get.ttl;
    // expect = require('chai').expect;

describe( 'AWS Client', function() {

    before(function() {
        // mock AWS SDK
        // use mockery to mock all requests
    });

    describe( 'Pre-signed GET', function() {
        it(
            'should return a pre-signed url for a getObject',
            function()
            {
            }
        );

        it(
            'needs to set the correct ttl for the GET to 5 mins',
            function()
            {
            }
        );
    });

    describe( 'Pre-signed PUT', function() {
        it(
            'should return a pre-signed url for a putObject',
            function()
            {
            }
        );

        it(
            'needs to set the correct ttl for the PUT to 1 min',
            function()
            {
            }
        );
    });
});
