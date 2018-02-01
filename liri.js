/**
 * @file Language Interpretation and Recognition Interface main program. Accepts 4 commands: my-tweets, spotify-this-song, movie-this, do-what-it-says. 
 * @author Elaina Swann
 * @version 1.0 
*/
const env     = require('dotenv').config();

const keys    = require('./keys.js');
const twitter = require('./twitter.js');
const spotify = require('./spotify.js');
const omdb    = require('./omdb.js');
const file    = require('./file.js');

/** 
 * @function getSearchItem
 * @description Combines argument list into one search term. Avoids user from having to enclose the search term in quotes.
 * @param {array} args Argument list - includes node and .js file name.
*/
const getSearchItem = args => {
  const START_INDEX = 3;
  var searchItem = '';

  for (let i = START_INDEX; i < process.argv.length; i++) {
    searchItem += process.argv[i] + ' ';
  }
  searchItem = searchItem.substr(0, searchItem.length - 1);

  return searchItem;
};

/** 
 * @async
 * @function processCmd
 * @description Process command and control subsequent API call/interface.
 * @param {string} cmd Command to determine which search/API call.
 * @param {string} searchItem Search term for API calls.
*/
async function processCmd(cmd, searchItem) {
  const TWITTER_LIMIT = 20;
  const SPOTIFY_LIMIT = 1;
  const OMDB_TYPE     = 'movie';
  const RANDOM_FILE   = './random.txt';
  const OUTPUT_FILE   = './log.txt';

  /** 
   * @function getRandomCmd 
   * @description Parses random file contents, selects one line randomly and returns command and search term to execute.
   * @param {string} data - Random file contents.
   * @returns {Object} cmd {string}: LIRI command.
   *                   searchItem {string|undefined}: Search term or undefined 
   *                     if search term is not required.
  */
  var getRandomCmd = data => {
    var lines = data.split('\n');
    var randomInt = Math.floor(Math.random() * lines.length);
    var splitLine = lines[randomInt].split(',');

    return ({cmd:        splitLine[0].trim(),
             searchItem: splitLine[1] ? splitLine[1].trim() : undefined});
  };

  try {
    var data = 'Command: ' + cmd + ', SearchItem: ' + searchItem + '\n\n' ;

    await file.appendFile(OUTPUT_FILE, data);

    switch (cmd) {
      case 'my-tweets':
        data = await twitter.getTwitter(keys.twitter, 
                                        TWITTER_LIMIT,
                                        OUTPUT_FILE);
        break;

      case 'spotify-this-song':
        data = await spotify.getSpotify(keys.spotify, 
                                        searchItem,                         SPOTIFY_LIMIT,
                                        OUTPUT_FILE);
        break;

      case 'movie-this':
        data = await omdb.getOMDB(keys.omdb,
                                  searchItem, 
                                  OMDB_TYPE, 
                                  OUTPUT_FILE);
        break;

      case 'do-what-it-says':
        data = await file.readFile(RANDOM_FILE);

        var random = getRandomCmd(data);
        processCmd(random.option, random.searchItem); 
        break;

      default:
        throw('Invalid command- ' + cmd);
    }
  }
  catch(error) {
    console.log('Processing error: ' + error  + '!');
  }
};

/** 
 * @function main
 * @description Main program for LIRI application.
*/
function main() {
  var args = process.argv;
  var cmd  = args[2];
  var searchItem;

  try {
    searchItem = getSearchItem(args);
    processCmd(cmd, searchItem);
  }
  catch(error) {
    console.log('ERROR: ', error);
  }
}

main();