import 'babel-polyfill';
import React      from 'react';
import ReactDOM   from 'react-dom';
import FastClick  from 'fastclick';
import App        from './components/App';
import url        from 'url';
import history    from './core/history';
import pages      from './pages';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import NotFound   from './pages/notFound';
const safeInit    = require('./core/common').safeInit;

const onLocationChange = async location => {
    console.log(location);
    let u = await url.parse(location.search, true);
    console.log(u);
    //let component = await resolve(pages, {path: location.pathname, query: u.query});
    ReactDOM.render(<App pageName="Dashboard" children={<NotFound/>} />, document.getElementById("app"));	
};

function run() {
	'use strict';
	FastClick.attach(document.body);
	history.listen(onLocationChange);
	onLocationChange(history.location);
}

safeInit(run);

export default onLocationChange;