// yield命令 后面如果是 generator object。
// 需要在yield命令后面加上星号，表明它返回的是一个遍历器。这被称为yield*语句。

function* gen1(){
  yield 'hello';
  yield 'world';
}


// 如果yield*后面跟着一个数组，就表示该数组会返回一个遍历器，因此就会遍历数组成员。
function* gen(){
  yield* gen1();
  yield 'over';
  // yield* [1,2,3] //暂时不支持
}

// console.log(gen().next()); // { value:"hello", done:false }
for(var i of gen()){
  console.log(i);
}


// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
  if (t) {
    yield* inorder(t.left);
    yield t.label;
    yield* inorder(t.right);
  }
}

// 下面生成二叉树
function make(array) {
  // 判断是否为叶节点
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
}
var tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

// 遍历二叉树
var result = [];
for (var node of inorder(tree)) {
  result.push(node);
}
console.log(result);