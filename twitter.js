/**
 * @file Interface to Twitter. 
 * @author Elaina Swann
 * @version 1.0 
*/
const Twitter = require('twitter');
const file    = require('./file.js');

/** 
 * @function getTwitter 
 * @description Promise function for accessing Twitter API.
 * @param {string} config - Configuration data required for API call.
 * @param {string} limit - Number of search items to return.
 * @param {string} outfile - Output file name for results.
 * @returns {Promise} Data from API call or Error if occurred.
*/
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

/** 
 * @async
 * @function writeTwitter 
 * @description Writes Twitter results to console.log and output file.
 * @param {string} response - Data returned by Twitter API call.
 * @param {string} outfile - Output file name for results.
*/
async function writeTwitter(response, outfile) {
  try {
    var buffer = '';

    if (response.length) {
      response.forEach(tweet => {
        buffer += tweet.text + '\n';
        buffer += 'Created: ' + tweet.created_at + '\n\n';
      });
    }
    else {
      buffer += 'No tweets found!' + '\n\n';
    }

    console.log(buffer);
    await file.appendFile(outfile, buffer);
  }
  catch(error) {
    console.log(error);
  }
};

module.exports = {
  getTwitter
}
