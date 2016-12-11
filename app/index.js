import cli from 'cli';
import fs from 'fs';
import bluebird from 'bluebird';
import flightParser from './flight-parser';

const inputFile = cli.args[0];
const readFile = bluebird.promisify(fs.readFile);
const writeFile = bluebird.promisify(fs.writeFile);

if (inputFile === undefined) {
  throw new Error('Please specify an input file!');
}

const outputFile = `${__dirname}/../data/${inputFile}.out`;

readFile(`${__dirname}/../data/${inputFile}`, 'utf8').then((fileContents) => {
  const instructions = fileContents.split('\n');
  writeFile(outputFile, flightParser(instructions), 'utf8')
    .then(() => {
      console.log(`${outputFile} was written.`);
    })
    .catch((e) => {
      console.log(e);
    });
});
