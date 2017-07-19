var expect = require('chai').expect;
var should = require('chai').should();
var utils = require('../dist/utils');

// objects

describe("#toPlainObject", function() {

    function Foo() {
        this.b = 2;
    }
    
    Foo.prototype.c = 3;
    
    var newFoo = new Foo;

    var data = { a: 1 };

    var test1 = Object.assign(data, newFoo);
    test1.should.deep.equal({ a: 1, b: 2 });

    data = { a: 1 };

    var test2 = Object.assign(data, utils.Objects.toPlainObject(newFoo));
    expect(test2.should.deep.equal({ a: 1, b: 2, c: 3 }));
});