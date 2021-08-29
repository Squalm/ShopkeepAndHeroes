/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// My thanks to https://hasura.io/blog/custom-auth-with-netlify/

// eslint-disable-next-line no-redeclare
const fetch = require("node-fetch");

exports.handler = async (event, context, callback) => {
  const {
    identity,
    user
  } = context.clientContext;

  console.log(identity);
  console.log(user);
  
  if (user) {
    const userID = user.sub;
    return {
      statusCode: 200,
      body: JSON.stringify({
        "X-Hasura-User-Id": userID,
        "X-Hasura-Role": "user"
      })
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      "X-Hasura-role": "anonymous"
    })
  };
};