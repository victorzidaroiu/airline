var flightParser = require('./flight-parser');
var cli = require('cli');
var fs = require('fs');
var debug = require('debug')('cli-parse');

var inputFile = cli.args[0];

if (inputFile === undefined)
	throw "Please specify an input file!";

var outputFile = cli.args[1] || inputFile + '.out';

fs.readFile(__dirname + '/' + inputFile, 'utf8', function(err, fileContents) {
	if (err)
		throw err;
	flightParser(fileContents.split('\n'), function(outputData){
		fs.writeFile(outputFile, outputData);
	});
});