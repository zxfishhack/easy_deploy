const path = require('path');
const config = {
    '/vm/nss': 'nss.json',
    '/vm/ns/development': 'development-ns.json',
    '/vm/ns/production': 'production-ns.json',
    '*': '404.json',
}
 
for (let item in config) {
    if (config.hasOwnProperty(item)) config[item] = {path: path.resolve(__dirname, config[item])};
}
module.exports = config;