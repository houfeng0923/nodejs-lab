const https = require('https');

https.get('https://localhost:4200/advance/', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    // process.stdout.write(d);
  });

}).on('error', (e) => {
  console.error(e);
  // Error: unable to verify the first certificate
});

// if  localhost:4200/advance/ 自签证书:

// http --verify=false https://localhost:4200/advance/
// curl --insecure https://localhost:4200/advance/
