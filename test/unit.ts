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

            Util.arrays.remove(arr,"a");

            arr.length.should.be.eq(1);
            arr[0].should.be.eq("b");
        });
    })


});
