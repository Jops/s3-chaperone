var expect = require('chai').expect,
    request = require('request'),
    fs = require('fs'),
    path = require('path');

var siteURL_HTTP = 'http://localhost:8080',
    siteURL_HTTPS = 'https://localhost:8446';

var httpsClientOptions = {
    url: siteURL_HTTPS,
    proxy: '',
    key: fs.readFileSync(path.resolve(__dirname, '../ssl/client.key')),
    cert: fs.readFileSync(path.resolve(__dirname, '../ssl/client.crt')),
    ca: fs.readFileSync(path.resolve(__dirname, '../ssl/ca.crt')),
    passphrase: 'mykey'
};

describe( 'App', function() {

    before( function() {
        // start server
        require('..');
        // disable request skipping self signed server certs for development only
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    });

    describe( 'Routing', function() {
        it( 'should return OK status on the /status public page', function( done ) {
            request.get(
                {
                    url: siteURL_HTTP + '/status',
                    proxy: ''
                },
                function( err, res )
                {
                    expect( err ).to.equal( null );
                    expect( res.statusCode ).to.equal( 200 );
                    expect( res.body ).to.equal( 'OK' );
                    done();
                }
            );
        });

        it( 'should redirect to /status', function( done ) {
            request.get(
                {
                    url: siteURL_HTTP + '/',
                    proxy: ''
                },
                function( err, res )
                {
                    expect( err ).to.equal( null );
                    expect( res.statusCode ).to.equal( 200 );
                    expect( res.body ).to.equal( 'OK' );
                    done();
                }
            );
        });

        it( 'should deny unauthorised access to /api/s3', function( done ) {
            request.get(
                {
                    url: siteURL_HTTPS + '/api/s3',
                    proxy: '',
                    ca: fs.readFileSync(path.resolve(__dirname, '../ssl/ca.crt'))
                },
                function( err, res )
                {
                    expect( res.statusCode ).to.equal( 401 );
                    expect( res.body ).to.equal( 'Certification Required' );
                    done();
                }
            );
        });

        it( 'should allow authorised access to /api/s3', function( done ) {
            httpsClientOptions.url += '/api/s3';
            request.get(
                httpsClientOptions,
                function( err, res )
                {
                    expect( res.statusCode ).to.equal( 200 );
                    expect( res.headers['content-type'] ).to.contain( 'application/json' );
                    expect( JSON.parse( res.body ).name ).to.equal( 's3-chaperone API' );
                    done();
                }
            );
        });
    });
});
