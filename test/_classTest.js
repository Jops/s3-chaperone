var chai = require("chai"),
    expect = chai.expect,
    rewire = require('rewire');

describe( 'HH Class', function() {

    describe( 'shallow class', function() {

        it('should construct a basic class object',
            function() {
                var basicClass = new (require('./classes/shallow'))( 'constructed instance' );

                expect( basicClass.publicMessage() ).to.equal( 'constructed instance' );
                expect( basicClass.semiPrivateMessage() ).to.equal( 'semi private var' );
                expect( basicClass.privateMessage() ).to.equal( 'private var' );
            }
        );

        it('can work with rewire testing module',
            function() {
                var rewiredClass = rewire('./classes/shallow'),
                    basicClass = new rewiredClass( 'constructed instance' );

                expect( basicClass.publicMessage() ).to.equal( 'constructed instance' );
                expect( basicClass.semiPrivateMessage() ).to.equal( 'semi private var' );
                expect( basicClass.privateMessage() ).to.equal( 'private var' );
                expect( rewiredClass.__get__('aSemiPrivateVar') ).to.equal( 'semi private var' );
                expect(
                    function() {
                        rewiredClass.__get__('aPrivateVar');
                    }
                 ).to.throw( ReferenceError, 'aPrivateVar is not defined' );
            }
        );

        it('utilises static property references',
            function() {
                var BasicClass = require('./classes/shallow'),
                    instanceOne = new BasicClass( 'one' ),
                    instanceTwo = new BasicClass( 'two' );

                expect( instanceOne.publicMessage() ).to.equal( 'one' );
                expect( instanceTwo.publicMessage() ).to.equal( 'two' );
                expect( BasicClass.prototype.aPublicVar ).to.equal( 'original' );

                BasicClass.prototype.staticVar = 'three';
                expect( instanceOne.staticVar ).to.equal( 'three' );
                expect( instanceTwo.staticVar ).to.equal( 'three' );

                BasicClass.prototype.staticMethod = function() {
                    return this.publicMessage();
                };
                expect( instanceOne.staticMethod() ).to.equal( 'one' );
                expect( instanceTwo.staticMethod() ).to.equal( 'two' );
            }
        );

    });

    describe( 'parent and child inheritance', function() {

        var childClass;

        before( function() {
            childClass = new (require('./classes/one-layer/child'))( 'child constructed instance' );
        });

        it('should instantiate class with a parent',
            function() {
                expect( childClass ).to.be.ok;
            }
        );

        it('inherits parent public variable',
            function() {
                expect( childClass.aPublicVar ).to.equal( 'child constructed instance' );
            }
        );

        it('inherits parent methods with access to parent private variables',
            function() {
                expect( childClass.privateMessage() ).to.equal( 'parent private var' );
            }
        );

        it('inherits parent methods with overwritten public variables',
            function() {
                var messages = childClass.inheritedMessage();
                expect( messages ).to.include( 'parent public var' );
                expect( messages ).to.include( 'parent public var overridden in child' );
            }
        );

        it('does not inherit parent private variable',
            function() {
                expect( childClass.aPrivateVar ).to.not.be.ok;
            }
        );

    });

    describe( 'three layers i.e. base class, parent and child', function() {

        var childClass;

        before( function() {
            childClass = new (require('./classes/three-layers/child'))( 'child constructed instance' );
        });

        it('should handle three layers of inheritance',
            function() {
                expect( childClass ).to.be.ok;
            }
        );

        it('inherits base method with overwritten public variables in parent then child',
            function() {
                var messages = childClass.overwrittenBaseMessage();
                expect( messages ).to.include( 'base public var' );
                expect( messages ).to.include( 'base public var overridden in child' );
            }
        );

        it('inherits base method with overwritten public variables',
            function() {
                var messages = childClass.inheritedMessage();
                expect( messages ).to.include( 'base public var' );
                expect( messages ).to.include( 'base public var overridden in child' );
            }
        );

        it('inherits parent methods with access to parent private variables',
            function() {
                expect( childClass.privateParentMessage() ).to.equal( 'parent private var' );
            }
        );

        it('inherits base methods with access to base private variables',
            function() {
                expect( childClass.privateBaseMessage() ).to.equal( 'base private var' );
            }
        );

    });

    describe( 'branches of inheritance i.e. base class, parent, child A & child B', function() {

        var childClassA, childClassB;

        before( function() {
            childClassA = new (require('./classes/branched/childA'))( 'child A constructed instance' );
            childClassB = new (require('./classes/branched/childB'))( 'child B constructed instance' );
        });

        it('should allow for two branches of inheritance',
            function() {
                expect( childClassA ).to.be.ok;
                expect( childClassB ).to.be.ok;
            }
        );

        it('should have seperate values held by each child',
            function() {
                expect( childClassA.aPublicVar ).to.equal( 'child A constructed instance' );
                expect( childClassB.aPublicVar ).to.equal( 'child B constructed instance' );
            }
        );

        it('should have same parent values for both children',
            function() {
                expect( childClassA.aBaseVar ).to.equal( 'base public var' );
                expect( childClassB.aBaseVar ).to.equal( 'base public var' );
            }
        );

        it('inherits base method with overwritten public variables in parent then child',
            function() {
                var messages = childClassA.overwrittenBaseMessage();
                expect( messages ).to.include( 'base public var' );
                expect( messages ).to.include( 'base public var overridden in child' );
                messages = childClassB.overwrittenBaseMessage();
                expect( messages ).to.include( 'base public var' );
                expect( messages ).to.include( 'base public var overridden in child' );
            }
        );

    });

    describe( 'multiple inheritance', function() {

        var childClass;

        before( function() {
            childClass = new (require('./classes/multiple/child'))( 'child constructed instance' );
        });

        it('should allow multiple inheritance',
            function() {
                expect( childClass ).to.be.ok;
            }
        );

        it('should inherit unique methods from different base classes',
            function() {
                expect( childClass.BaseAMessage() ).to.equal( 'base A private' );
                expect( childClass.BaseBMessage() ).to.equal( 'base B private' );
            }
        );

    });

});
