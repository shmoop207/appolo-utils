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
        it('should group by array', async () => {
            let arr = [{ "a": 1, b: 2, c: 3 }, { "a": 2, b: 2, c: 3 }, { "a": 1, b: 2, c: 3 }, { "a": 3, b: 2, c: 3 }, {
                    "a": 3,
                    b: 2,
                    c: 3
                }, { "a": 5, b: 2, c: 3 }, { "a": 2, b: 2, c: 3 }];
            let result = index_1.Util.arrays.groupBy(arr, "a");
            result.should.be.deep.equals({
                "1": [{ "a": 1, "b": 2, "c": 3 }, { "a": 1, "b": 2, "c": 3 }],
                "2": [{ "a": 2, "b": 2, "c": 3 }, { "a": 2, "b": 2, "c": 3 }],
                "3": [{ "a": 3, "b": 2, "c": 3 }, { "a": 3, "b": 2, "c": 3 }],
                "5": [{ "a": 5, "b": 2, "c": 3 }
                ]
            });
        });
        it('should group by array by fn', async () => {
            let arr = [{ "a": 1, b: 2, c: 3 }, { "a": 2, b: 2, c: 3 }, { "a": 1, b: 2, c: 3 }, { "a": 3, b: 2, c: 3 }, {
                    "a": 3,
                    b: 2,
                    c: 3
                }, { "a": 5, b: 2, c: 3 }, { "a": 2, b: 2, c: 3 }];
            let result = index_1.Util.arrays.groupBy(arr, (item) => item.a);
            result.should.be.deep.equals({
                "1": [{ "a": 1, "b": 2, "c": 3 }, { "a": 1, "b": 2, "c": 3 }],
                "2": [{ "a": 2, "b": 2, "c": 3 }, { "a": 2, "b": 2, "c": 3 }],
                "3": [{ "a": 3, "b": 2, "c": 3 }, { "a": 3, "b": 2, "c": 3 }],
                "5": [{ "a": 5, "b": 2, "c": 3 }
                ]
            });
        });
    });
    describe("time", function () {
        it('should pretty ms', async () => {
            index_1.Util.time.milisecPretty(1000 * 5 * 60).should.be.eq("5m");
            index_1.Util.time.milisecPretty(1000 * 5 * 60 * 60).should.be.eq("5h");
        });
    });
    describe("Promise", function () {
        it('should run with map', async () => {
            let result = await index_1.Util.promises.map([1, 2], item => Promise.resolve(item));
            result.should.be.deep.equals([1, 2]);
        });
    });
    describe("Classes", function () {
        it('should isClass', async () => {
            index_1.Util.classes.isClass(class A {
            }).should.be.eq(true);
            index_1.Util.classes.isClass(function B() {
            }).should.be.eq(false);
        });
        it('should className', async () => {
            index_1.Util.classes.className(class A {
            }).should.be.eq("a");
        });
        it('should functionArgsNames', async () => {
            index_1.Util.classes.functionArgsNames(class C {
                constructor(a, b, c) {
                }
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
    describe("Enums", function () {
        it('should get enum names and values', async () => {
            let Test;
            (function (Test) {
                Test["A"] = "aaa";
                Test["B"] = "bbb";
                Test[Test["C"] = 0] = "C";
                Test[Test["D"] = 1] = "D";
            })(Test || (Test = {}));
            index_1.Util.enums.enumValues(Test).should.be.deep.equals([0, 1, 'aaa', 'bbb']);
            index_1.Util.enums.enumNames(Test)[0].should.be.deep.equals(['A', 'B', 'C', 'D']);
        });
    });
});
//# sourceMappingURL=unit.js.map