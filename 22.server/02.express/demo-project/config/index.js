/*!
 * # config local
 *
 * 本地环境配置文件
 *
 * @author yanmu.wj@taobao.com
 * @date 2014-01-17
 */

/*!*/
var path = require("path");

module.exports = {
    appname: "demo",
    env: "dev",
    port: 8888,
    mongo: {
        uri: 'mongodb://localhost/nodetest'
    },
    seedDB: true,
    cookieSecret: "i'm secret",
    csrfToken: "csrf",
    viewCache: false,
    publicDir: path.join(__dirname, "../public"),
    debug: true
};
