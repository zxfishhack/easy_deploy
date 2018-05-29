import React      from 'react';
import {NotFound} from './notFound';

export default {
	path: '/',
	children: [
		NotFound
	],
	async action(ctx) {
		"use strict";
		let route;
		do {
			route = await ctx.next();
		} while (!route);
		return route;
	}
};
