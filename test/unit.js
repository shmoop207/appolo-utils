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
});
//# sourceMappingURL=unit.js.map