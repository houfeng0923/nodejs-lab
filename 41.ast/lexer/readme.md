

表达式解析步骤图：http://en.wikipedia.org/wiki/Parsing#Overview_of_process


ast ： 抽象语法树

产生式：优先级
ArgumentList → Expression
ArgumentList → Expression ',' ArgumentList
FunctionCall  →  Identifier '(' ')'
FunctionCall  →  Identifier '(' ArgumentList ')'
Primary → FunctionCall
Primary → Identifier
Primary → Number
Primary → '(' Assignment ')'
Unary → Primary
Unary → '-' Unary
Multiplicative → Unary
Multiplicative → Multiplicative '*' Unary
Multiplicative → Multiplicative '/' Unary
Additive → Multiplicative
Additive → Additive '+' Multiplicative
Additive → Additive '-' Multiplicative
Assignment → Additive
Assignment → Identifier '=' Assignment

references
----


 - https://gitorious.org/ofi-labs/tapdigit/source/df67ccca7f6343c33550b26c95aef6204eb15c94:TapDigit.js
 - [抽象语法树在javascript中的应用,基于uglifyjs](http://tech.meituan.com/abstract-syntax-tree.html)
 - http://lisperator.net/pltut/dream

