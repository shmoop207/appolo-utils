"use strict";
import chai = require('chai');
import Q = require('bluebird');
import {Util} from "../index";

let should = chai.should();

describe("Utils", function () {


    describe("arrays", function () {
        it('should compact array', async () => {

            let arr = Util.arrays.compact([undefined, null, "a"])

            arr.length.should.be.eq(1)
            arr[0].should.be.eq("a");
        });

        it('should compact array', async () => {

            let arr = ["a", "b"];

            Util.arrays.remove(arr, "a");

            arr.length.should.be.eq(1);
            arr[0].should.be.eq("b");
        });

        it('should flat array', async () => {

            let arr = [1, [2, [3, [4]], 5]];

            let result = Util.arrays.flat(arr)

            JSON.stringify(result).should.be.eq("[1,2,[3,[4]],5]");

            result = Util.arrays.flat([1, 2, [3, 4]]);

            JSON.stringify(result).should.be.eq("[1,2,3,4]");

        });

        it('should flat array deep', async () => {

            let arr = [1, 2, [3, 4, [5, 6]]];

            let result = Util.arrays.flatDeep(arr,Infinity);

            JSON.stringify(result).should.be.eq("[1,2,3,4,5,6]");
        });

        it('should partition array', async () => {

            let users = [
                {'user': 'barney', 'age': 36, 'active': false},
                {'user': 'fred', 'age': 40, 'active': true},
                {'user': 'pebbles', 'age': 1, 'active': false}
            ];

            let [arr1,arr2] = Util.arrays.partition(users,(user)=>user.active);

            JSON.stringify(arr1).should.be.eq(`[{"user":"fred","age":40,"active":true}]`);
            JSON.stringify(arr2).should.be.eq(`[{"user":"barney","age":36,"active":false},{"user":"pebbles","age":1,"active":false}]`);
        });

        it('should group by array', async () => {

            let arr = [{"a": 1, b: 2, c: 3}, {"a": 2, b: 2, c: 3}, {"a": 1, b: 2, c: 3}, {"a": 3, b: 2, c: 3}, {
                "a": 3,
                b: 2,
                c: 3
            }, {"a": 5, b: 2, c: 3}, {"a": 2, b: 2, c: 3}];

            let result = Util.arrays.groupBy(arr, "a");

            result.should.be.deep.equals({
                "1": [{"a": 1, "b": 2, "c": 3}, {"a": 1, "b": 2, "c": 3}],
                "2": [{"a": 2, "b": 2, "c": 3}, {"a": 2, "b": 2, "c": 3}],
                "3": [{"a": 3, "b": 2, "c": 3}, {"a": 3, "b": 2, "c": 3}],
                "5": [{"a": 5, "b": 2, "c": 3}
                ]
            });

        });

        it('should group by array by fn', async () => {

            let arr = [{"a": 1, b: 2, c: 3}, {"a": 2, b: 2, c: 3}, {"a": 1, b: 2, c: 3}, {"a": 3, b: 2, c: 3}, {
                "a": 3,
                b: 2,
                c: 3
            }, {"a": 5, b: 2, c: 3}, {"a": 2, b: 2, c: 3}];

            let result = Util.arrays.groupBy(arr, (item) => item.a);

            result.should.be.deep.equals({
                "1": [{"a": 1, "b": 2, "c": 3}, {"a": 1, "b": 2, "c": 3}],
                "2": [{"a": 2, "b": 2, "c": 3}, {"a": 2, "b": 2, "c": 3}],
                "3": [{"a": 3, "b": 2, "c": 3}, {"a": 3, "b": 2, "c": 3}],
                "5": [{"a": 5, "b": 2, "c": 3}
                ]
            });
        });
    });

    describe("time", function () {
        it('should pretty ms', async () => {

            Util.time.milisecPretty(1000 * 5 * 60).should.be.eq("5m");

            Util.time.milisecPretty(1000 * 5 * 60 * 60).should.be.eq("5h");
        });
    });

    describe("Promise", function () {
        it('should run with map', async () => {

            let result = await Util.promises.map([1, 2], item => Promise.resolve(item));


            result.should.be.deep.equals([1, 2]);
        });

        it('should run from callback', async () => {
            function test(callback: (err, data) => void) {
                process.nextTick(() => callback(null, 1))
            }

            let result = await Util.promises.fromCallback<number>((c) => test(c));

            result.should.be.eq(1);

        })
    });

    it('should run with props', async () => {

        let result = await Util.promises.props({a: Promise.resolve(1), b: Promise.resolve(2)});


        result.should.be.deep.equals({
            "a": 1,
            "b": 2
        });
    });


    describe("Classes", function () {
        it('should isClass', async () => {

            Util.classes.isClass(class A {
            }).should.be.eq(true);
            Util.classes.isClass(function B() {
            }).should.be.eq(false);

        });

        it('should className', async () => {

            Util.classes.className(class A {
            }).should.be.eq("a");

        });

        it('should functionArgsNames', async () => {

            Util.classes.functionArgsNames(class C {
                constructor(a, b, c) {
                }
            }).should.be.deep.equals(['a', 'b', 'c']);

        });
    });

    describe("strings", function () {
        it('should stringifyObjectValues', async () => {
            Util.strings.stringifyObjectValues({a: 1, b: true, c: "a"}).should.be.eq("1truea");

        });

        it('should removeNewLine', async () => {
            Util.strings.removeNewLine("aaa\nbbb\r").should.be.eq("aaabbb");

        });

        it('should replaceFormat', async () => {
            Util.strings.replaceFormat("aa${b}", {b: 1}).should.be.eq("aa1");

        });
    });

    describe("numbers", function () {
        it('should toFixed', async () => {
            Util.numbers.toFixed(1.22344566778, 2).should.be.eq(1.22);
        });

        it('should random', async () => {
            let num = Util.numbers.random(1.22344566778, 4)

            Number.isInteger(num).should.be.not.ok;

            num = Util.numbers.random(1, 4);

            Number.isInteger(num).should.be.ok;

            num.should.be.within(1, 4);
        });
    });

    describe("Objects", function () {
        it('should isPlain', async () => {
            Util.objects.isPlain({a: 1, b: true, c: "a"}).should.be.eq(true);

        });

        it('should not isPlain', async () => {
            Util.objects.isPlain([{a: 1, b: true, c: "a"}] as any).should.be.eq(false);

        });

        it('should isEmpty', async () => {
            Util.objects.isEmpty({}).should.be.eq(true);

        });

        it('should not isEmpty', async () => {
            Util.objects.isEmpty({a: 1}).should.be.eq(false);

        });

        it('should compact', async () => {
            Util.objects.compact({a: 1, b: undefined, c: null}).should.be.deep.equals({a: 1});

        });

        it('should try parse json', async () => {
            should.not.exist(Util.objects.tryParseJSON("{a:1"));
            Util.objects.tryParseJSON('{"a":1}').should.be.deep.equals({a: 1});

        });

        it('should clone deep', async () => {
            let obj = {a: 1, b: {c: 2}, d: [1, 2]};
            let cloned = Util.objects.cloneDeep(obj);

            (obj.a === cloned.a).should.be.ok;
            (obj.b === cloned.b).should.be.not.ok;
            (obj.b.c === cloned.b.c).should.be.ok;
            (obj.d[1] === cloned.d[1]).should.be.ok;
            (obj.d === cloned.d).should.be.not.ok;

        });

        it('should clone fast', async () => {
            let obj = {a: 1, b: {c: 2}, d: [1, 2]};
            let cloned = Util.objects.cloneFast(obj);

            (obj.a === cloned.a).should.be.ok;
            (obj.b === cloned.b).should.be.not.ok;
            (obj.b.c === cloned.b.c).should.be.ok;
            (obj.d[1] === cloned.d[1]).should.be.ok;
            (obj.d === cloned.d).should.be.not.ok;

        });

    });

    describe("Enums", function () {
        it('should get enum names and values', async () => {

            enum Test {
                A = "aaa",
                B = "bbb",
                C = 0,
                D
            }

            Util.enums.enumValues(Test).should.be.deep.equals([0, 1, 'aaa', 'bbb']);
            Util.enums.enumNames(Test).should.be.deep.equals(['A', 'B', 'C', 'D']);

        });
    });


});
