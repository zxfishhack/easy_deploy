/**
 * Created by fish on 2016/12/18.
 */

import sa from 'superagent';

let usernames = {};

export default {
	getUsername(uid) {
		"use strict";
		if (usernames[uid]) {
			return new Promise(resolve => {
				resolve(usernames[uid]);
			});
		}
		usernames[uid] = new Promise((resolve) => {
			sa.get(`/action/teacher/getUsername/${uid}`).then(res => {
				if (res.body.result === 0) {
					usernames[uid] = res.body.data;
					if (!usernames[uid]) {
						usernames[uid] = '未知用户';
					}
					resolve(usernames[uid]);
				}
			});
		});
		return usernames[uid];
	}
};
