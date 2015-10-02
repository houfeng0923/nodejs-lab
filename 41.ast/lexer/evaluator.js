var Lexer = require('./lexer.js');
var Parser = require('./parser.js');

var Context = function () {
    var Constants, Functions;

    Constants = {
        pi: 3.1415926535897932384,
        phi: 1.6180339887498948482
    };

    Functions = {
        abs: Math.abs,
        acos: Math.acos,
        asin: Math.asin,
        atan: Math.atan,
        ceil: Math.ceil,
        cos: Math.cos,
        exp: Math.exp,
        floor: Math.floor,
        ln: Math.ln,
        random: Math.random,
        sin: Math.sin,
        sqrt: Math.sqrt,
        tan: Math.tan
    };

    return {
        Constants: Constants,
        Functions: Functions
    };
};


function Evaluator (ctx) {

}


module.exports =  Evaluator;