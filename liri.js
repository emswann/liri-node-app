const env     = require('dotenv').config();

const keys    = require('./keys.js');
const twitter = require('./twitter.js');
const spotify = require('./spotify.js');
const omdb    = require('./omdb.js');
const file    = require('./file.js');

const getSearchItem = args => {
  const START_INDEX = 3;
  var searchItem = '';

  for (let i = START_INDEX; i < process.argv.length; i++) {
    searchItem += process.argv[i] + ' ';
  }
  searchItem = searchItem.substr(0, searchItem.length - 1);

  return searchItem;
};

async function processOption(option, searchItem) {
  const TWITTER_LIMIT = 20;
  const SPOTIFY_LIMIT = 1;
  const OMDB_TYPE     = 'movie';
  const RANDOM_FILE   = './random.txt';
  const OUTPUT_FILE   = './log.txt';

  var getRandomOption = data => {
    var lines = data.split('\n');
    var randomInt = Math.floor(Math.random() * lines.length);
    var splitLine = lines[randomInt].split(',');

    return ({option:     splitLine[0].trim(),
             searchItem: splitLine[1] ? splitLine[1].trim() : undefined});
  };

  try {
    var data;

    switch (option) {
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

        var random = getRandomOption(data);
        processOption(random.option, random.searchItem); 
        break;

      default:
        throw('Invalid option - ' + option);
    }
  }
  catch(error) {
    console.log('Processing error: ' + error  + '!');
  }
};

function main() {
  var args   = process.argv;
  var option = args[2];
  var searchItem;

  try {
    searchItem = getSearchItem(args);
    processOption(option, searchItem);
  }
  catch(error) {
    console.log('ERROR: ', error);
  }
}

main();