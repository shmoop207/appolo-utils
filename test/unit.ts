"use strict";
import chai = require('chai');
import {Promises, Util, Crypto, Classes} from "../index";

let should = chai.should();

describe("Utils", function () {


    describe("guid", function () {
        it("should generate nanoid", async () => {
            let guid = await Util.guid.nanoid(21);

            guid.length.should.be.eq(21)
        })

        it("should generate uid", async () => {
            let guid = await Util.guid.uid(21);

            guid.length.should.be.eq(21)
        })
    })

    describe("arrays", function () {
        it('should compact array', async () => {

            let arr = Util.arrays.compact([undefined, null, "a"])

            arr.length.should.be.eq(1);
            arr[0].should.be.eq("a");
        });

        it('should check areArraysEqual', async () => {

            Util.arrays.areArraysEqual([1, 2, 3], [1, 2, 3]).should.be.ok
            Util.arrays.areArraysEqual([2, 1, 3, 5], [1, 2, 3, 5]).should.be.ok
            Util.arrays.areArraysEqual([2, 1, 3, 5], [1, 2, 4, 5]).should.be.not.ok

        });

        it('should map array', async () => {
            Util.arrays.map([{a: 1}, {a: 2}], item => item.a).should.deep.equal([1, 2]);
            Util.arrays.map({a: 1, b: 2}, (item, key: string) => item + key).should.deep.equal(['1a', '2b'])

            Util.arrays.map(undefined, (item, key: string) => item + key).should.deep.equal([])

        });

        it('should forEach array', async () => {

            let result = 0;

            Util.arrays.forEach([{a: 1}, {a: 2}], item => result += item.a);

            result.should.be.eq(3);
            let result2 = "";
            Util.arrays.forEach({a: 1, b: 2}, (item, key: string) => result2 += item + key);
            result2.should.be.eq("1a2b");
            result = 0;
            Util.arrays.forEach(undefined, (item: any) => result += item.a);

            result.should.be.eq(0);


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

        it('should milisecHuman', async () => {

            Util.time.milisecHuman(536643021).should.be.eq("6 days, 5 hours, 4 minutes, 3 seconds, 21 milli");
            Util.time.milisecHuman((3*60*1000)+500).should.be.eq("3 minutes, 0 seconds, 500 milli");

        });
    });



    describe("Promise", function () {
        it('should run with map', async () => {

            let result = await Util.promises.map([1, 2], item => Promise.resolve(item));


            result.should.be.deep.equals([1, 2]);
        });

        it('should throw on promise timeout', async () => {
            try {
                await Util.promises.promiseTimeout(Util.promises.delay(1000), 100)


            } catch (e) {
                e.message.should.be.eq("promise timeout")
            }
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

        it('should run promise reject', async () => {
            let counter = 0;

            let fn = async () => {
                counter++;
                if (counter != 3) {
                    throw new Error("aaa")
                }

                return counter
            }

            counter = await Promises.retry(fn, 3);

            counter.should.be.eq(3)
        })

        it('should run promise create', async () => {
            let counter = 0;

            let fn = async () => {
                counter++;
                if (counter != 3) {
                    throw new Error("aaa")
                }

                return counter
            }

            let [err, counter2] = await Promises.create(fn)
                .delay(10)
                .retry(1)
                .runTo();

            should.not.exist(counter2)
            should.exist(err)

            counter = 0;

            [err, counter2] = await Promises.create(fn)
                .delay(10)
                .retry(2)
                .runTo();

            counter2.should.be.eq(3)

        })

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
    })
    ;


    describe("Classes", function () {
        it('should get classToPlain', async () => {
            class B {
                g = "gg"
            }

            class A extends B {
                d = "ddd"

                get a() {
                    return "aa"
                }

                set a(value) {

                }

                c() {

                }

                get e() {
                    return "e"
                }

                static c() {

                }
            }

            let a = Classes.classToPlain<A>(new A());

            a.should.be.deep.equals({g: 'gg', d: 'ddd'})

        })

        it('should get plainToClass', async () => {

            class A {
                constructor(private _params: { a?: string, b?: string } = {}) {

                }

                a(value) {
                    this._params.a = value
                    return this;
                }

                b(value) {
                    this._params.b = value
                    return this;
                }

                get params() {
                    return this._params
                }
            }

            let  a = new A().a(1).b(2)

            let dto = Classes.classToPlain<A>(a);

            let dto2 = Classes.plainToClass(A,dto);

            dto2.params.should.be.deep.equals({ a: 1, b: 2 })

        })

        it('should get class methods', async () => {
            class B {
                cc() {

                }
            }

            class A extends B {
                get a() {
                    return "a"
                }

                set a(value) {

                }

                aa() {

                }

                bb() {

                }
            }


            let result = Util.classes.getClassMethodsName(A);

            result.should.be.deep.eq(["aa", "bb"])

        });

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

        it('should clone class', async () => {


            class C {
                private _test = "aa"

                constructor() {
                }

                public getTest() {
                    return this._test;
                }
            }

            let a = new C()

            let b: any = Util.functions.cloneFn(a);

            a.should.not.equal(b);

            b.getTest().should.be.eq("aa")

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
            Util.strings.stringifyObjectValues({a: 1, b: true, c: "a"}).should.be.eq("1truea");

        });

        it('should generate password', async () => {
            let pass = Util.strings.generatePassword(3);
            pass.length.should.be.eq(3);

            pass = Util.strings.generatePassword(3, "a");
            pass.should.be.eq("aaa");
        });


        it('should removeNewLine', async () => {
            Util.strings.removeNewLine("aaa\nbbb\r").should.be.eq("aaabbb");

        });

        it('should serializeToQueryString', async () => {
            Util.strings.serializeToQueryString({a: 12, b: 34, c: "56"}).should.be.eq("a=12&b=34&c=56");

        });

        it('should convertStringToFloatArray', async () => {
            Util.strings.convertStringToFloatArray("1,2.3,5").should.be.deep.equals([1, 2.3, 5]);

        });

        it('should replaceFormat', async () => {
            Util.strings.replaceFormat("aa${b}", {b: 1}).should.be.eq("aa1");

        });
    });

    describe("numbers", function () {
        it('should toFixed', async () => {
            Util.numbers.toFixed(1.22344566778, 2).should.be.eq(1.22);
        });

        it('should round', async () => {
            Util.numbers.round(1.6, 0.5).should.be.eq(1.5);
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

        it('should Object set', async () => {
            let obt: any = {a: {}}

            Util.objects.set(obt, "a.b.c", 1);

            obt.a.b.c.should.be.eq(1);
        })

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

        it('should isDrained', async () => {
            Util.objects.isEmpty({}).should.be.eq(true);

        });

        it('should extend defaults', async () => {
            Util.objects.defaults<any>({}, {a: 1}, {b: 1}).should.deep.equals({a: 1, b: 1});
            Util.objects.defaults<any>({}, {a: 1}, {a: 2}).should.deep.equals({a: 1});
            Util.objects.defaults<any>({a: 1}, {a: 2, b: 1}).should.deep.equals({a: 1, b: 1});
            Util.objects.defaults<any>({a: 1}, {a: 2, b: 1}, {b: 2, c: 3}).should.deep.equals({a: 1, b: 1, c: 3});
            Util.objects.defaults<any>({}, {a: undefined}, {a: 2, b: 1}, {b: 2, c: 3}).should.deep.equals({
                a: 2,
                b: 1,
                c: 3
            });

            Util.objects.defaults<any>({a: undefined}, {a: 2, b: 1}, {b: 2, c: 3}).should.deep.equals({
                a: 2,
                b: 1,
                c: 3
            });
            Util.objects.defaults<any>({a: null}, {a: 2, b: 1}, {b: 2, c: 3}).should.deep.equals({a: null, b: 1, c: 3});

        });

        it('should not isDrained', async () => {
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

        it('should get calller path', async () => {

            let paths = Util.files.callerPaths(1);
            paths[0].should.be.eq(__filename)
        });

    });

    describe("rsa", function () {
        it('should encrypt decrypt ras keys', async () => {

            let {privateKey, publicKey} = await Crypto.rsa.generateRsaKeys();

            let encrypt = Crypto.rsa.encrypt(publicKey, "test");
            let singhId = Crypto.rsa.sign(privateKey, "test");

            let decrypt = Crypto.rsa.decrypt(privateKey, encrypt);
            let isValid = Crypto.rsa.verify(publicKey, singhId, decrypt);

            decrypt.should.be.eq("test");
            isValid.should.be.ok;
        });

    });
    describe("aes", function () {
        it('should encrypt decrypt', async () => {

            let encrypt = Crypto.aes.encrypt("aaaaaa", "bbbbbbbb")

            let decrypt = Crypto.aes.decrypt("aaaaaa", encrypt);

            decrypt.should.be.eq("bbbbbbbb")

        });


    });

    describe("md5", function () {
        it('should create valid hash', async () => {

            let has1 = Crypto.hash.md5("aaaaaa");
            let has2 = Crypto.hash.md5("aaaaaa");

            has1.should.be.eq(has2)

        });

    });

    describe("salt", function () {
        it('should create salt password', async () => {

            let hashed = await Crypto.salt.hash("aaaaaa");
            let isValid = await Crypto.salt.verify("aaaaaa", hashed);
            let isValid2 = await Crypto.salt.verify("aaaaaa2", hashed);

            isValid.should.be.ok;
            isValid2.should.not.be.ok;

        });

    });

    describe("xor", function () {
        it('should create encrypt with xor', async () => {

            let hashed = await Crypto.xor.encode("aaaaaa", "bbbb");
            let result = await Crypto.xor.decode("aaaaaa", hashed);


            result.should.be.ok;
            result.should.be.eq("bbbb")

        });

    });


    describe("url", function () {
        it('should validate domain', async () => {

            Util.url.isValidDomain("aaaaaa").should.be.not.ok;
            Util.url.isValidDomain("aaaaaa..com").should.be.not.ok;
            Util.url.isValidDomain("aaaaaa.com").should.be.ok;

        });

        it('should validate domain', async () => {

            Util.url.isValidUrl("aaaaaa").should.be.not.ok;
            Util.url.isValidUrl("aaaaaa..com").should.be.not.ok;
            Util.url.isValidUrl("httt://aaaaaa.com").should.be.not.ok;
            Util.url.isValidUrl("http://aaaaaa.com").should.be.ok;
        });

    });


    describe("ip", function () {
        it('should validate ip', async () => {

            Util.ip.isValidIp("aaaaaa").should.be.not.ok;
            Util.ip.isValidIp("123.1.257.1.").should.be.not.ok;
            Util.ip.isValidIp("123.1.257.1").should.be.ok;

            Util.ip.isValidIpRegex("aaaaaa").should.be.not.ok;
            Util.ip.isValidIpRegex("123.1.257.1.").should.be.not.ok;
            Util.ip.isValidIpRegex("123.1.257.1").should.be.not.ok;
            Util.ip.isValidIpRegex("123.1.255.1").should.be.ok;
        });


    });

});
