/**
 * Created by fish on 16/10/23.
 */

import fs          from 'fs';
import {sign}      from 'jwt-then';

var cert = fs.readFileSync("rsa_private_key.pem");

const setLoginInfo = async (ctx, loginInfo, teacherInfo) => {
	"use strict";
	var age = 24 * 3600;
	teacherInfo = teacherInfo || {};
	loginInfo = loginInfo || {};
	var token = await sign({loginInfo: loginInfo, teacherInfo: teacherInfo}, cert, {algorithm: 'RS256', expiresIn: age});
	if (loginInfo.isLogin || teacherInfo.isLogin) {
		ctx.cookies.set('idToken', token, {maxAge: age * 1000, httpOnly: true});
	} else {
		ctx.cookies.set('idToken', '');
	}
};

export default setLoginInfo;
