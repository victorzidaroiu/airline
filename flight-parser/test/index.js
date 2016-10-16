var debug = require('debug')('test');
var flightParser = require('../index.js');
var fs = require('fs');

var inputFile1 = 'test-data/flight1.in';
var inputFile2 = 'test-data/flight2.in';
var expectedOutput1 = "8 4 1 3 9 40 800 1200 1010 TRUE";
var expectedOutput2 = "6 5 1 0 6 0 600 900 750 FALSE";

describe('Flight parser', function() {
	this.timeout(5000);
	it('should take inputFile1 as an input and output ' + expectedOutput1, function(done) {
		fs.readFile(__dirname + '/' + inputFile1, 'utf8', function(err, fileContents) {
			if (err)
				throw err;
			flightParser(fileContents.split('\n'), function(outputData){
				debug(outputData);
				if (outputData === expectedOutput1)
					done();
			});
		});
	});

	it('should take inputFile2 as an input and output ' + expectedOutput2, function(done) {
		fs.readFile(__dirname + '/' + inputFile2, 'utf8', function(err, fileContents) {
			if (err)
				throw err;
			flightParser(fileContents.split('\n'), function(outputData){
				debug(outputData);
				if (outputData === expectedOutput2)
					done();
			});
		});
	});
});