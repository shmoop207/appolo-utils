"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const index_1 = require("../index");
const dateJs_1 = require("../lib/dateJs");
let should = chai.should();
describe("Utils", function () {
    describe("guid", function () {
        it("should generate nanoid", async () => {
            let guid = await index_1.Util.guid.nanoid(21);
            guid.length.should.be.eq(21);
        });
        it("should generate uid", async () => {
            let guid = await index_1.Util.guid.uid(21);
            guid.length.should.be.eq(21);
        });
    });
    describe("arrays", function () {
        it('should compact array', async () => {
            let arr = index_1.Util.arrays.compact([undefined, null, "a"]);
            arr.length.should.be.eq(1);
            arr[0].should.be.eq("a");
        });
        it('should check array range', async () => {
            index_1.Util.arrays.range(4).should.deep.equal([0, 1, 2, 3]);
            index_1.Util.arrays.range(-4).should.deep.equal([0, -1, -2, -3]);
            index_1.Util.arrays.range(1, 5).should.deep.equal([1, 2, 3, 4]);
            index_1.Util.arrays.range(0, 20, 5).should.deep.equal([0, 5, 10, 15]);
            index_1.Util.arrays.range(0, -4, -1).should.deep.equal([0, -1, -2, -3]);
            index_1.Util.arrays.range(1, 4, 0).should.deep.equal([1, 1, 1]);
            index_1.Util.arrays.range(0).should.deep.equal([]);
        });
        it('should check areArraysEqual', async () => {
            index_1.Util.arrays.areArraysEqual([1, 2, 3], [1, 2, 3]).should.be.ok;
            index_1.Util.arrays.areArraysEqual([2, 1, 3, 5], [1, 2, 3, 5]).should.be.ok;
            index_1.Util.arrays.areArraysEqual([2, 1, 3, 5], [1, 2, 4, 5]).should.be.not.ok;
        });
        it('should map array', async () => {
            index_1.Util.arrays.map([{ a: 1 }, { a: 2 }], item => item.a).should.deep.equal([1, 2]);
            index_1.Util.arrays.map({ a: 1, b: 2 }, (item, key) => item + key).should.deep.equal(['1a', '2b']);
            index_1.Util.arrays.map(undefined, (item, key) => item + key).should.deep.equal([]);
        });
        it('should chain array', async () => {
            let result = (0, index_1._)(["aa", "cc"]).difference(["aa", "bb"])
                .filter(item => item == "cc")
                .uniq()
                .value();
            result.should.be.deep.equal(["cc"]);
        });
        it('should chain concat array', async () => {
            let result = (0, index_1._)([{ name: "aaa" }, { name: "bbb" }])
                .map(item => item.name)
                .concat(["ccc"])
                .uniq()
                .value();
            result.should.be.deep.equal(["aaa", "bbb", "ccc"]);
        });
        it('should chain object', async () => {
            let result = (0, index_1._)({ a: 1, b: 2 }).pick("a")
                .keys()
                .filter(item => item == "a")
                .uniq()
                .value();
            result.should.be.deep.equal(["a"]);
        });
        it('should forEach array', async () => {
            let result = 0;
            index_1.Util.arrays.forEach([{ a: 1 }, { a: 2 }], item => result += item.a);
            result.should.be.eq(3);
            let result2 = "";
            index_1.Util.arrays.forEach({ a: 1, b: 2 }, (item, key) => result2 += item + key);
            result2.should.be.eq("1a2b");
            result = 0;
            index_1.Util.arrays.forEach(undefined, (item) => result += item.a);
            result.should.be.eq(0);
        });
        it('should key array', async () => {
            let result = index_1.Util.arrays.keyBy(["a", "b", "c"]);
            result.should.be.deep.equal({ a: 'a', b: 'b', c: 'c' });
            let result2 = index_1.Util.arrays.keyBy([{ "a": 1 }, { "a": 2 }, { "a": 3 }], (item => item.a.toString()));
            result2.should.be.deep.equal({ 1: { "a": 1 }, 2: { "a": 2 }, 3: { "a": 3 } });
        });
        it('should remove from array', async () => {
            index_1.Util.arrays.sum([1, 2, 5]).should.be.eq(8);
        });
        it('should remove from array', async () => {
            index_1.Util.arrays.sumBy([{ a: 1 }, { a: 2 }, { a: 5 }], item => item.a).should.be.eq(8);
        });
        it('should remove from array', async () => {
            let arr = ["a", "b"];
            index_1.Util.arrays.remove(arr, "a");
            arr.length.should.be.eq(1);
            arr[0].should.be.eq("b");
        });
        it('should sortBy array', async () => {
            let arr = [{ a: 2 }, { a: 1 }, { a: 3 }, { a: 1.5 }];
            let arr2 = index_1.Util.arrays.sortBy(arr, (item) => item.a);
            arr.should.be.deep.equal([{ a: 2 }, { a: 1 }, { a: 3 }, { a: 1.5 }]);
            arr2.should.be.deep.equal([{ a: 1 }, { a: 1.5 }, { a: 2 }, { a: 3 }]);
            let arr3 = index_1.Util.arrays.sortBy(arr, (item) => -item.a);
            arr3.should.be.deep.equal([{ a: 3 }, { a: 2 }, { a: 1.5 }, { a: 1 }]);
        });
        it('should sort array', async () => {
            let arr = [2, 1, 3, 1.5];
            let arr2 = index_1.Util.arrays.sort(arr);
            arr.should.be.deep.equal([2, 1, 3, 1.5]);
            arr2.should.be.deep.equal([1, 1.5, 2, 3]);
        });
        it('should uniqby  array', async () => {
            let arr = [{ a: 2 }, { a: 1 }, { a: 2 }];
            arr = index_1.Util.arrays.uniqBy(arr, (item) => item.a);
            arr.length.should.be.eq(2);
            arr[0].a.should.be.eq(2);
        });
        it('should uniq  array', async () => {
            let arr = [1, 2, 4, 2, 4];
            arr = index_1.Util.arrays.uniq(arr);
            arr.should.be.deep.equal([1, 2, 4]);
        });
        it('should differenceBy  array', async () => {
            let arr = index_1.Util.arrays.differenceBy([{ 'x': 2 }, { 'x': 1 }, { x: 2 }, { 'x': 1 }], [{ 'x': 1 }], (item) => item.x);
            arr.length.should.be.eq(2);
            arr[0].x.should.be.eq(2);
            arr = index_1.Util.arrays.differenceBy([{ 'x': 2 }, { 'x': 1 }, { x: 2 }, { 'x': 1 }], [{ 'x': 1 }, { 'x': 2 }], (item) => item.x);
            arr.length.should.be.eq(0);
            let arr2 = index_1.Util.arrays.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
            arr2.length.should.be.eq(1);
            arr2[0].should.be.eq(1.2);
            let arr3 = index_1.Util.arrays.difference([2, 1], [2, 3]);
            arr3.length.should.be.eq(1);
            arr3[0].should.be.eq(1);
            index_1.Util.arrays.difference([2, 1, 2, 3], [3, 4, 2]).should.be.deep.equal([1]);
            index_1.Util.arrays.difference([1, 2], [2, 1]).should.be.deep.equal([]);
        });
        it('should intersectionBy  array', async () => {
            let arr = index_1.Util.arrays.intersectionBy([{ 'x': 2 }, { 'x': 1 }, { x: 2 }, { 'x': 1 }], [{ 'x': 1 }], (item) => item.x);
            arr.length.should.be.eq(1);
            arr[0].x.should.be.eq(1);
            arr = index_1.Util.arrays.intersectionBy([{ 'x': 2 }, { 'x': 1 }, { x: 2 }, { 'x': 1 }], [{ 'x': 1 }, { 'x': 2 }], (item) => item.x);
            arr.length.should.be.eq(2);
            let arr2 = index_1.Util.arrays.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
            arr2.length.should.be.eq(1);
            arr2[0].should.be.eq(2.1);
            let arr3 = index_1.Util.arrays.intersection([2, 1], [2, 3]);
            arr3.length.should.be.eq(1);
            arr3[0].should.be.eq(2);
            index_1.Util.arrays.intersection([2, 1, 2, 3], [3, 4, 2]).should.be.deep.equal([2, 3]);
            index_1.Util.arrays.intersection([3, 5], [2, 1]).should.be.deep.equal([]);
        });
        it('should UnionBy  array', async () => {
            let arr = index_1.Util.arrays.unionBy([{ 'x': 2 }, { 'x': 1 }, { x: 2 }, { 'x': 1 }], [{ 'x': 1 }], (item) => item.x);
            arr.length.should.be.eq(2);
            arr[0].x.should.be.eq(2);
            arr = index_1.Util.arrays.unionBy([{ 'x': 2 }, { 'x': 1 }, { x: 2 }, { 'x': 3 }], [{ 'x': 1 }, { 'x': 2 }], (item) => item.x);
            arr.length.should.be.eq(3);
            let arr2 = index_1.Util.arrays.unionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
            arr2.length.should.be.eq(3);
            arr2[0].should.be.eq(2.1);
            let arr3 = index_1.Util.arrays.union([2, 1], [2, 3]);
            arr3.length.should.be.eq(3);
            arr3[0].should.be.eq(2);
            index_1.Util.arrays.union([2, 1, 2, 3], [3, 4, 2]).should.be.deep.equal([2, 1, 3, 4]);
            index_1.Util.arrays.union([3, 5], [2, 1, 2]).should.be.deep.equal([3, 5, 2, 1]);
        });
        it('should array count by', async () => {
            index_1.Arrays.countBy([6.1, 4.2, 6.3], item => Math.floor(item)).should.be.deep.equal({ '4': 1, '6': 2 });
            index_1.Arrays.countBy(['one', 'two', 'three'], item => item.length).should.be.deep.equal({ '3': 2, '5': 1 });
        });
        it('should flat array', async () => {
            let arr = [1, [2, [3, [4]], 5]];
            let result = index_1.Util.arrays.flat(arr);
            JSON.stringify(result).should.be.eq("[1,2,[3,[4]],5]");
            result = index_1.Util.arrays.flat([1, 2, [3, 4]]);
            JSON.stringify(result).should.be.eq("[1,2,3,4]");
        });
        it('should flat array deep', async () => {
            let arr = [1, 2, [3, 4, [5, 6]]];
            let result = index_1.Util.arrays.flatDeep(arr, Infinity);
            JSON.stringify(result).should.be.eq("[1,2,3,4,5,6]");
        });
        it('should zip array', async () => {
            let arr = [[1, 2], [3, 4], [5, 6], [7], [8, 9, 10, 11]];
            let [head, ...tail] = arr;
            let result = (0, index_1._)(head).zip(...tail).flat().compact().value();
            JSON.stringify(result).should.be.eq("[1,3,5,7,8,2,4,6,9,10,11]");
        });
        it('should zip array 1 item', async () => {
            let arr = [[1, 2, 3, 4]];
            let [head, ...tail] = arr;
            let result = (0, index_1._)(head).zip(...tail).flat().compact().value();
            JSON.stringify(result).should.be.eq("[1,2,3,4]");
        });
        it('should partition array', async () => {
            let users = [
                { 'user': 'barney', 'age': 36, 'active': false },
                { 'user': 'fred', 'age': 40, 'active': true },
                { 'user': 'pebbles', 'age': 1, 'active': false }
            ];
            let [arr1, arr2] = index_1.Util.arrays.partition(users, (user) => user.active);
            JSON.stringify(arr1).should.be.eq(`[{"user":"fred","age":40,"active":true}]`);
            JSON.stringify(arr2).should.be.eq(`[{"user":"barney","age":36,"active":false},{"user":"pebbles","age":1,"active":false}]`);
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
        it('should milisecHuman', async () => {
            index_1.Util.time.milisecHuman(536643021).should.be.eq("6 days, 5 hours, 4 minutes, 3 seconds, 21 milli");
            index_1.Util.time.milisecHuman((3 * 60 * 1000) + 500).should.be.eq("3 minutes, 0 seconds, 500 milli");
        });
    });
    describe("Promise", function () {
        it('should run with map', async () => {
            let result = await index_1.Util.promises.map([1, 2], item => Promise.resolve(item));
            result.should.be.deep.equals([1, 2]);
        });
        it('should throw on promise timeout', async () => {
            try {
                await index_1.Util.promises.promiseTimeout(index_1.Util.promises.delay(1000), 100);
            }
            catch (e) {
                e.message.should.be.eq("promise timeout");
            }
        });
        it('should run from callback', async () => {
            function test(callback) {
                process.nextTick(() => callback(null, 1));
            }
            let result = await index_1.Util.promises.fromCallback((c) => test(c));
            result.should.be.eq(1);
        });
        it('should check if promise', async () => {
            index_1.Util.promises.isPromise({ then: true }).should.be.not.ok;
            index_1.Util.promises.isPromise(null).should.be.not.ok;
            index_1.Util.promises.isPromise({}).should.be.not.ok;
            index_1.Util.promises.isPromise(Promise.resolve()).should.be.ok;
            index_1.Util.promises.isPromise(new Promise(resolve => null)).should.be.ok;
        });
        it('should run with props', async () => {
            let result = await index_1.Util.promises.props({ a: Promise.resolve(1), b: Promise.resolve(2) });
            result.should.be.deep.equals({
                "a": 1,
                "b": 2
            });
        });
        it('should run with allSettled', async () => {
            let result = await index_1.Util.promises.allSettled([Promise.resolve(1), Promise.reject(2)]);
            result.should.be.deep.equal([
                { status: "fulfilled", value: 1 },
                { "reason": 2, "status": "rejected" }
            ]);
        });
        it('should run with some', async () => {
            let result = await index_1.Util.promises.some([
                index_1.Promises.delay(15).then(() => 3),
                index_1.Promises.delay(10).then(() => 2),
                index_1.Promises.delay(5).then(() => 1)
            ]);
            result.should.be.deep.equal([
                { status: "fulfilled", value: 1 }
            ]);
            let result2 = await index_1.Util.promises.some([
                index_1.Promises.delay(15).then(() => 3),
                index_1.Promises.delay(10).then(() => Promise.reject(2)),
                index_1.Promises.delay(5).then(() => 1)
            ], { counter: 2 });
            result2.should.be.deep.equal([
                { status: "fulfilled", value: 1 },
                { status: "rejected", reason: 2 }
            ]);
        });
        it('should run with some resolved', async () => {
            let result = await index_1.Util.promises.someResolved([
                index_1.Promises.delay(15).then(() => 3),
                index_1.Promises.delay(10).then(() => 2),
                index_1.Promises.delay(5).then(() => 1)
            ]);
            result.should.be.deep.equal([
                { status: "fulfilled", value: 1 }
            ]);
            let result2 = await index_1.Util.promises.someResolved([
                index_1.Promises.delay(15).then(() => 3),
                index_1.Promises.delay(10).then(() => Promise.reject(2)),
                index_1.Promises.delay(5).then(() => 1)
            ], { counter: 2 });
            result2.should.be.deep.equal([
                { status: "fulfilled", value: 1 },
                { status: "fulfilled", value: 3 }
            ]);
            let result3 = await index_1.Util.promises.someResolved([
                index_1.Promises.delay(15).then(() => 3),
                index_1.Promises.delay(10).then(() => Promise.reject(2)),
                index_1.Promises.delay(5).then(() => Promise.reject(1))
            ], { counter: 2 });
            result3.should.be.deep.equal([
                { status: "fulfilled", value: 3 }
            ]);
            let result4 = await index_1.Util.promises.someResolved([
                index_1.Promises.delay(15).then(() => Promise.reject(3)),
                index_1.Promises.delay(10).then(() => Promise.reject(2)),
                index_1.Promises.delay(5).then(() => Promise.reject(1))
            ], { counter: 2 });
            result4.should.be.deep.equal([]);
            let result5 = await index_1.Util.promises.someResolved([
                index_1.Promises.delay(15).then(() => Promise.resolve({ name: true })),
                index_1.Promises.delay(10).then(() => Promise.resolve({ name: false })),
                index_1.Promises.delay(5).then(() => Promise.resolve({ name: true }))
            ], { counter: 3, fn: (value) => value.name });
            result5.should.be.deep.equal([
                { status: "fulfilled", value: { "name": true } },
                { status: "fulfilled", value: { "name": true } }
            ]);
        });
        it('should run promise reject', async () => {
            let counter = 0;
            let fn = async () => {
                counter++;
                if (counter != 3) {
                    throw new Error("aaa");
                }
                return counter;
            };
            counter = await index_1.Promises.retry(fn, 3);
            counter.should.be.eq(3);
        });
        it('should run promise create', async () => {
            let counter = 0;
            let fn = async () => {
                counter++;
                if (counter != 3) {
                    throw new Error("aaa");
                }
                return counter;
            };
            let [err, counter2] = await index_1.Promises.create(fn)
                .delay(10)
                .retry(1)
                .runTo();
            should.not.exist(counter2);
            should.exist(err);
            counter = 0;
            [err, counter2] = await index_1.Promises.create(fn)
                .delay(10)
                .retry(2)
                .runTo();
            counter2.should.be.eq(3);
        });
        it('should run promise create2', async () => {
            let fn = async () => {
                await index_1.Promises.delay(1);
                throw new Error("err");
            };
            let [err] = await index_1.Promises.to(index_1.Promises.create(fn)
                .retry({
                "retires": 1,
                "linear": 100,
                "random": 200
            })
                .run());
            err.message.should.be.eq("err");
        });
        it('should run with some rejected', async () => {
            let result = await index_1.Util.promises.someRejected([
                index_1.Promises.delay(15).then(() => Promise.reject(3)),
                index_1.Promises.delay(10).then(() => Promise.reject(2)),
                index_1.Promises.delay(5).then(() => Promise.reject(1))
            ]);
            result.should.be.deep.equal([
                { status: "rejected", reason: 1 }
            ]);
            let result2 = await index_1.Util.promises.someRejected([
                index_1.Promises.delay(15).then(() => Promise.reject(3)),
                index_1.Promises.delay(10).then(() => 2),
                index_1.Promises.delay(5).then(() => Promise.reject(1))
            ], { counter: 2 });
            result2.should.be.deep.equal([
                { status: "rejected", reason: 1 },
                { status: "rejected", reason: 3 }
            ]);
            let result3 = await index_1.Util.promises.someRejected([
                index_1.Promises.delay(15).then(() => Promise.reject(3)),
                index_1.Promises.delay(10).then(() => 2),
                index_1.Promises.delay(5).then(() => 1)
            ], { counter: 2 });
            result3.should.be.deep.equal([
                { status: "rejected", reason: 3 }
            ]);
            let result4 = await index_1.Util.promises.someRejected([
                index_1.Promises.delay(15).then(() => 3),
                index_1.Promises.delay(10).then(() => 2),
                index_1.Promises.delay(5).then(() => 1)
            ], { counter: 2 });
            result4.should.be.deep.equal([]);
            let result5 = await index_1.Util.promises.someRejected([
                index_1.Promises.delay(15).then(() => Promise.resolve({ name: true })),
                index_1.Promises.delay(10).then(() => Promise.resolve({ name: false })),
                index_1.Promises.delay(5).then(() => Promise.resolve({ name: true }))
            ], { counter: 3, fn: (value) => value.name });
            result5.should.be.deep.equal([
                { status: "rejected", reason: { "name": false } }
            ]);
        });
    });
    describe("Classes", function () {
        it('should get classToPlain', async () => {
            class B {
                constructor() {
                    this.g = "gg";
                }
            }
            class A extends B {
                constructor() {
                    super(...arguments);
                    this.d = "ddd";
                }
                get a() {
                    return "aa";
                }
                set a(value) {
                }
                c() {
                }
                get e() {
                    return "e";
                }
                static c() {
                }
            }
            let a = index_1.Classes.classToPlain(new A());
            a.should.be.deep.equals({ g: 'gg', d: 'ddd' });
        });
        it('should get plainToClass', async () => {
            class A {
                constructor(_params = {}) {
                    this._params = _params;
                }
                a(value) {
                    this._params.a = value;
                    return this;
                }
                b(value) {
                    this._params.b = value;
                    return this;
                }
                get params() {
                    return this._params;
                }
            }
            let a = new A().a(1).b(2);
            let dto = index_1.Classes.classToPlain(a);
            let dto2 = index_1.Classes.plainToClass(A, dto);
            dto2.params.should.be.deep.equals({ a: 1, b: 2 });
        });
        it('should get class methods', async () => {
            class B {
                cc() {
                }
            }
            class A extends B {
                get a() {
                    return "a";
                }
                set a(value) {
                }
                aa() {
                }
                bb() {
                }
            }
            let result = index_1.Util.classes.getClassMethodsName(A);
            result.should.be.deep.eq(["aa", "bb"]);
        });
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
        it('should clone class', async () => {
            class C {
                constructor() {
                    this._test = "aa";
                }
                getTest() {
                    return this._test;
                }
            }
            let a = new C();
            let b = index_1.Util.functions.cloneFn(a);
            a.should.not.equal(b);
            b.getTest().should.be.eq("aa");
            b._test = "bb";
            a.getTest().should.be.eq("aa");
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
            index_1.Util.strings.stringifyObjectValues({ a: 1, b: true, c: "a" }).should.be.eq("1truea");
        });
        it('should sanitizeRegex', async () => {
            index_1.Util.strings.sanitizeRegex("^a[A-Z]").should.be.eq("\\^a\\[A\\-Z\\]");
        });
        it('should truncate', async () => {
            index_1.Util.strings.truncate("qwertyuiop", 5).should.be.eq("qwert...");
            index_1.Util.strings.truncate("qwertyuiop", 10).should.be.eq("qwertyuiop");
        });
        it('should generate password', async () => {
            let pass = index_1.Util.strings.generatePassword(3);
            pass.length.should.be.eq(3);
            pass = index_1.Util.strings.generatePassword(3, "a");
            pass.should.be.eq("aaa");
        });
        it('should removeNewLine', async () => {
            index_1.Util.strings.removeNewLine("aaa\nbbb\r").should.be.eq("aaabbb");
        });
        it('should serializeToQueryString', async () => {
            index_1.Util.strings.serializeToQueryString({ a: 12, b: 34, c: "56" }).should.be.eq("a=12&b=34&c=56");
        });
        it('should convertStringToFloatArray', async () => {
            index_1.Util.strings.convertStringToFloatArray("1,2.3,5").should.be.deep.equals([1, 2.3, 5]);
        });
        it('should replaceFormat', async () => {
            index_1.Util.strings.replaceFormat("aa${b}", { b: 1 }).should.be.eq("aa1");
            index_1.Util.strings.replaceFormat("aa${c}", { b: 1 }).should.be.eq("aa${c}");
            index_1.Util.strings.replaceFormat("aa${c}bbb${hh}${cc}${dd}", {
                c: 1,
                hh: 2,
                cc: 0,
                dd: undefined
            }).should.be.eq("aa1bbb20");
            index_1.Util.strings.replaceFormat("aa${b}${c-d}${x}", { b: 1, "c-d": 3 }, {
                empty: true,
                regex: /\$\{([\w\.\_\-]*)\}/gm
            }).should.be.eq("aa13");
        });
        it('should replaceFormatJson', async () => {
            let obj = { a: "${aa:number}", b: "${bb:boolean}", d: "${kk}", c: ["${dd:integer}", "${ff}", "${gg}"] };
            let data = { aa: 1, bb: true, dd: 2.2, ff: "aa", kk: undefined };
            let output = index_1.Util.objects.replaceFormatJson(obj, data);
            let expected = { "a": 1, "b": true, "d": "", "c": [2, "aa", "${gg}"] };
            output.should.be.deep.equals(expected);
        });
        it('should invert', async () => {
            index_1.Util.objects.invert({ 'a': 1, 'b': 2, 'c': 1 }).should.be.deep.equals({ '1': 'c', '2': 'b' });
            index_1.Util.objects.invert({ 'a': 1, 'b': 2, 'c': 3 }).should.be.deep.equals({ '1': 'a', '2': 'b', '3': 'c' });
        });
        it('should slugify', async () => {
            index_1.Util.strings.slugify("Vtest/aaa.bbb%").should.be.eq("vtestaaabbb");
        });
        it('should  partial string combinations', async () => {
            let values = index_1.Util.strings.partialCombinations({ value: "abcdefghijkl", minLen: 3 });
            values.should.be.deep.equal(["abc", "bcd", "cde", "def", "efg", "fgh", "ghi", "hij", "ijk", "jkl", "abcd", "bcde", "cdef", "defg", "efgh", "fghi", "ghij", "hijk", "ijkl", "abcde", "bcdef", "cdefg", "defgh", "efghi", "fghij", "ghijk", "hijkl", "abcdef", "bcdefg", "cdefgh", "defghi", "efghij", "fghijk", "ghijkl", "abcdefg", "bcdefgh", "cdefghi", "defghij", "efghijk", "fghijkl", "abcdefgh", "bcdefghi", "cdefghij", "defghijk", "efghijkl", "abcdefghi", "bcdefghij", "cdefghijk", "defghijkl", "abcdefghij", "bcdefghijk", "cdefghijkl", "abcdefghijk", "bcdefghijkl", "abcdefghijkl"]);
        });
    });
    describe("numbers", function () {
        it('should toFixed', async () => {
            index_1.Util.numbers.toFixed(1.22344566778, 2).should.be.eq(1.22);
        });
        it('should format', async () => {
            index_1.Util.numbers.format(2132131232132131.2223).should.be.eq("2,132,131,232,132,131.2");
        });
        it('should round', async () => {
            index_1.Util.numbers.round(1.6, 0.5).should.be.eq(1.5);
        });
        it('should random', async () => {
            let num = index_1.Util.numbers.random(1.22344566778, 4);
            Number.isInteger(num).should.be.not.ok;
            num = index_1.Util.numbers.random(1, 4);
            Number.isInteger(num).should.be.ok;
            num.should.be.within(1, 4);
            num = index_1.Util.numbers.random(1, 1.5, true);
            num.should.be.within(1, 1.5);
        });
        it('should average', async () => {
            index_1.Util.numbers.average([1, 4, 2, 3]).should.be.eq(2.5);
        });
        it('should median', async () => {
            index_1.Util.numbers.median([1, 4, 2, 3]).should.be.eq(2.5);
            index_1.Util.numbers.median([1, 4, 2, 3, 100]).should.be.eq(3);
            index_1.Util.numbers.median([1, 2, 3, 4, 5, 7, 8, 98, 100]).should.be.eq(5);
            index_1.Util.numbers.median([1, 2, 3, 4, 5, 100, 200, 300, 400]).should.be.eq(5);
        });
        it('should standardDeviation', async () => {
            index_1.Util.numbers.toFixed(index_1.Util.numbers.standardDeviation([1, 4, 2, 3])).should.be.eq(1);
            index_1.Util.numbers.toFixed(index_1.Util.numbers.standardDeviation([1, 4, 2, 3, 100, 50, 2, 3, 4, 5])).should.be.eq(31);
        });
        it('should spikes', async () => {
            let result = index_1.Util.numbers.spikes([1, 2, 3, 4, 5]);
            result.spikes.should.be.deep.eq([]);
            result.filtered.should.be.deep.eq([1, 2, 3, 4, 5]);
            result = index_1.Util.numbers.spikes([1, 2, 3, 4, 5, 100]);
            result.spikes.should.be.deep.eq([100]);
            result.filtered.should.be.deep.eq([1, 2, 3, 4, 5]);
            result = index_1.Util.numbers.spikes([1, 2, 3, 4, 5, 7, 8, 50, 100]);
            result.spikes.should.be.deep.eq([100]);
            result.filtered.should.be.deep.eq([1, 2, 3, 4, 5, 7, 8, 50]);
        });
    });
    describe("Objects", function () {
        it('should Object get', async () => {
            index_1.Util.objects.get({ a: { b: 2 } }, "a.b").should.be.eq(2);
            index_1.Util.objects.get({ a: 1, b: 2 }, "a").should.be.eq(1);
            should.not.exist(index_1.Util.objects.get({ a: 1, b: 2 }, "a.b"));
            index_1.Util.objects.get({ a: [{ bar: { c: 3 } }] }, 'a[0].bar.c').should.be.eq(3);
        });
        it('should Object set', async () => {
            let obt = { a: {} };
            index_1.Util.objects.set(obt, "a.b.c", 1);
            obt.a.b.c.should.be.eq(1);
        });
        it('should isPlain', async () => {
            index_1.Util.objects.isPlain({ a: 1, b: true, c: "a" }).should.be.eq(true);
            index_1.Util.objects.isPlain(Object.create({})).should.be.eq(true);
            index_1.Util.objects.isPlain(Object.create(Object.prototype)).should.be.eq(true);
            index_1.Util.objects.isPlain({ foo: 'bar' }).should.be.eq(true);
            index_1.Util.objects.isPlain({}).should.be.eq(true);
        });
        it('should object pick', async () => {
            index_1.Util.objects.pick({ a: 1, b: true, c: "a" }, "a").should.be.deep.equal({ a: 1 });
        });
        it('should object omit', async () => {
            index_1.Util.objects.omit({ a: 1, b: true, c: "a" }, "a").should.be.deep.equal({ b: true, c: 'a' });
        });
        it('should not isPlain', async () => {
            index_1.Util.objects.isPlain([{ a: 1, b: true, c: "a" }]).should.be.eq(false);
            index_1.Util.objects.isPlain(1).should.be.eq(false);
            index_1.Util.objects.isPlain(['foo', 'bar']).should.be.eq(false);
            index_1.Util.objects.isPlain([]).should.be.eq(false);
            index_1.Util.objects.isPlain(new class A {
            }).should.be.eq(false);
            index_1.Util.objects.isPlain(null).should.be.eq(false);
            index_1.Util.objects.isPlain(function () {
            }).should.be.eq(false);
            index_1.Util.objects.isPlain(new function () {
            }).should.be.eq(false);
            index_1.Util.objects.isPlain(Object.create(null)).should.be.eq(false);
        });
        it('should isDrained', async () => {
            index_1.Util.objects.isEmpty({}).should.be.eq(true);
            index_1.Util.objects.isEmpty([]).should.be.eq(true);
            index_1.Util.objects.isEmpty(null).should.be.eq(true);
            index_1.Util.objects.isEmpty('').should.be.eq(true);
            index_1.Util.objects.isEmpty({ a: '1' }).should.be.eq(false);
        });
        it('should extend defaults deep', async () => {
            index_1.Util.objects.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } }).should.deep.equals({
                'a': {
                    'b': 2,
                    'c': 3
                }
            });
            index_1.Util.objects.defaultsDeep({ 'a': { 'b': 2 }, 'd': 4 }, {
                'a': { 'b': 3, 'c': 3 },
                'e': 5
            }).should.deep.equals({ 'a': { 'b': 2, 'c': 3 }, 'd': 4, 'e': 5 });
            index_1.Util.objects.defaultsDeep({ 'a': 1, 'b': { 'c': 2 } }, { 'b': { 'c': 3, 'd': 3 } }).should.deep.equals({
                'a': 1,
                'b': { 'c': 2, 'd': 3 }
            });
            index_1.Util.objects.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 3 } }, { 'a': { 'c': 3 } }, {
                'a': {
                    'b': 3,
                    'c': 3
                }
            }, { 'a': { 'c': 4 } }).should.deep.equals({ 'a': { 'b': 2, 'c': 3 } });
        });
        it('should extend defaults', async () => {
            index_1.Util.objects.defaults({}, { a: 1 }, { b: 1 }).should.deep.equals({ a: 1, b: 1 });
            index_1.Util.objects.defaults({}, { a: 1 }, { a: 2 }).should.deep.equals({ a: 1 });
            index_1.Util.objects.defaults({ a: 1 }, { a: 2, b: 1 }).should.deep.equals({ a: 1, b: 1 });
            index_1.Util.objects.defaults({ a: 1 }, { a: 2, b: 1 }, { b: 2, c: 3 }).should.deep.equals({ a: 1, b: 1, c: 3 });
            index_1.Util.objects.defaults({}, { a: undefined }, { a: 2, b: 1 }, { b: 2, c: 3 }).should.deep.equals({
                a: 2,
                b: 1,
                c: 3
            });
            index_1.Util.objects.defaults({ a: undefined }, { a: 2, b: 1 }, { b: 2, c: 3 }).should.deep.equals({
                a: 2,
                b: 1,
                c: 3
            });
            index_1.Util.objects.defaults({ a: null }, { a: 2, b: 1 }, { b: 2, c: 3 }).should.deep.equals({ a: null, b: 1, c: 3 });
        });
        it('should not isDrained', async () => {
            index_1.Util.objects.isEmpty({ a: 1 }).should.be.eq(false);
        });
        it('should compact', async () => {
            index_1.Util.objects.compact({ a: 1, b: undefined, c: null }).should.be.deep.equals({ a: 1 });
        });
        it('should try parse json', async () => {
            should.not.exist(index_1.Util.objects.tryParseJSON("{a:1"));
            index_1.Util.objects.tryParseJSON('{"a":1}').should.be.deep.equals({ a: 1 });
        });
        it('should clone deep', async () => {
            let klass = new class A {
            };
            let obj = { a: 1, b: { c: 2 }, d: [1, 2], f: klass };
            let cloned = index_1.Util.objects.cloneDeep(obj);
            (obj.a === cloned.a).should.be.ok;
            (obj.b === cloned.b).should.be.not.ok;
            (obj.b.c === cloned.b.c).should.be.ok;
            (obj.d[1] === cloned.d[1]).should.be.ok;
            (obj.d === cloned.d).should.be.not.ok;
            (obj.f === cloned.f).should.be.ok;
        });
        it('should merge ', async () => {
            let object = { 'a': [{ 'b': 2 }, { 'd': 4 }] };
            let other = { 'a': [{ 'c': 3 }, { 'e': 5 }] };
            index_1.Util.objects.merge(object, other).should.be.deep.equals({ 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] });
            index_1.Util.objects.merge(object, other, { c: 2 }).should.be.deep.equals({
                'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }],
                'c': 2
            });
            index_1.Util.objects.merge(object, other, { a: [{ c: 2 }] }).should.be.deep.equals({
                'a': [{ 'b': 2, 'c': 2 }, {
                        'd': 4,
                        'e': 5
                    }], 'c': 2
            });
            index_1.Util.objects.merge({ 'a': { 'b': { 'c': 2 } } }, { 'a': { 'b': { 'd': 4 } } }).should.be.deep.equals({
                'a': {
                    'b': {
                        'c': 2,
                        'd': 4
                    }
                }
            });
            index_1.Util.objects.merge({ 'a': [{ 'b': 2 }, { 'd': 4 }] }, { 'a': [{ 'c': 3 }, { 'e': 5 }] }).should.be.deep.equals({
                'a': [{
                        'b': 2,
                        'c': 3
                    }, { 'd': 4, 'e': 5 }]
            });
            index_1.Util.objects.merge({ 'a': { b: { c: [2, 3] } } }, { 'a': { b: { d: [3, 4] } } }).should.be.deep.equals({
                'a': {
                    b: {
                        c: [2, 3],
                        d: [3, 4]
                    }
                }
            });
            index_1.Util.objects.merge({ 'a': { 'b': { 'c': 1, 'd': [2, 3] }, 'e': [4, 5] }, 'f': 6 }, {
                'a': {
                    'b': {
                        'c': 7,
                        'd': [8, 9]
                    }, 'e': [10, 11]
                }, 'f': 12, 'g': { 'h': 13 }
            })
                .should.be.deep.equals({ 'a': { 'b': { 'c': 7, 'd': [8, 9] }, 'e': [10, 11] }, 'f': 12, 'g': { 'h': 13 } });
            index_1.Util.objects.merge({ 'a': { 'b': { 'c': 1 } }, 'd': [2, 3] }, { 'a': { 'b': { 'c': 4 } }, 'd': [5, 6] })
                .should.be.deep.equals({ 'a': { 'b': { 'c': 4 } }, 'd': [5, 6] });
        });
        it('should clone json', async () => {
            let obj = { a: 1, b: { c: 2 }, d: [1, 2], f: [{ a: [1] }] };
            let cloned = index_1.Util.objects.cloneJSON(obj);
            (obj.a === cloned.a).should.be.ok;
            (obj.b === cloned.b).should.be.not.ok;
            (obj.b.c === cloned.b.c).should.be.ok;
            (obj.d[1] === cloned.d[1]).should.be.ok;
            (obj.d === cloned.d).should.be.not.ok;
            cloned.d.push(3);
            obj.d.length.should.be.eq(2);
            cloned.b.c = 3;
            obj.b.c.should.be.eq(2);
            (obj.f[0].a === cloned.f[0].a).should.be.not.ok;
            (obj.f[0].a).should.be.deep.equal(cloned.f[0].a);
        });
        it('should clone fast', async () => {
            let obj = { a: 1, b: { c: 2 }, d: [1, 2] };
            let cloned = index_1.Util.objects.cloneFast(obj);
            (obj.a === cloned.a).should.be.ok;
            (obj.b === cloned.b).should.be.not.ok;
            (obj.b.c === cloned.b.c).should.be.ok;
            (obj.d[1] === cloned.d[1]).should.be.ok;
            (obj.d === cloned.d).should.be.not.ok;
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
            index_1.Util.enums.enumNames(Test).should.be.deep.equals(['A', 'B', 'C', 'D']);
        });
    });
    describe("Files", function () {
        it('should get flies', async () => {
            let files = [];
            for (let file of index_1.Util.files.walk(__dirname, "")) {
                files.push(file);
            }
            files.length.should.be.eq(1);
            files[0].should.include("unit.js");
        });
        it('should get calller path', async () => {
            let paths = index_1.Util.files.callerPaths(1);
            paths[0].should.be.eq(__filename);
        });
    });
    describe("rsa", function () {
        it('should encrypt decrypt ras keys', async () => {
            let { privateKey, publicKey } = await index_1.Crypto.rsa.generateRsaKeys();
            let encrypt = index_1.Crypto.rsa.encrypt(publicKey, "test");
            let singhId = index_1.Crypto.rsa.sign(privateKey, "test");
            let decrypt = index_1.Crypto.rsa.decrypt(privateKey, encrypt);
            let isValid = index_1.Crypto.rsa.verify(publicKey, singhId, decrypt);
            decrypt.should.be.eq("test");
            isValid.should.be.ok;
        });
    });
    describe("aes", function () {
        it('should encrypt decrypt', async () => {
            let encrypt = index_1.Crypto.aes.encrypt("aaaaaa", "bbbbbbbb");
            let decrypt = index_1.Crypto.aes.decrypt("aaaaaa", encrypt);
            decrypt.should.be.eq("bbbbbbbb");
        });
    });
    describe("md5", function () {
        it('should create valid hash', async () => {
            let has1 = index_1.Crypto.hash.md5("aaaaaa");
            let has2 = index_1.Crypto.hash.md5("aaaaaa");
            has1.should.be.eq(has2);
        });
    });
    describe("murmurHash", function () {
        it('should create valid hash', async () => {
            let has1 = index_1.Crypto.hash.murmurHash("aaaaaa");
            let has2 = index_1.Crypto.hash.murmurHash("aaaaaa");
            let has3 = index_1.Crypto.hash.murmurHash("aaaaaads");
            has1.should.be.eq(has2);
            has1.should.not.be.eq(has3);
        });
    });
    describe("strNumHash", function () {
        it('should create valid hash', async () => {
            let has1 = index_1.Crypto.hash.strNumHash("aaaaaa");
            let has2 = index_1.Crypto.hash.strNumHash("aaaaaa");
            let has3 = index_1.Crypto.hash.strNumHash("aaaaaads");
            has1.should.be.eq(has2);
            has1.should.not.be.eq(has3);
        });
    });
    describe("salt", function () {
        it('should create salt password', async () => {
            let hashed = await index_1.Crypto.salt.hash("aaaaaa");
            let isValid = await index_1.Crypto.salt.verify("aaaaaa", hashed);
            let isValid2 = await index_1.Crypto.salt.verify("aaaaaa2", hashed);
            isValid.should.be.ok;
            isValid2.should.not.be.ok;
        });
    });
    describe("xor", function () {
        it('should create encrypt with xor', async () => {
            let hashed = await index_1.Crypto.xor.encode("aaaaaa", "bbbb");
            let result = await index_1.Crypto.xor.decode("aaaaaa", hashed);
            result.should.be.ok;
            result.should.be.eq("bbbb");
        });
    });
    describe("hash code", function () {
        it('should create hash using hashCode', () => {
            let hashed = index_1.Crypto.hash.hashCode("aaaaaabbbbbbbbbccccccccccc", "_");
            hashed.should.be.ok;
            hashed.should.be.eq("_-744904127");
        });
        it('should create hash using hash8', () => {
            let hashed = index_1.Crypto.hash.hash8Hex("aaaaaaaaaabbbasdasfasdfnmvdkm^435325233435^^&2312bbbbbbcccccccccccddddddd");
            hashed.should.be.ok;
            hashed.should.be.eq("6232e951");
        });
    });
    describe("url", function () {
        it('should validate domain', async () => {
            index_1.Util.url.isValidDomain("aaaaaa").should.be.not.ok;
            index_1.Util.url.isValidDomain("aaaaaa..com").should.be.not.ok;
            index_1.Util.url.isValidDomain("aaaaaa.com").should.be.ok;
        });
        it('should parse url', async () => {
            // Util.url.parse("https://user:pass@sub.example.com:8080/p/a/t/h?query=string#hash").host.should.be.eq("sub.example.com:8080");
            index_1.Util.url.parse(undefined).host.should.be.eq("");
        });
        it('should validate domain', async () => {
            index_1.Util.url.isValidUrl("aaaaaa").should.be.not.ok;
            index_1.Util.url.isValidUrl("aaaaaa..com").should.be.not.ok;
            index_1.Util.url.isValidUrl("httt://aaaaaa.com").should.be.not.ok;
            index_1.Util.url.isValidUrl("http://aaaaaa.com").should.be.ok;
        });
    });
    describe("ip", function () {
        it('should validate ip', async () => {
            index_1.Util.ip.isValidIp("aaaaaa").should.be.not.ok;
            index_1.Util.ip.isValidIp("123.1.257.1.").should.be.not.ok;
            index_1.Util.ip.isValidIp("123.1.257.1").should.be.ok;
            index_1.Util.ip.isValidIpRegex("aaaaaa").should.be.not.ok;
            index_1.Util.ip.isValidIpRegex("123.1.257.1.").should.be.not.ok;
            index_1.Util.ip.isValidIpRegex("123.1.257.1").should.be.not.ok;
            index_1.Util.ip.isValidIpRegex("123.1.255.1").should.be.ok;
        });
    });
    describe("date", function () {
        it('should get date diff', async () => {
            (0, dateJs_1.date)('2007-01-27').diff((0, dateJs_1.date)('2007-01-29'), 'millisecond').should.be.eq(-172800000);
            (0, dateJs_1.date)('2007-01-27').diff((0, dateJs_1.date)('2007-01-29'), 'day').should.be.eq(-2);
        });
        it('should get date add subtract', async () => {
            (0, dateJs_1.date)('2018-09-09T09:12:49.695Z').subtract(7, 'day').toISOString().should.be.eq("2018-09-02T09:12:49.695Z");
            (0, dateJs_1.date)('2018-09-09T09:12:49.695Z').add(7, 'day').toISOString().should.be.eq("2018-09-16T09:12:49.695Z");
        });
        it('should get date add endOf', async () => {
            (0, dateJs_1.date)('2018-09-09T09:12:49.695Z').endOf("month").toISOString().should.be.eq("2018-10-01T00:00:00.000Z");
            (0, dateJs_1.date)('2018-09-09T09:12:49.695Z').endOf("hour").toISOString().should.be.eq("2018-09-09T10:00:00.000Z");
            (0, dateJs_1.date)('2018-09-09T09:12:49.695Z').startOf("hour").toISOString().should.be.eq("2018-09-09T09:00:00.000Z");
        });
    });
});
//# sourceMappingURL=unit.js.map