const Twitter = require('twitter');
const fs      = require('./file.js');

const getTwitter = (config, limit, outfile) => {
  return new Promise((resolve, reject) => {
    const PATH = 'https://api.twitter.com/1.1/statuses/home_timeline.json';

    var client = new Twitter(config);
    var params = {count: limit};

    client.get(PATH, params, (error, response, raw_response) => {
      if (!error) {
        writeTwitter(response, outfile);
        resolve(response);
      }
      else {
        reject(error);
      }
    });
  });
};

async function writeTwitter(response, outfile) {
  try {
    var buffer = '';

    if (response.length) {
      response.forEach(tweet => {
        buffer += tweet.text + '\n';
        buffer += 'Created: ' + tweet.created_at + '\n';
      });
    }
    else {
      buffer += 'No tweets found!' + '\n';
    }

    console.log(buffer);
    await fs.appendFile(outfile, buffer);
  }
  catch(error) {
    console.log(error);
  }
};

module.exports = {
  getTwitter
}
