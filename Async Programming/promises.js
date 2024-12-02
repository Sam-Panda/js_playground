// Import Node Filesystem Module (the promises version)
import fs from "node:fs/promises";
// Import Node Filesystem Module (the callback version)
import fsc from "node:fs";

// Reading the file with the promises API
fs.readFile('./data.json', 'utf8')
  .then(data => {
    const dataObj = JSON.parse(data);
    console.log(dataObj);
    console.log("Complete");
  })
  .then(() => readFile("data.json"))
  .then(data => console.log(data))
  .catch(err => {
    console.log("Could not complete loading and parsing.");
    throw err;
  });

// Creating a custom Promise with the callback API
const readFile = async (filename) => {
  return new Promise((resolve, reject) => {
    fsc.readFile('data.json', 'utf8', (err, data) => {
      if(err) {
        reject(err);
      }
      resolve(data);
    });
  });
}