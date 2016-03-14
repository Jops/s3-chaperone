/*
* Base class for controllers to be used in an abstract fashion.
*/

// semi private vars, can be rewired
var config = require('config'),
    route = require('../routes/route');

(function() {

    module.exports = require('../../lib/_class').create(
        {
            name: 'Restful Controller',
            endpoints: [],

            constructor: function( pathPrefix )
            {
                this.endpoints.push(
                    route.build( pathPrefix + '/', 'get', this.indexAction.bind(this) )
                );
            },

            addEndpoint: function( ep )
            {
                this.endpoints.push( ep );
            },

            addEndpoints: function( epList )
            {
                this.endpoints = this.endpoints.concat( epList );
            },

            indexAction: function( req, res )
            {
                res.status(200).json(
                    {
                        name: this.name,
                        endpoints: this.endpoints.map(
                            function( ep ) {
                                var o = {};
                                o[ep.method] = ep.path;
                                return o;
                            }
                        )
                    }
                );
            }

        }
    );

}());