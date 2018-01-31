const fs = require('fs');

const ENCODING = 'utf8';

const appendFile = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(path, data, ENCODING, error => {
      if (!error) {
        resolve();
      }
      else {
        reject(error);
      }
    });
  });
};

const readFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, ENCODING, (error, data) => {
      if (!error) {
        resolve(data);
      }
      else {
        reject(error);
      }
    });
  });
};

module.exports = {
  appendFile,
  readFile
}