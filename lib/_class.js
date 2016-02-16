/**
 * <copyright>
 * Copyright (c) 2014 All Rights Reserved http: *hawk-head.com
 *
 * THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY
 * KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
 * PARTICULAR PURPOSE.
 * </copyright>
 * <author>Jonathan HW Halkett</author>
 * <email>Jops.Hawkhead@gmail.com</email>
 * <date>15-02-2016</date>
 * <summary>Node Common OOP tool for creating & extending classes.</summary>
 */

(function(){

    module.exports = {
        /**
         * @desc creates a common class object
         * @param definition - object with optional constructor key
         * @returns new class definition
         */
        create: function( definition )
        {
            var c = definition.constructor;
            if( c.toString() == {}.constructor.toString() )
                c = function(){};
            c.prototype = definition;
            definition = c;
            return this.extend.apply( this, arguments );
        },

        /**
         * @desc simple inheritance
         * @param arguments list - first must be benificiary
         * @returns beneficiary
         */
        extend: function()
        {
            var parents = [].slice.call( arguments );
            var child = parents.shift();
            var parent = parents.shift();
            var p = {};
            p.prototype = {};
            var property;
            while( parent )
            {
                for( property in parent.prototype )
                    p.prototype[property] = parent.prototype[property];
                parent = parents.shift();
            }
            for( property in child.prototype )
                p.prototype[property] = child.prototype[property];
            child.prototype             = p.prototype;
            return child;
        }
    };

}());