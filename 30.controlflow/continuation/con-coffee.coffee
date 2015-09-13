fs = require 'fs'

fs.readdir __dirname,cont err,files
console.log files