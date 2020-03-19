"use strict";
import chai = require('chai');
import Q = require('bluebird');
import {Promises, Util} from "../index";

let should = chai.should();

describe("Utils", function () {


    describe("arrays", function () {
        it('should compact array', async () => {

            let arr = Util.arrays.compact([undefined, null, "a"])

            arr.length.should.be.eq(1)
            arr[0].should.be.eq("a");
        });

        it('should key array', async () => {

            let result = Util.arrays.keyBy(["a", "b", "c"]);

            result.should.be.deep.equal({a: 'a', b: 'b', c: 'c'});

            let result2 = Util.arrays.keyBy([{"a": 1}, {"a": 2}, {"a": 3}], (item => item.a.toString()));

            result2.should.be.deep.equal({1: {"a": 1}, 2: {"a": 2}, 3: {"a": 3}});
        });

        it('should remove from array', async () => {
            Util.arrays.sum([1, 2, 5]).should.be.eq(8);
        });

        it('should remove from array', async () => {
            Util.arrays.sumBy([{a: 1}, {a: 2}, {a: 5}], item => item.a).should.be.eq(8);
        });

        it('should remove from array', async () => {

            let arr = ["a", "b"];

            Util.arrays.remove(arr, "a");

            arr.length.should.be.eq(1);
            arr[0].should.be.eq("b");
        });

        it('should sortBy array', async () => {

            let arr = [{a: 2}, {a: 1}, {a: 3}, {a: 1.5}];

            let arr2 = Util.arrays.sortBy(arr, (item) => item.a);

            arr.should.be.deep.equal([{a: 2}, {a: 1}, {a: 3}, {a: 1.5}]);
            arr2.should.be.deep.equal([{a: 1}, {a: 1.5}, {a: 2}, {a: 3}]);
        });

        it('should sort array', async () => {

            let arr = [2, 1, 3, 1.5];

            let arr2 = Util.arrays.sort(arr);

            arr.should.be.deep.equal([2, 1, 3, 1.5]);
            arr2.should.be.deep.equal([1, 1.5, 2, 3]);
        });

        it('should uniqby  array', async () => {

            let arr = [{a: 2}, {a: 1}, {a: 2}];

            arr = Util.arrays.uniqBy(arr, (item) => item.a);

            arr.length.should.be.eq(2);
            arr[0].a.should.be.eq(2);
        });

        it('should uniq  array', async () => {

            let arr = [1, 2, 4, 2, 4];

            arr = Util.arrays.uniq(arr);

            arr.should.be.deep.equal([1, 2, 4]);
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

            let result = Util.arrays.flatDeep(arr, Infinity);

            JSON.stringify(result).should.be.eq("[1,2,3,4,5,6]");
        });

        it('should partition array', async () => {

            let users = [
                {'user': 'barney', 'age': 36, 'active': false},
                {'user': 'fred', 'age': 40, 'active': true},
                {'user': 'pebbles', 'age': 1, 'active': false}
            ];

            let [arr1, arr2] = Util.arrays.partition(users, (user) => user.active);

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

        });

        it('should check if promise', async () => {

            Util.promises.isPromise({then: true}).should.be.not.ok;
            Util.promises.isPromise(null).should.be.not.ok;
            Util.promises.isPromise({}).should.be.not.ok;
            Util.promises.isPromise(Promise.resolve()).should.be.ok;
            Util.promises.isPromise(new Promise(resolve => null)).should.be.ok;
        });

        it('should run with props', async () => {

            let result = await Util.promises.props({a: Promise.resolve(1), b: Promise.resolve(2)});


            result.should.be.deep.equals({
                "a": 1,
                "b": 2
            });

        });

        it('should run with allSettled', async () => {

            let result = await Util.promises.allSettled([Promise.resolve(1), Promise.reject(2)]);

            result.should.be.deep.equal([
                {status: "fulfilled", value: 1},
                {"reason": 2, "status": "rejected"}
            ]);
        });

        it('should run with some', async () => {

            let result = await Util.promises.some([
                Promises.delay(15).then(() => 3),
                Promises.delay(10).then(() => 2),
                Promises.delay(5).then(() => 1)]);

            result.should.be.deep.equal([
                {status: "fulfilled", value: 1}
            ]);

            let result2 = await Util.promises.some([
                Promises.delay(15).then(() => 3),
                Promises.delay(10).then(() => Promise.reject(2)),
                Promises.delay(5).then(() => 1)], {counter: 2});

            result2.should.be.deep.equal([
                {status: "fulfilled", value: 1},
                {status: "rejected", reason: 2}
            ]);
        });

        it('should run with some resolved', async () => {

            let result = await Util.promises.someResolved([
                Promises.delay(15).then(() => 3),
                Promises.delay(10).then(() => 2),
                Promises.delay(5).then(() => 1)]);

            result.should.be.deep.equal([
                {status: "fulfilled", value: 1}
            ]);

            let result2 = await Util.promises.someResolved([
                Promises.delay(15).then(() => 3),
                Promises.delay(10).then(() => Promise.reject(2)),
                Promises.delay(5).then(() => 1)], {counter: 2});

            result2.should.be.deep.equal([
                {status: "fulfilled", value: 1},
                {status: "fulfilled", value: 3}
            ]);

            let result3 = await Util.promises.someResolved([
                Promises.delay(15).then(() => 3),
                Promises.delay(10).then(() => Promise.reject(2)),
                Promises.delay(5).then(() => Promise.reject(1))], {counter: 2});

            result3.should.be.deep.equal([
                {status: "fulfilled", value: 3}
            ]);


            let result4 = await Util.promises.someResolved([
                Promises.delay(15).then(() => Promise.reject(3)),
                Promises.delay(10).then(() => Promise.reject(2)),
                Promises.delay(5).then(() => Promise.reject(1))], {counter: 2});

            result4.should.be.deep.equal([]);

            let result5 = await Util.promises.someResolved([
                Promises.delay(15).then(() => Promise.resolve({name: true})),
                Promises.delay(10).then(() => Promise.resolve({name: false})),
                Promises.delay(5).then(() => Promise.resolve({name: true}))], {counter: 3, fn: (value) => value.name});

            result5.should.be.deep.equal([
                {status: "fulfilled", value: {"name": true}},
                {status: "fulfilled", value: {"name": true}}
            ]);
        });

        it('should run with some rejected', async () => {

            let result = await Util.promises.someRejected([
                Promises.delay(15).then(() => Promise.reject(3)),
                Promises.delay(10).then(() => Promise.reject(2)),
                Promises.delay(5).then(() => Promise.reject(1))]);

            result.should.be.deep.equal([
                {status: "rejected", reason: 1}
            ]);

            let result2 = await Util.promises.someRejected([
                Promises.delay(15).then(() => Promise.reject(3)),
                Promises.delay(10).then(() => 2),
                Promises.delay(5).then(() => Promise.reject(1))], {counter: 2});

            result2.should.be.deep.equal([
                {status: "rejected", reason: 1},
                {status: "rejected", reason: 3}
            ]);

            let result3 = await Util.promises.someRejected([
                Promises.delay(15).then(() => Promise.reject(3)),
                Promises.delay(10).then(() => 2),
                Promises.delay(5).then(() => 1)], {counter: 2});

            result3.should.be.deep.equal([
                {status: "rejected", reason: 3}
            ]);


            let result4 = await Util.promises.someRejected([
                Promises.delay(15).then(() => 3),
                Promises.delay(10).then(() => 2),
                Promises.delay(5).then(() => 1)], {counter: 2});

            result4.should.be.deep.equal([]);

            let result5 = await Util.promises.someRejected([
                Promises.delay(15).then(() => Promise.resolve({name: true})),
                Promises.delay(10).then(() => Promise.resolve({name: false})),
                Promises.delay(5).then(() => Promise.resolve({name: true}))], {counter: 3, fn: (value) => value.name});

            result5.should.be.deep.equal([
                {status: "rejected", reason: {"name": false}}
            ]);
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

        // it('should get class methods inherit', async () => {
        //
        //     class A {
        //         a() {
        //
        //         }
        //
        //         b() {
        //
        //         }
        //     }
        //
        //     class B extends A {
        //         c() {
        //
        //         }
        //
        //         get d(){
        //             return ""
        //         }
        //     }
        //
        //
        //
        //     Util.classes.getAllClassMethods(new B()).should.be.deep.equals(['a', 'b', 'c']);
        //
        // });
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
            Util.objects.isPlain(Object.create({})).should.be.eq(true);

            Util.objects.isPlain(Object.create(Object.prototype)).should.be.eq(true);

            Util.objects.isPlain({foo: 'bar'}).should.be.eq(true);

            Util.objects.isPlain({}).should.be.eq(true);

        });

        it('should object pick', async () => {
            Util.objects.pick({a: 1, b: true, c: "a"}, "a").should.be.deep.equal({a: 1});
        });

        it('should object omit', async () => {
            Util.objects.omit({a: 1, b: true, c: "a"}, "a").should.be.deep.equal({b: true, c: 'a'});
        });

        it('should not isPlain', async () => {
            Util.objects.isPlain([{a: 1, b: true, c: "a"}] as any).should.be.eq(false);
            Util.objects.isPlain(1).should.be.eq(false);

            Util.objects.isPlain(['foo', 'bar']).should.be.eq(false);

            Util.objects.isPlain([]).should.be.eq(false);

            Util.objects.isPlain(new class A {
            }).should.be.eq(false);

            Util.objects.isPlain(null).should.be.eq(false);
            Util.objects.isPlain(function () {
            }).should.be.eq(false);
            Util.objects.isPlain(new function () {
            }).should.be.eq(false);


            Util.objects.isPlain(Object.create(null)).should.be.eq(false);

        });

        it('should isEmpty', async () => {
            Util.objects.isEmpty({}).should.be.eq(true);

        });

        it('should extend defaults', async () => {
            Util.objects.defaults<any>({}, {a: 1}, {b: 1}).should.deep.equals({a: 1, b: 1});
            Util.objects.defaults<any>({}, {a: 1}, {a: 2}).should.deep.equals({a: 1});
            Util.objects.defaults<any>({a: 1}, {a: 2, b: 1}).should.deep.equals({a: 1, b: 1});
            Util.objects.defaults<any>({a: 1}, {a: 2, b: 1}, {b: 2, c: 3}).should.deep.equals({a: 1, b: 1, c: 3});
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
            let klass = new class A {
            };
            let obj = {a: 1, b: {c: 2}, d: [1, 2], f: klass};
            let cloned = Util.objects.cloneDeep(obj);

            (obj.a === cloned.a).should.be.ok;
            (obj.b === cloned.b).should.be.not.ok;
            (obj.b.c === cloned.b.c).should.be.ok;
            (obj.d[1] === cloned.d[1]).should.be.ok;
            (obj.d === cloned.d).should.be.not.ok;
            (obj.f === cloned.f).should.be.ok;

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

    describe("Files", function () {
        it('should get flies', async () => {

            let files = [];

            for (let file of Util.files.walk(__dirname, "")) {
                files.push(file);
            }

            files.length.should.be.eq(1);
            files[0].should.include("unit.js")
        });
    });


});
