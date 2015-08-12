//==================== NODE MODULES ====================//

var chai = require('chai');
var expect = chai.expect;

var flagger = require('../index.js');

//==================== SETUP ====================//

var argOne = process.argv[0];
var argTwo = process.argv[1];

//==================== TESTS ====================//

describe('testing with various configurations of command line arguments', function() {

    it('should be an empty object when no argument are given', function() {
        process.argv = [argOne, argTwo];
        var obj = flagger();
        expect(obj).to.be.empty;
    });

    it('should store arguments without a flag in flagger._', function() {
        process.argv = [
            argOne,
            argTwo,
            'one',
            'two',
            'three',
            '--print',
            '--check',
            'something'
        ];
        var obj = flagger();
        expect(obj._).to.have.length(3);
    });

    it('if all arguments have a flag then flagger._ should be undefined', function() {
        process.argv = [
            argOne,
            argTwo,
            '--print',
            '--check',
            'something'
        ];
        var obj = flagger();
        expect(obj._).to.be.undefined;
    });

    it('the object should have fields for each flag', function() {
        process.argv = [
            argOne,
            argTwo,
            '--print',
            '--check',
            'something',
            '--allow'
        ];
        var obj = flagger();
        expect(obj.print).to.exist;
        expect(obj.check).to.exist;
        expect(obj.allow).to.exist;
    });

    it('the object should allow flags to have - or --', function() {
        process.argv = [
            argOne,
            argTwo,
            '--print',
            '-c',
            'something',
            '--allow'
        ];
        var obj = flagger();
        expect(obj.print).to.exist;
        expect(obj.c).to.exist;
        expect(obj.allow).to.exist;
    });

    it('should have the object configured correctly', function() {
        process.argv = [
            argOne,
            argTwo,
            '--print',
            '-c',
            'something',
            'else',
            '--allow',
            'it',
            '--you',
            '--will'
        ];
        var obj = flagger();
        expect(obj.print).to.have.length(0);
        expect(obj.you).to.have.length(0);
        expect(obj.will).to.have.length(0);
        expect(obj.c).to.have.length(2);
        expect(obj.c[0]).to.equal('something');
        expect(obj.c[1]).to.equal('else');
        expect(obj.allow).to.have.length(1);
        expect(obj.allow[0]).to.equal('it');
    });
});
