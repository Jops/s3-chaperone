var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    express = require('express'),
    app = express(),
    routes = require('./routes');

var portHTTP = 8080,
    portHTTPS = 8446;

/**
 * PUBLIC
 */
function public()
{
    http.createServer( app ).listen( portHTTP, function () {
        console.log('Listening on port %d!', portHTTP);
    });
}

/**
 * PROTECTED
 */
function protected()
{
    https.createServer(
        {
            key: fs.readFileSync( 'ssl/server.key' ),
            cert: fs.readFileSync( 'ssl/server.crt' ),
            ca: fs.readFileSync( 'ssl/ca.crt' ),
            requestCert: true,
            rejectUnauthorised: true
        },
        app
    ).listen( portHTTPS, function () {
        console.log('HTTPS listening on port %d!', portHTTPS);
    });
}

function start() {
    routes.setup(
        app,
        {
            public: require('./routes/public'),
            protected: require('./routes/protected')
        }
    );
    public();
    protected();
}

module.exports = {
    start: start,
    app: app
};


/*
# Create the CA Key and Certificate for signing Client Certs
openssl genrsa -des3 -out ca.key 4096
openssl req -new -x509 -days 365 -key ca.key -out ca.crt

# Create the Server Key, CSR, and Certificate
openssl genrsa -des3 -out server.key 1024
OR openssl rsa -in server.key -out server.key # to remove password
openssl req -new -key server.key -out server.csr

# We're self signing our own server cert here.  This is a no-no in production.
openssl x509 -req -days 365 -in server.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out server.crt

# Create the Client Key and CSR
openssl genrsa -des3 -out client.key 1024
openssl req -new -key client.key -out client.csr

# Sign the client certificate with our CA cert.  Unlike signing our own server cert, this is what we want to do.
openssl x509 -req -days 365 -in client.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out client.crt
*/