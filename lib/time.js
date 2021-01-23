"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = void 0;
const index_1 = require("../index");
class Time {
    static currentTimeInterval(interval) {
        return Math.floor(Date.now() / interval) * interval;
    }
    static unix() {
        return Math.floor(Date.now() / 1000);
    }
    static timeMili(time) {
        let t = process.hrtime(time);
        return (t[0] * 1e3) + (t[1] / 1e6);
    }
    static timeMicro(time) {
        let t = process.hrtime(time);
        return t[0] * 1000000 + t[1] / 1000;
    }
    static milisecPretty(ms) {
        let msAbs = Math.abs(ms);
        if (msAbs >= Time.Day) {
            return Math.round(ms / Time.Day) + 'd';
        }
        if (msAbs >= Time.Hour) {
            return Math.round(ms / Time.Hour) + 'h';
        }
        if (msAbs >= Time.Minute) {
            return Math.round(ms / Time.Minute) + 'm';
        }
        if (msAbs >= Time.Second) {
            return Math.round(ms / Time.Second) + 's';
        }
        return ms + 'ms';
    }
    static durationIntToString(durationSeconds) {
        return new Date(durationSeconds * 1000).toISOString().substr(11, 8);
    }
    static daysInCurrentMonth() {
        const d = new Date();
        d.setDate(0); // goes back to end of previous month
        return d.getDate();
    }
    static calcBackOff(retry, params) {
        let delay = 0;
        if (params.linear) {
            delay += params.linear * retry;
        }
        if (params.exponential) {
            delay += Math.pow(params.exponential, retry);
        }
        if (params.random) {
            delay += index_1.Numbers.random(0, params.random);
        }
        delay += (params.min || 0);
        if (params.max) {
            delay = Math.min(params.max, delay);
        }
        return Math.fround(delay);
    }
}
exports.Time = Time;
Time.Second = 1000;
Time.Minute = Time.Second * 60;
Time.Hour = Time.Minute * 60;
Time.Day = Time.Hour * 24;
Time.Week = Time.Day * 7;
Time.Month = Time.Week * 4;
Time.Year = Time.Day * 365.25;
//# sourceMappingURL=time.js.map