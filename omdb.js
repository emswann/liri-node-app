const request = require('request');
const fs      = require('./file.js');

const DEFAULT_TITLE = 'Mr. Nobody';

const getOMDB = (config, title, type, outfile) => {
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

        writeOMDB(parsedBody, outfile);
        resolve(parsedBody);
      }
      else {
        reject(error);
      }
    });
  });  
};

async function writeOMDB(response, outfile) {
  try {
    const IMDB_INDEX = 0;
    const ROTTEN_TOMATO_INDEX = 1;

    var buffer = '';

    if (response.Error) {
      buffer += response.Error;
    }
    else {
      buffer += 'Title: ' + response.Title + '\n';

      buffer += 'Year: ' + response.Year + '\n';

      buffer += 'IMDB Rating: ' + response.Ratings[IMDB_INDEX].Value + '\n';

      buffer += 'Rotten Tomatoes Rating: ' 
            + response.Ratings[ROTTEN_TOMATO_INDEX].Value + '\n';
    
      buffer += 'Country: ' + response.Country + '\n';
    
      buffer += 'Language: ' + response.Language + '\n';
    
      buffer += 'Plot: ' + response.Plot + '\n';
    
      buffer += 'Actors: ' + response.Actors + '\n';
    
      if (response.Title === DEFAULT_TITLE) {
        buffer += '\nIf you haven\'t watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>\n';
    
        buffer += "It's on Netflix!\n";
      }
    }

    console.log(buffer);
    await fs.appendFile(outfile, buffer);
  }
  catch(error) {
    console.log(error);
  }
};

module.exports = {
  getOMDB
}