/**
 * Created by fish on 16/10/21.
 */

import fetch, { Request, Headers, Response } from 'node-fetch';
import { host } from '../../config';

function localUrl(url) {
	if (url.startsWith('//')) {
		return `https:${url}`;
	}
	
	if (url.startsWith('http')) {
		return url;
	}
	
	return `http://${host}${url}`;
}

function localFetch(url, options) {
	return fetch(localUrl(url), options);
}

export { localFetch as default, Request, Headers, Response };
