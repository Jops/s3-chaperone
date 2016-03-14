module.exports = {
    /**
     * returns a bucket key from certificate subject and filename
     *
     * @param {Object} clientCertificate - the client certificate
     * @param {filename} filename - the filename to postfix on the key
     *
     * @return {string} key
     */
    createBucketKeyFromCert: function( clientCertificate, filename ) {
        return clientCertificate.subject.CN + '/' + filename;
    }
};