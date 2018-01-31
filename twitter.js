const Twitter = require('twitter');

const getTwitter = (config, limit) => {
  return new Promise((resolve, reject) => {
    const PATH = 'https://api.twitter.com/1.1/statuses/home_timeline.json';

    var client = new Twitter(config);
    var params = {count: limit};

    client.get(PATH, params, (error, response, raw_response) => {
      if (!error) {
        writeTwitter(response);
        resolve(response);
      }
      else {
        reject(error);
      }
    });
  });
};

const writeTwitter = response => {
  if (response.length) {
    response.forEach(tweet => {
      console.log(tweet.text);
      console.log('Created: ' + tweet.created_at + '\n');
    });
  }
  else {
    console.log('No tweets found!');
  }
};

module.exports = {
  getTwitter
}
