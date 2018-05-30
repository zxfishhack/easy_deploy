/**
 * Created by fish on 16/10/26.
 */

var sa = require('superagent');

var env    = process.env.NODE_ENV || 'development';
var DEBUG  = env === 'development';
const prefix = '/vm';

sa.parse['text/plain'] = function(str) {
	try{
		return JSON.parse(str);
	}catch(e) {
		return str;
	}
}

const post = pathname => {
	"use strict";
	const uri = prefix + pathname;
	if (DEBUG) console.log('backendAgent.post:', uri);
	let req = sa.post(uri).accept('json');
	return req;
};

const get = pathname => {
	"use strict";
	const uri = prefix + pathname;
	if (DEBUG) console.log('backendAgent.get :', uri);
	let req = sa.get(uri).accept('json');
	return req;
};

export default {post: post, get: get};
