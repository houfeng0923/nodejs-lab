

module.exports = {
    mkdir: function(dirs){
        dirs = [].concat(dirs);
        return dirs.reduce(function(promise, dir){
            return promise.then(function(){
                return new Promise(function(resolve, reject){
                    mkdirp(dir, function(err){
                        if(err) { return reject(err); }
                        resolve();
                    });
                });
            });
        }, Promise.resolve(''));
    }
};