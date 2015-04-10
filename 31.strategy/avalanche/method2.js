// use promise

function avalanche (cachePrefix,fn) {

}







// service

getCityList = avalanche('citylist',function (province){
  return  db.select('sql...')
            .then(function (results){
              var list = results;
              // preprocess data
              return list;
            }).catch(function (err){
              // todo
            })
});


// controller

cityService.getCityList('shandong',function (err,list){
  console.log(list);
})