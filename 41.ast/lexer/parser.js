var Lexer = require('./lexer.js');

function Parser (lexer) {
  this.lexer = lexer;
}

Parser.prototype = {
  // Expression ::= Assignment
  parse:function (){
    return this._parseAssignment();
  },
  _matchOp:function (token,operator){
    return token !== undefined &&
           token.type === 'Operator' &&
           token.value === operator;
  },
  // Assignment ::= Identifier '=' Assignment |
  //                Additive
  _parseAssignment:function (){
    var lexer = this.lexer;
    var expr = this._parseAdditive();
    if(expr !== undefined && expr.Identifier) {
      var token = lexer.peek();
      if(this._matchOp(token,'=')){
        lexer.next();
        return {
          'Assignment' : {
            name : expr,
            value : this._parseAssignment()
          }
        };
      }
    }
    return expr;
  },
  // Additive ::= Multiplicative |
  //              Additive '+' Multiplicative |
  //              Additive '-' Multiplicative
  _parseAdditive:function (){
    var left, right, token;
    var lexer = this.lexer;

    left = this._parseMultiplicative();
    token = lexer.peek();

    if(this._matchOp(token,'+') || this._matchOp(token,'-')) {
      token = lexer.next();
      right = this._parseAdditive();
      return {
        'Binary' : {
          operator : token.value,
          left : left,
          right : right
        }
      };
    }
    return left;
  },

    // Multiplicative ::= Unary |
    //                    Multiplicative '*' Unary |
    //                    Multiplicative '/' Unary
  _parseMultiplicative:function (){
    var left, right ,token;
    var lexer = this.lexer;

    left = this._parseUnary();
    token = lexer.peek();

    if(this._matchOp(token,'*') || this._matchOp(token,'/')){
      token = lexer.next();
      right = this._parseUnary();
      return {
        'Binary':{
          operator : token.value,
          left : left,
          right : right
        }
      };
    }
    return left;
  },


    // Unary ::= Primary |
    //           '-' Unary
  _parseUnary:function (){
    var token, expr;
    var lexer = this.lexer;

    token = lexer.peek();
    if(this._matchOp(token,'+') || this._matchOp(token,'-')) {
      token = lexer.next();
      expr = this._parseUnary();
      return {
        'Unary':{
          operator : token.value,
          expression: expr
        }
      };
    }
    return this._parsePrimary();
  },

    // Primary ::= Identifier |
    //             Number |
    //             '(' Assignment ')' |
    //             FunctionCall
  _parsePrimary:function (){
    var token, expr;
    var lexer = this.lexer;

    token = lexer.peek();
    if (typeof token === 'undefined') {
        throw new SyntaxError('Unexpected termination of expression');
    }

    if(token.type == 'Identifier') {
      token = lexer.next();
      if(this._matchOp(lexer.peek(),'(')) {
        return this._parseFunctionCall(token.value);
      }else{
        return {
          'Identifier': token.value
        };
      }
    }

    if(token.type == 'Number') {
      token = lexer.next();
      return {
        'Number': token.value
      };
    }

    if(this._matchOp(token,'(')) {
      lexer.next();
      expr = this._parseAssignment();
      token = lexer.next();
      if(!this._matchOp(token,')')) {
        throw new SyntaxError('Expecting )');
      }
      return {
        'Expression': expr
      };
    }

    throw new SyntaxError('Parse error, can not process token ' + token.value);
  },


    // FunctionCall ::= Identifier '(' ')' ||
    //                  Identifier '(' ArgumentList ')'
  _parseFunctionCall:function (name){
    var token, args=[];
    var lexer = this.lexer;

    token = lexer.next();
    if (!this._matchOp(token, '(')) {
        throw new SyntaxError('Expecting ( in a function call "' + name + '"');
    }
    token = lexer.peek();
    if(!this._matchOp(token,')')) {
      args = this._parseArgumentList();
    }
    token = lexer.next();
    if(!this._matchOp(token,')')){
      throw new SyntaxError('Expecting ) in a function call "' + name + '"');
    }

    return {
      'FunctionCall': {
        name: name,
        args : args
      }
    };

  },

    // ArgumentList := Expression |
    //                 Expression ',' ArgumentList
  _parseArgumentList:function (){
    var token, expr, args = [];
    var lexer = this.lexer;

    while (true) {
        expr = this.parseExpression();
        if (typeof expr === 'undefined') {
            // TODO maybe throw exception?
            break;
        }
        args.push(expr);
        token = lexer.peek();
        if (!matchOp(token, ',')) {
            break;
        }
        lexer.next();
    }

    return args;
  }



};

Parser.parse = function (expression){
  var lexer = new Lexer(expression);
  var parser = new Parser(lexer);
  var expr = parser.parse();

  token = lexer.next();
  if (typeof token !== 'undefined') {
      throw new SyntaxError('Unexpected token ' + token.value);
  }

  return {
      'Expression': expr
  };
}


module.exports = Parser;


