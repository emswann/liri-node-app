const Spotify = require('node-spotify-api');
const file    = require('./file.js');

const getSpotify = (config, title, limit, outfile) => {
  return new Promise((resolve, reject) => {
    const DEFAULT_TITLE = 'Ace of Base The Sign';

    var spotify = new Spotify(config);
    var params  = {type : 'track',
                   query: title === '' ? DEFAULT_TITLE : title,
                   limit: limit};

    spotify.search(params, (error, response) => {
      if (!error) {
        writeSpotify(response, outfile);
        resolve(response);
      }
      else {
        reject(error);
      }
    });
  });
};

async function writeSpotify(response, outfile) {
  try {
    var items  = response.tracks.items;
    var buffer = '';

    if (items.length) {
      items.forEach(item => {
        buffer += 'Artist(s): ' + item.artists[0].name + '\n';
        buffer += 'Name: ' + item.name + '\n';
        buffer += 'Link: ' + item.external_urls.spotify + '\n';
        buffer += 'Album: ' + item.album.name + '\n\n';
      });
    }
    else {
      buffer += 'No song found!\n\n';
    }

    console.log(buffer);
    await file.appendFile(outfile, buffer);
  }
  catch(error) {
    console.log(error);
  }
};

module.exports = {
  getSpotify
}