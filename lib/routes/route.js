module.exports = {
    build: function( path, method, cb ) {
        return {
            path: path,
            method: method,
            callback: cb
        };
    }
};