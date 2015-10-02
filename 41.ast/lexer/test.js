var Lexer = require('./lexer.js');
var Parser = require('./parser.js');

// var tokens = Lexer.analyze('10.22+10');
// console.log(tokens);

var syntax = Parser.parse('a=3+5+(1+2)');
function stringify(object, key, depth) {
    var indent = '',
        str = '',
        value = object[key],
        i,
        len;

    while (indent.length < depth * 3) {
        indent += ' ';
    }

    switch (typeof value) {
    case 'string':
        str = value;
        break;
    case 'number':
    case 'boolean':
    case 'null':
        str = String(value);
        break;
    case 'object':
        for (i in value) {
            if (value.hasOwnProperty(i)) {
                str += ('\n' + stringify(value, i, depth + 1));
            }
        }
        break;
    }

    return indent + ' ' + key + ': ' + str;
}

console.log(stringify(syntax,'Expression',0) );




