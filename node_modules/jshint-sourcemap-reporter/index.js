'use strict';
var chalk = require('chalk');
var logSymbols = require('log-symbols');
var fs = require('fs');
var path = require('path');
var SourceMapConsumer = require('source-map').SourceMapConsumer;

function pluralize(str, count) {
	return str + (count === 1 ? '' : 's');
}

// based on https://github.com/evanw/node-source-map-support
var cache = {};
function mapSourcePosition(position, sourceRoot) {
	sourceRoot = typeof sourceRoot === 'undefined' ? undefined : sourceRoot;

	var base64 = false;
	var dataUrlPrefix = "data:application/json;base64,";
	var sourceMap = cache[position.source];
	if (!sourceMap && fs.existsSync(position.source)) {
		// Get the URL of the source map
		var fileData = fs.readFileSync(position.source, 'utf8');
		var match = /\/\/[#@]\s*sourceMappingURL=(.*)\s*$/m.exec(fileData);
		if (!match) {
			return position;
		}
		var sourceMappingURL = match[1];

		// Read the contents of the source map
		var sourceMapData;
		if (sourceMappingURL.slice(0, dataUrlPrefix.length).toLowerCase() === dataUrlPrefix) {
			// Support source map URL as a data url
			sourceMapData = new Buffer(sourceMappingURL.slice(dataUrlPrefix.length), "base64").toString();
			base64 = true;
		} else {
			// Support source map URLs relative to the source URL
			var dir = path.dirname(position.source);
			sourceMappingURL = path.resolve(dir, sourceMappingURL);

			if (fs.existsSync(sourceMappingURL)) {
				sourceMapData = fs.readFileSync(sourceMappingURL, 'utf8');
			}
		}
		sourceMap = {
			url: sourceMappingURL,
			base64: base64
		};
		if (sourceMapData) {
			sourceMapData = JSON.parse(sourceMapData);
			if (sourceRoot) sourceMapData.sourceRoot = sourceRoot;
			sourceMap.map = new SourceMapConsumer(Object.assign(sourceMapData));
		}
		cache[position.source] = sourceMap;
	}

	// Resolve the source URL relative to the URL of the source map
	if (sourceMap && sourceMap.map) {
		var originalPosition = sourceMap.map.originalPositionFor(position);

		// Only return the original position if a matching line was found. If no
		// matching line is found then we return position instead, which will cause
		// the stack trace to print the path and line for the compiled file. It is
		// better to give a precise location in the compiled file than a vague
		// location in the original file.
		if (originalPosition.source !== null) {
			if (sourceMap.base64) {
				originalPosition.source = dataUrlPrefix + originalPosition.source;
			}
			else {
				originalPosition.source = path.resolve(path.dirname(sourceMap.url), originalPosition.source);
			}
			return originalPosition;
		}
	}

	return position;
}

module.exports = {
	reporter: function(result, config) {
		var errorCount = 0, warningCount = 0;
		var output = result.map(function(el) {
			var pos = mapSourcePosition({
				source: el.file,
				line: el.error.line,
				column: el.error.character
			}, config && config.sourceRoot ? config.sourceRoot : undefined);

			var styler;
			if (el.error.code === 'E') {
				styler = chalk.red;
				errorCount++;
			} else if (el.error.code === 'W') {
				styler.chalk.yellow;
				warningCount++;
			}

			var clickableLink = pos.source + "(" + pos.line + "," + pos.column + ")";
			return clickableLink + ": " + styler(el.error.reason);
		});


		if (errorCount === 0 && warningCount === 0) {
			output.push(logSymbols.success + ' No problems');
		} else {
			if (errorCount > 0) {
				output.push('  ' + logSymbols.error + '  ' + errorCount + pluralize(' error', errorCount) + (warningCount > 0 ? '\n' : ''));
			}

			if (warningCount > 0) {
				output.push('  ' + logSymbols.warning + '  ' + warningCount + pluralize(' warning', total));
			}
		}

		console.log(output.join("\n"));
	}
};
