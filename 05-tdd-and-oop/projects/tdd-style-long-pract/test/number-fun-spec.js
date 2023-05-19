const chai = require("chai");
const expect = chai.expect;
const { returnsThree, reciprocal } = require("/Users/danielabazan/Documents/App-Academy/tdd-style-long-practice/problems/number-fun.js");

describe("returnsThree()", () => {
    it("should return 3", () => {
        expect(returnsThree()).to.equal(3);
    });
});

describe("reciprocal(number)", () => {
    it("should return the reciprocal of the number", () => {
        const input = 25;
        expect(reciprocal(input)).to.equal(1 / 25);
    });
    it("should throw a type error if passed invalid input", () => {
        const neg = -22;
        const object = { i: "am", an: "object" };
        const string = "test";
        const tooBig = 999999999;
        expect(() => reciprocal(neg)).to.throw(TypeError);
        expect(() => reciprocal(object)).to.throw(TypeError);
        expect(() => reciprocal(string)).to.throw(TypeError);
        expect(() => reciprocal(tooBig)).to.throw(TypeError);
    });
});