const request = require('request');
const DEFAULT_TITLE = 'Mr. Nobody';

const getOMDB = (config, title, type) => {
  return new Promise((resolve, reject) => {
    const PATH = 'http://www.omdbapi.com/';

    var options = {
      url: PATH,
      qs: {apikey: config.api_key,
           t:      title === '' ? DEFAULT_TITLE : title,
           type:   type}
    }

    request.get(options, (error, response, body) => {
      if (!error && (response.statusCode === 200)) {
        var parsedBody = JSON.parse(body);

        writeOMDB(parsedBody);
        resolve(parsedBody);
      }
      else {
        reject(error);
      }
    });
  });  
};

const writeOMDB = response => {
  const IMDB_INDEX = 0;
  const ROTTEN_TOMATO_INDEX = 1;

  /* Create both console.log and file output versions. */
  if (response.Error) {
    console.log(response.Error);
  }
  else {
    console.log('Title: ' + response.Title);
    console.log('Year: ' + response.Year);
    console.log('IMDB Rating: ' + response.Ratings[IMDB_INDEX].Value);
    console.log('Rotten Tomatoes Rating: ' 
      + response.Ratings[ROTTEN_TOMATO_INDEX].Value);
    console.log('Country: ' + response.Country);
    console.log('Language: ' + response.Language);
    console.log('Plot: ' + response.Plot);
    console.log('Actors: ' + response.Actors);

    if (response.Title === DEFAULT_TITLE) {
      console.log('\nIf you haven\'t watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>');
      console.log("It's on Netflix!\n");
    }
  }
};

module.exports = {
  getOMDB
}