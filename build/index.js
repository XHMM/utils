"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
function getType(val) {
    return Object.prototype.toString
        .call(val)
        .split(" ")[1]
        .slice(0, -1)
        .toLowerCase();
}
exports.getType = getType;
function assertType(receivedValue, expectedType) {
    if (getType(receivedValue) !== expectedType)
        throw new Error("\u53C2\u6570" + receivedValue + "\u7C7B\u578B\u4E0D\u7B26: expect " + expectedType + ", received " + getType(receivedValue));
}
exports.assertType = assertType;
function objectToQS(obj) {
    if (obj === undefined)
        return "";
    var str = Object.keys(obj).reduce(function (acc, cur) {
        var value = typeof obj[cur] === "string" ? obj[cur] : obj[cur].toString();
        acc += "&" + cur + "=" + encodeURIComponent(value);
        return acc;
    }, "");
    return str.slice(1);
}
exports.objectToQS = objectToQS;
function conditionalObjectMerge(target) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var obj = {};
    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
        var _b = args_1[_a], condition = _b[0], val = _b[1];
        assertType(val, 'object');
        if (condition)
            Object.assign(obj, val);
    }
    return Object.assign(target, obj);
}
exports.conditionalObjectMerge = conditionalObjectMerge;
function conditionalArrayMerge(target) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    for (var _a = 0, args_2 = args; _a < args_2.length; _a++) {
        var _b = args_2[_a], condition = _b[0], val = _b[1];
        if (condition)
            target.push(val);
    }
    return target;
}
exports.conditionalArrayMerge = conditionalArrayMerge;
function valueExistsInObject(obj) {
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    if (getType(obj) !== "object")
        throw new TypeError("the first parameter should be an object, received " + getType(obj));
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (values.includes(obj[key]))
                return true;
            if (getType(obj[key]) === "object")
                return valueExistsInObject.apply(void 0, __spreadArrays([obj[key]], values));
        }
    }
    return false;
}
exports.valueExistsInObject = valueExistsInObject;
function hasRepeat(arr) {
    return arr.filter(function (item, idx) { return arr.indexOf(item) !== idx; }).length !== 0;
}
exports.hasRepeat = hasRepeat;