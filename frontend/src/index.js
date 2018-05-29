import 'babel-polyfill';
import React      from 'react';
import ReactDOM   from 'react-dom';
import FastClick  from 'fastclick';
import App        from './components/App';
import url        from 'url';
import history    from './core/history';
import pages      from './pages';
import router     from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import NotFound   from './pages/notFound';
const safeInit    = require('./core/common').safeInit;

const names = {
    "/" : "Dashboard",
    "/hosts": "Hosts",
    "/pkgs": "Packages",
    "/deploy": "Deploy",
}

const onLocationChange = async location => {
    let u = await url.parse(location.search, true);
    let {component, _} = await router.resolve({
        pathname: location.pathname,
        fetchQuery: location.search,
    });
    let pageName = names[location.pathname];
    ReactDOM.render(<App pageName={pageName ? pageName : "404"} children={component} />, document.getElementById("app"));	
};

function run() {
	'use strict';
	FastClick.attach(document.body);
	history.listen(onLocationChange);
	onLocationChange(history.location);
}

safeInit(run);

export default onLocationChange;