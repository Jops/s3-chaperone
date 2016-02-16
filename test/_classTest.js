var chai = require("chai"),
    expect = chai.expect,
    rewire = require('rewire');

describe.only( 'HH Class', function() {

    it('should construct a basic class object',
        function() {
            var basicClass = new (require('./classes/shallow'))( 'constructed instance' );

            expect(basicClass.publicMessage()).to.equal('constructed instance');
            expect(basicClass.protectedMessage()).to.equal('protected var');
            expect(basicClass.privateMessage()).to.equal('private var');
        }
    );

    it.skip('should handle one layer of inheritance',
        function() {

        }
    );

    it.skip('should handle three layers of inheritance',
        function() {

        }
    );

    it.skip('should allow for two branches of inheritance',
        function() {

        }
    );

    it.skip('should allow multiple inheritance',
        function() {

        }
    );

    it('can work with rewire testing module',
        function() {
            var rewiredClass = rewire('./classes/shallow'),
                basicClass = new rewiredClass( 'constructed instance' );

            expect(basicClass.publicMessage()).to.equal('constructed instance');
            expect(basicClass.protectedMessage()).to.equal('protected var');
            expect(basicClass.privateMessage()).to.equal('private var');
            expect(rewiredClass.__get__('aProtectedVar')).to.equal('protected var');
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

            expect(instanceOne.publicMessage()).to.equal('one');
            expect(instanceTwo.publicMessage()).to.equal('two');
            expect(BasicClass.prototype.aPublicVar).to.equal('original');

            BasicClass.prototype.staticVar = 'three';
            expect(instanceOne.staticVar).to.equal('three');
            expect(instanceTwo.staticVar).to.equal('three');

            BasicClass.prototype.staticMethod = function() {
                return this.publicMessage();
            };
            expect(instanceOne.staticMethod()).to.equal('one');
            expect(instanceTwo.staticMethod()).to.equal('two');
        }
    );
});
