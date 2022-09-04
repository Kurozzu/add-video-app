"use strict"


const hello = async (event) => {
  return {
    status: 200,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  },
    body: JSON.stringify(
      {
        message: "Hello World!",
        input: event,
      },
      null,
      2
    ),
  }
}

module.exports = {
  hello
}


// module.exports.hello = async (event) => {
//   return {
//     status: 200,
//     body: JSON.stringify(
//       {
//         message: "Hello World!",
//         input: event,
//       },
//       null,
//       2
//     ),
//   };
// };
