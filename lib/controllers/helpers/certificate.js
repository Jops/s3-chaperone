module.exports = {
    /**
     * modular method which returns the clients certificate
     *
     * @param {Object} req - Request object containing client cert
     *
     * @return {string} certificate info
     */
    obtainClientCertFromRequest: function( req ) {
        return req.socket.getPeerCertificate();
    }
};