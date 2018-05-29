/**
 * Created by fish on 16/10/24.
 */

module.exports.isElearning = path => Boolean(/^\/elearning/.exec(path));
module.exports.safeInit = func => {
	"use strict";
	if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
		func();
	} else {
		document.addEventListener('DOMContentLoaded', func, false);
	}
};

module.exports.initModalSpinner = () => {
	"use strict";
	$.fn.modal.defaults.spinner = $.fn.modalmanager.defaults.spinner =
		'<div class="loading-spinner" style="width: 200px; margin-left: -100px;">' +
		'<div class="progress progress-striped active">' +
		'<div class="progress-bar" style="width: 100%;"></div>' +
		'</div>' +
		'</div>';
};

module.exports.getFilenameExt = filename => {
	"use strict";
	let parts = filename.split('.');
	if (parts.length === 1) {
		return 'bin';
	}
	return parts[parts.length - 1].toLowerCase();
};
