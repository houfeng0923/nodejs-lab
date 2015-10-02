
// --------------------------

var util = {
    isWhiteSpace: function (ch){
        return (ch === ' ') || (ch === '\u0009') || (ch === '\u00A0');
    },
    isLetter: function (ch){
        return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
    },
    isDecimalDigit:function (ch){
        return (ch >= '0' && ch <= '9');
    },
    isIdentifierStart:function (ch){
        return ch === '_' || this.isLetter(ch);
    },
    isIdentifierPart:function (ch){
        return this.isIdentifierStart(ch) || this.isDecimalDigit(ch);
    }
};


function Lexer(exp) {
    this.exp = exp;
    this._reset();
}
Lexer.prototype = {
    next:function (){
        var token;
        this._skipSpace();
        if(this.index >= this.length) return;

        token = this._getToken();
        return token;
    },
    peek:function (){
        var idx = this.index, token ;
        try {
            token = this.next();
        }catch(e){
            token = undefined;
        }
        this.index = idx;
        return token;
    },
    // private methods
    _reset:function (){
        this.index = 0;
        this.length = this.exp.length;
    },
    _skipSpace:function (){
        var index = this.index,
            length = this.length ;
        var ch ;
        while(index < length) {
            ch = this._peekNextChar();
            if(!util.isWhiteSpace(ch)) break;
            this._getNextChar();
        }
    },
    _getToken:function (){
        var token = this._scanNumber();

        if(!token){
            token = this._scanOperator();
        }
        if(!token){
            token = this._scanIdentifier();
        }
        return token;
    },
    _peekNextChar:function (){
        return this.exp.charAt(this.index);
    },
    _getNextChar:function (){
        var ch = this.exp.charAt(this.index);
        if(ch) this.index++;
        return ch;
    },
    // 10.0000  4.3E+1  .10
    _scanNumber:function (){
        var start = this.index,
            peekChar = null,
            number = '' ;

        peekChar = this._peekNextChar();
        if(!util.isDecimalDigit(peekChar) && peekChar !== '.') {
            return;
        }

        if(peekChar !== '.'){
            number += this._getNextChar();
            number += this._getNextDigitChars();
        }

        peekChar = this._peekNextChar();
        if(peekChar === '.'){
            number += this._getNextChar();
            number += this._getNextDigitChars();
        }

        peekChar = this._peekNextChar();
        if(peekChar === 'e' || peekChar === 'E') {
            number += this._getNextChar();
            peekChar = this._peekNextChar();
            if(peekChar == '+' || peekChar == '-' || util.isDecimalDigit(peekChar)) {
                number += this._getNextChar();
                number += this._getNextDigitChars();

            }else{
                var ch = 'character ' + peekChar;
                if (index >= length) {
                    ch = '<end>';
                }
                throw new SyntaxError('Unexpected ' + ch + ' after the exponent sign');
            }
        }

        if(number === '.') {
            throw new SyntaxError('Expecting decimal digits after the dot sign');
        }

        return {
            type: 'Number',
            value: number,
            start: start,
            end: this.index-1
        };

    },
    _getNextDigitChars:function (){
        var peekChar, number = '';
        while(true) {
            peekChar = this._peekNextChar();
            if(!util.isDecimalDigit(peekChar)) break;
            number += this._getNextChar();
        }
        return number;
    },

    _scanOperator:function (){
        var start = this.index,
            peekChar = this._peekNextChar(),
            operator = '';
        if('+-*/()^%=;,'.indexOf(peekChar) >= 0) {
            operator = this._getNextChar();
            return {
                type: 'Operator',
                value: operator,
                start: start,
                index: this.index
            };
        }
    },

    // _sdfdsf , _sfd12 , sfds_sdfs12
    _scanIdentifier:function (){
        var start = this.index,
            peekChar = null,
            indentifier = '';

        peekChar = this._peekNextChar();

        if(!util.isIdentifierStart(peekChar)){
            return;
        }
        indentifier += this._getNextChar();
        while(true){
            peekChar = this._peekNextChar();
            if(!util.isIdentifierPart(peekChar)) break;
            indentifier += this._getNextChar();
        }

        return {
            type: 'Identifier',
            value: indentifier,
            start: start,
            index: this.index
        };


    }

};

Lexer.analyze = function (exp){
    var lexer = new Lexer(exp);
    var tokens = [], token ;
    try{
        while(true){
            token = lexer.next();
            if(token==undefined) break;
            tokens.push(token);
        }
    }catch(e){
        console.log(e);
    }
    return tokens;
}



module.exports = Lexer;
