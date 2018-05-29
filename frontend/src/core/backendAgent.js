/**
 * Created by fish on 16/10/26.
 */

var sa = require('superagent');
import jsonfile from 'jsonfile';

var env    = process.env.NODE_ENV || 'development';
var DEBUG  = env === 'development';
var config = jsonfile.readFileSync('config/config.json')[env].backend;
var prefix = config.host;
if (prefix[prefix.length - 1] === '/') {
	prefix = prefix.substr(0, prefix.length - 1);
}

const post = pathname => {
	"use strict";
	const uri = prefix + pathname;
	if (DEBUG) console.log('backendAgent.post:', uri);
	return sa.post(uri);
};

const get = pathname => {
	"use strict";
	const uri = prefix + pathname;
	if (DEBUG) console.log('backendAgent.get :', uri);
	return sa.get(uri);
};

export default {post: post, get: get};
