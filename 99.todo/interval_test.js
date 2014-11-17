var sum = 0, count = 0;
function test() {
  var now = Date.now();
  setTimeout(function () {
    var diff = Date.now() - now;
    sum += diff;
    count++;
    test();
  });
}

test();



setTimeout(function (){
console.log(sum/count);
}, 20000)

// 5.570632488158261  (node 0.11.12)