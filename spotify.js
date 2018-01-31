const Spotify = require('node-spotify-api');

const getSpotify = ((config, title, limit) => {
  return new Promise((resolve, reject) => {
    const DEFAULT_TITLE = 'Ace of Base The Sign';

    var spotify = new Spotify(config);
    var params  = {type : 'track',
                   query: title === '' ? DEFAULT_TITLE : title,
                   limit: limit};

    spotify.search(params, (error, response) => {
      if (!error) {
        writeSpotify(response);
        resolve(response);
      }
      else {
        reject(error);
      }
    });
  });
});

const writeSpotify = (response => {
  var items = response.tracks.items;

  items.forEach(item => {
    console.log('\nArtist(s): ' + item.artists[0].name);
    console.log('Name: ' + item.name);
    console.log('Link: ' + item.external_urls.spotify);
    console.log('Album: ' + item.album.name + '\n');
  });
});

module.exports = {
  getSpotify
}