// // import axios from 'axios';
// // import fs from 'fs';

// const axios = require('axios');
/* The line `// const fs = require('fs');` is a commented-out line of code in JavaScript. Comments in
JavaScript are used to provide explanations or notes within the code that are not executed by the
program. In this case, the line is importing the 'fs' module using the `require` function, which is
commonly used in Node.js to work with the file system. However, since the line is commented out with
`//`, it is not active and will not be executed when the code runs. */
const fs = require('fs');

// const url = `https://ml-api.usegalileo.ai/feed/?page=`;

// const getFeed = async page => {
//   const response = await axios.get(url + page);
//   return response.data;
// };

// const saveFeed = async page => {
//   const data = await getFeed(page);
//   return data;
// };

// const scrapeGalio = async () => {
//   let data = [];
//   const prompt = [];
//   for (let i = 1; i <= 385; i++) {
//     const {designs} = await saveFeed(i);
//     console.log(`Page ${i} scraped`)
//     data = [...data, ...designs];
//   }

//   fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
//   for (let i = 0; i < data.length; i++) {
//     const {prompt_for_feed} = data[i];
//     prompt.push(
//       prompt_for_feed
//         .replace(/<[^>]*>?/gm, '')
//         .replace(/\n/g, ' ')
//         .trim(),
//     );
//     fs.writeFileSync(
//       'prompt.txt',
//       prompt_for_feed
//         .replace(/<[^>]*>?/gm, '')
//         .replace(/\n/g, ' ')
//         .trim()
//         .join('\n'),
//     );
//   }
// };

// scrapeGalio();
const data = require('./data.json');
const getprompt = () => {
  // const data = fs.readFileSync('data.json');
  // const prompt = [];
  for (let i = 0; i < data.length; i++) {
    // const {prompt_for_feed} = data[i];
    // prompt.push(
    //   data[i].prompt_for_feed
    //     .replace(/<[^>]*>?/gm, '')
    //     .replace(/\n/g, ' ')
    //     .trim(),
    // );
    fs.appendFileSync(
      'prompt.txt',
      data[i].prompt_for_feed
        .replace(/<[^>]*>?/gm, '')
        .replace(/\n/g, ' ')
        .trim() + '\n',
        // .join('\n'),
    );
  }

};
getprompt();
