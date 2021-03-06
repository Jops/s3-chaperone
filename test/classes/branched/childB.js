/*
* Copyright (c) 2012 Jonathan HW Halkett http://www.hawk-head.com
*
* This software is provided 'as-is', without any express or implied
* warranty.  In no event will the authors be held liable for any damages
* arising from the use of this software.
* Permission is granted to anyone to use this software for any purpose,
* including commercial applications, and to alter it and redistribute it
* freely, subject to the following restrictions:
* 1. The origin of this software must not be misrepresented; you must not
* claim that you wrote the original software. If you use this software
* in a product, an acknowledgment in the product documentation would be
* appreciated but is not required.
* 2. Altered source versions must be plainly marked, and must not be
* misrepresented the original software.
* 3. This notice may not be removed or altered from any source distribution.
*/

(function() {

    var Parent = require('./parent');

    module.exports = require('../../../lib/_class').create(
        {
            aBaseVarToBeOverridenByParent: 'base public var overridden in child',
            aBaseVarToBeOverriden: 'base public var overridden in child',
            aParentVarToBeOverriden: 'parent public var overridden in child',

            constructor: function( value )
            {
                Parent.apply( this, arguments );
            }

        },
        Parent
    );

}());
