;(function(){

var _  	   = require('underscore');
var _s 	   = require("underscore.string");
var text   = require('cache-text');
var __locale = {};

var Translate = function(msg) {
	var args   = [].slice.call(arguments, 1);

	if ( __locale[msg] ){
		msg = __locale[msg];
	}else{
		if (console.warn ) console.warn( msg );
	}

	if ( args.length > 0 ){
		msg = _s.sprintf(msg, args);
	}

	return msg;
}

Translate.setLocale = function setLocale( file ){
	if ( file ) 
		__locale = text( file );
	else
		__locale = text( "translate.json" );
	return this;
}

Translate.middleware = function() {
	var self = this;
	self.setLocale();
	return function (shared, next) {
		shared.translate = self;
		next();
	}
}

// AMD / RequireJS
if (typeof define !== 'undefined' && define.amd) {
    define([], function () {
        return Translate;
    });
}
// Node.js
else if (typeof module !== 'undefined' && module.exports) {
    module.exports = Translate;
}
// included directly via <script> tag
else {
    window.Translate = Translate;
}

})();