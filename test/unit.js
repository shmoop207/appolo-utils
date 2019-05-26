"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const index_1 = require("../index");
let should = chai.should();
describe("Utils", function () {
    describe("arrays", function () {
        it('should compact array', async () => {
            let arr = index_1.Util.arrays.compact([undefined, null, "a"]);
            arr.length.should.be.eq(1);
            arr[0].should.be.eq("a");
        });
        it('should compact array', async () => {
            let arr = ["a", "b"];
            index_1.Util.arrays.remove(arr, "a");
            arr.length.should.be.eq(1);
            arr[0].should.be.eq("b");
        });
    });
    describe("time", function () {
        it('should pretty ms', async () => {
            index_1.Util.time.milisecPretty(1000 * 5 * 60).should.be.eq("5m");
            index_1.Util.time.milisecPretty(1000 * 5 * 60 * 60).should.be.eq("5h");
        });
    });
    describe("Classes", function () {
        it('should isClass', async () => {
            index_1.Util.classes.isClass(class A {
            }).should.be.eq(true);
            index_1.Util.classes.isClass(function B() { }).should.be.eq(false);
        });
        it('should className', async () => {
            index_1.Util.classes.className(class A {
            }).should.be.eq("a");
        });
        it('should functionArgsNames', async () => {
            index_1.Util.classes.functionArgsNames(class C {
                constructor(a, b, c) { }
            }).should.be.deep.equals(['a', 'b', 'c']);
        });
    });
    describe("strings", function () {
        it('should stringifyObjectValues', async () => {
            index_1.Util.strings.stringifyObjectValues({ a: 1, b: true, c: "a" }).should.be.eq("1truea");
        });
        it('should removeNewLine', async () => {
            index_1.Util.strings.removeNewLine("aaa\nbbb\r").should.be.eq("aaabbb");
        });
        it('should replaceFormat', async () => {
            index_1.Util.strings.replaceFormat("aa${b}", { b: 1 }).should.be.eq("aa1");
        });
    });
    describe("numbers", function () {
        it('should toFixed', async () => {
            index_1.Util.numbers.toFixed(1.22344566778, 2).should.be.eq(1.22);
        });
    });
    describe("Objects", function () {
        it('should isPlain', async () => {
            index_1.Util.objects.isPlain({ a: 1, b: true, c: "a" }).should.be.eq(true);
        });
        it('should not isPlain', async () => {
            index_1.Util.objects.isPlain([{ a: 1, b: true, c: "a" }]).should.be.eq(false);
        });
        it('should isEmpty', async () => {
            index_1.Util.objects.isEmpty({}).should.be.eq(true);
        });
        it('should not isEmpty', async () => {
            index_1.Util.objects.isEmpty({ a: 1 }).should.be.eq(false);
        });
        it('should compact', async () => {
            index_1.Util.objects.compact({ a: 1, b: undefined, c: null }).should.be.deep.equals({ a: 1 });
        });
        it('should try parse json', async () => {
            should.not.exist(index_1.Util.objects.tryParseJSON("{a:1"));
            index_1.Util.objects.tryParseJSON('{"a":1}').should.be.deep.equals({ a: 1 });
        });
    });
});
//# sourceMappingURL=unit.js.map