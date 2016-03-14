var chai = require("chai"),
    expect = chai.expect,
    sinon = require("sinon"),
    sinonChai = require("sinon-chai"),
    mockery = require('mockery'),
    bucketHelper = require('../lib/controllers/helpers/bucket'),
    certHelper = require('../lib/controllers/helpers/certificate'),
    s3Controller;

chai.use(sinonChai);

var mockAWSClient = {
    getObjectWithTTL: sinon.spy(),// or stub to return stuff
    putObjectWithTTL: sinon.spy()
};

var mockCertSubject = {
    subject: { CN: 'certCN' }
};

var stubCertSubject = sinon.stub().returns( mockCertSubject );

var mockReqSocket = {
    getPeerCertificate: stubCertSubject
};

var mockRequest = {
    socket: mockReqSocket
};

describe( 'S3 Controller', function() {

    before(function() {
        mockery.registerMock( 'aws-client', mockAWSClient );
        s3Controller = require('../lib/controllers/s3');
    });

    describe( 'helpers', function() {
        it(
            'should get client certificate',
            function()
            {
                certHelper.obtainClientCertFromRequest(mockRequest);
                expect( stubCertSubject.calledOnce ).to.be.true;
            }
        );

        it(
            'should generate bucket key from client credentials',
            function()
            {
                var clientCertSubject = mockCertSubject,
                    filename = 'file.png',
                    expectedKey = 'certCN/file.png',

                    key = bucketHelper.createBucketKeyFromCert(
                        clientCertSubject,
                        filename
                    );

                expect( key ).to.equal(expectedKey);
            }
        );
    });

    describe.skip( 'Pre-signed GET', function() {
        it(
            'should return a getObject pre-signed uri',
            function( done )
            {
                var key = '/thekey/file.png';
                s3Controller.requestSignedUrl( mockRequest, key ).then(
                    function( url ) {
                        expect( url ).to.contain( key );
                        done();
                    }
                );
            }
        );
    });

    describe.skip( 'Pre-signed PUT', function() {
        it(
            'should return a putObject pre-signed uri',
            function()
            {
            }
        );
    });
});
