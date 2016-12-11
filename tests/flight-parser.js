import fs from 'fs';
import bluebird from 'bluebird';
import { assert } from 'chai';
import path from 'path';
import flightParser from '../app/flight-parser';

const readFile = bluebird.promisify(fs.readFile);

const inputFile1 = 'test-data/flight1.in';
const inputFile2 = 'test-data/flight2.in';
const expectedOutput1 = '8 4 1 3 9 40 800 1200 1010 TRUE';
const expectedOutput2 = '6 5 1 0 6 0 600 900 750 FALSE';

describe('Flight parser', () => {
  it('should corrctly parse instructions from flight 1',(done) => {
    readFile(path.join(__dirname, '/', inputFile1), 'utf8').then((fileContents) => {
      const instructions = fileContents.split('\n');
      assert.equal(flightParser(instructions), expectedOutput1);
      done();
    });
  });

  it('should corrctly parse instructions from flight 2',(done) => {
    readFile(path.join(__dirname, '/', inputFile2), 'utf8').then((fileContents) => {
      const instructions = fileContents.split('\n');
      assert.equal(flightParser(instructions), expectedOutput2);
      done();
    });
  });
});
